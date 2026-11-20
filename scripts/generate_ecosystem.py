#!/usr/bin/env python3
"""Build the ecosystem tree and constellation data from project cards and curated relationships.

Run after project onboarding: python scripts/generate_ecosystem.py
Check generated content without writing: python scripts/generate_ecosystem.py --check
Group membership is editorial; only commit-pinned links are documented integrations.
Author-described workflow links are kept in a separate, visibly distinct evidence tier.
"""

import argparse
import html
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
START = "<!-- ECOSYSTEM TREE START -->"
END = "<!-- ECOSYSTEM TREE END -->"
DATA_JS = ROOT / "assets/js/data/ecosystem-data.js"
DOCUMENTED_TIERS = {"DOCUMENTED_INTEGRATION", "DOCUMENTED_WORKFLOW"}
WORKFLOW_TIER = "WORKFLOW_CONTEXT"
NODE_KINDS = {"service", "cluster"}


def project_cards(page):
    soup = BeautifulSoup(page, "html.parser")
    return {card["id"]: card for card in soup.select("#projectsGrid details.project-card")}


def resolve_groups(cards, config):
    """Return [(group, ids)], rejecting stale or duplicated membership."""
    groups = []
    assigned = set()
    for group in config["groups"]:
        ids = list(group["projects"])
        if group.get("include_coursework"):
            ids = [key for key, card in cards.items() if card.has_attr("data-fuse-week")] + ids
        for key in ids:
            if key not in cards:
                raise ValueError(f"Unknown project: {key}")
            if key in assigned:
                raise ValueError(f"Project appears twice: {key}")
            assigned.add(key)
        groups.append((group, ids))
    remaining = [key for key in cards if key not in assigned]
    if remaining:
        groups.append(({
            "id": "more", "label": "More projects",
            "description": "New additions to the portfolio.",
        }, remaining))
    return groups


def validate_connections(connections, cards):
    for edge in connections:
        if edge["from"] not in cards or edge["to"] not in cards:
            raise ValueError("Connection references an unknown project")
        if edge["from"] == edge["to"] or not edge.get("source") or not edge.get("evidence"):
            raise ValueError("Connections require distinct projects and evidence")
        if not re.fullmatch(r"[0-9a-f]{40}", edge.get("source_commit", "")):
            raise ValueError("Connections require an immutable source commit")
        if edge["evidence"] not in DOCUMENTED_TIERS:
            raise ValueError("Unsupported connection evidence tier")


def project_labels(cards, config):
    return {
        key: config.get("labels", {}).get(
            key, card.select_one(".project-title").get_text(" ", strip=True).split(" — ")[0]
        ) for key, card in cards.items()
    }


def render_tree(page, config):
    """Return a static tree, rejecting stale IDs and unsourced connections."""
    cards = project_cards(page)
    groups = resolve_groups(cards, config)
    validate_connections(config["connections"], cards)
    esc = html.escape
    labels = project_labels(cards, config)
    examples = config.get('search_examples', [])
    if any(key not in cards for key in examples):
        raise ValueError('Search examples must reference existing projects')
    example_names = [labels[key] for key in examples]
    placeholder = 'Search project names'
    if len(example_names) > 1:
        placeholder = 'Try ' + ', '.join(example_names[:-1]) + ', or ' + example_names[-1]
    elif example_names:
        placeholder = 'Try ' + example_names[0]
    lines = [START, '<section class="ecosystem" id="ecosystem" aria-labelledby="ecosystem-title">',
             '<header class="ecosystem-heading">',
             '<div><p class="ecosystem-eyebrow">Connected work</p>',
             '<h2 id="ecosystem-title">One ecosystem.<br/><em>Many ways in.</em></h2>',
             '<p>Explore the tools, research, and learning that connect my engineering practice.</p></div>',
             f'<p class="ecosystem-totals">{len(cards)} projects <span aria-hidden="true">/</span> {len(groups)} branches</p>',
             '</header>',
             '<div class="ecosystem-controls" hidden>',
             '<div class="ecosystem-search"><label for="ecosystem-search">Find a project</label>',
             f'<input id="ecosystem-search" type="search" placeholder="{esc(placeholder, quote=True)}" autocomplete="off" aria-controls="ecosystem-tree"/></div>',
             '<button type="button" class="ecosystem-button" id="ecosystem-expand" aria-controls="ecosystem-tree">Expand branches</button>',
             '<button type="button" class="ecosystem-button" id="ecosystem-reset">Reset tree</button>',
             '</div>',
             '<div class="ecosystem-layout">',
             '<div class="ecosystem-map">',
             '<div class="ecosystem-root"><span class="ecosystem-root-mark" aria-hidden="true">ADT</span><div><strong>Engineering ecosystem</strong><span>Choose a branch, then a project</span></div></div>',
             '<ul class="ecosystem-tree" id="ecosystem-tree" role="list">']
    for index, (group, ids) in enumerate(groups):
        opened = ' open' if index == 0 else ''
        lines.extend([f'<li class="ecosystem-branch" data-group="{esc(group["id"])}">',
                      f'<details{opened}><summary><span>{esc(group["label"])}</span><span class="ecosystem-count">{len(ids)}</span></summary>',
                      f'<p class="ecosystem-branch-description">{esc(group["description"])}</p>',
                      '<ul class="ecosystem-projects" role="list">'])
        for key in ids:
            card = cards[key]
            title = card.select_one('.project-title').get_text(' ', strip=True)
            label = labels[key]
            week = card.get('data-fuse-week')
            if week:
                label = f"Week {week} · {label}"
            tags = ' '.join(tag.get_text(' ', strip=True) for tag in card.select('.tag'))
            lines.append(f'<li data-project="{key}" data-search="{esc(label + " " + title + " " + tags, quote=True)}"><a class="ecosystem-node" href="#{key}"><span>{esc(label)}</span><span class="ecosystem-node-arrow" aria-hidden="true">↗</span></a></li>')
        lines.extend(['</ul></details></li>'])
    lines.extend(['</ul>', '<p class="ecosystem-empty" hidden>No projects found. Try another name or technology.</p>',
                  '</div>', '<aside class="ecosystem-detail" aria-labelledby="ecosystem-detail-title" hidden>',
                  '<p class="ecosystem-eyebrow" id="ecosystem-detail-group"></p>',
                  '<h3 id="ecosystem-detail-title"></h3>',
                  '<p id="ecosystem-detail-description"></p>',
                  '<ul class="ecosystem-tags" id="ecosystem-detail-tags" role="list"></ul>',
                  '<a class="ecosystem-primary" id="ecosystem-project-link" href="#projects">Open project <span aria-hidden="true">↗</span></a>',
                  '<div id="ecosystem-repositories"></div>',
                  '<div class="ecosystem-relationships"><h4>Connected projects</h4><ul id="ecosystem-related" role="list"></ul></div>',
                  '<button type="button" class="ecosystem-button" id="ecosystem-return">Back to selected project in tree</button>',
                  '</aside>', '</div>',
                  '<footer class="ecosystem-footer"><p><span class="ecosystem-key-branch" aria-hidden="true"></span>Branches group projects by purpose. <span class="ecosystem-key-link" aria-hidden="true">↗</span>Connections describe documented integrations and workflows.</p>',
                  f'<p id="ecosystem-status" role="status">{len(cards)} projects in the tree.</p></footer>',
                  '<noscript><p>Follow any project name to its card. Branches expand without JavaScript.</p></noscript>',
                  '</section>', END])
    return '\n'.join(lines)


def card_description(card):
    """Prefer the contribution paragraph, without its inline heading."""
    paragraphs = card.select('.project-story p')
    for paragraph in paragraphs[1:2] + paragraphs[:1]:
        label = paragraph.find('strong')
        text = paragraph.get_text(' ', strip=True)
        if label:
            text = text[len(label.get_text(' ', strip=True)):].strip()
        if text:
            return re.sub(r'\s+', ' ', text)
    return 'Explore the project card for its work and context.'


def build_constellation(page, config):
    """Return the validated, deterministic graph payload consumed by constellation.js."""
    cards = project_cards(page)
    groups = resolve_groups(cards, config)
    validate_connections(config["connections"], cards)
    spec = config["constellation"]
    labels = project_labels(cards, config)
    group_of = {key: group["id"] for group, ids in groups for key in ids}

    nodes = {}
    for key, card in cards.items():
        classes = card.get('class', [])
        status_el = card.select_one('.project-status')
        status_text = status_el.get_text(' ', strip=True) if status_el else ''
        status = 'archived' if 'project-card--archived' in classes else (
            'active' if 'project-card--in-progress' in classes or re.search(r'in progress|active research', status_text, re.I) else '')
        title = card.select_one('.project-title').get_text(' ', strip=True)
        tags = ' '.join(tag.get_text(' ', strip=True) for tag in card.select('.tag'))
        week = card.get('data-fuse-week')
        label = labels[key]
        if week:
            label = f'Week {week} · {label}'
        node = {
            'id': key, 'label': label, 'kind': 'project', 'group': group_of[key],
            'description': spec.get('descriptions', {}).get(key, card_description(card)),
            'search': f'{label} {title} {tags}',
        }
        if status:
            node['status'] = status
        if week:
            node['week'] = int(week)
        nodes[key] = node

    for key, item in spec["nodes"].items():
        if key in nodes:
            raise ValueError(f"Virtual node collides with a project: {key}")
        if item.get('kind') not in NODE_KINDS or not item.get('label') or not item.get('description'):
            raise ValueError(f"Virtual node needs a kind, label, and description: {key}")
        nodes[key] = {'id': key, 'label': item['label'], 'kind': item['kind'],
                      'group': item.get('group', 'orchestration'), 'description': item['description'],
                      'search': f"{item['label']} {item['description']}"}
    for key in spec.get('descriptions', {}):
        if key not in cards:
            raise ValueError(f"Description override references an unknown project: {key}")

    known = set(nodes)
    clusters = {}
    for key, item in spec["nodes"].items():
        if item['kind'] != 'cluster':
            continue
        members = list(item.get('members', []))
        if item.get('members_from_coursework'):
            weeks = sorted((key2 for key2 in cards if cards[key2].has_attr('data-fuse-week')),
                           key=lambda key2: int(cards[key2]['data-fuse-week']))
            members = weeks + [m for m in members if m not in weeks]
        if not members or any(m not in known or m == key for m in members) or len(set(members)) != len(members):
            raise ValueError(f"Cluster members must be distinct known nodes: {key}")
        cluster = {'id': key, 'label': item.get('view_label', item['label']), 'members': members,
                   'timeline': bool(item.get('timeline'))}
        if item.get('capstone'):
            if item['capstone'] not in members:
                raise ValueError(f"Cluster capstone must be a member: {key}")
            cluster['capstone'] = item['capstone']
        clusters[key] = cluster

    columns = []
    placement = {}
    for index, column in enumerate(spec["columns"]):
        for member in column["members"]:
            if member not in known:
                raise ValueError(f"Column references an unknown node: {member}")
            if member in placement:
                raise ValueError(f"Node appears in two columns: {member}")
            placement[member] = index
        columns.append({'id': column['id'], 'label': column['label']})
    column_ids = [column['id'] for column in spec['columns']]
    if spec.get('default_column') not in column_ids:
        raise ValueError("default_column must name a declared column")
    default_index = column_ids.index(spec['default_column'])
    for key, node in nodes.items():
        node['column'] = placement.get(key, default_index)
        node['order'] = spec['columns'][node['column']]['members'].index(key) if key in placement else 1000 + list(nodes).index(key)

    agents = spec["agents"]
    for key in agents + spec["featured"] + [spec["default_selection"]]:
        if key not in known:
            raise ValueError(f"Constellation references an unknown node: {key}")
    if len(set(spec["featured"])) != len(spec["featured"]):
        raise ValueError("Featured nodes must be unique")

    edges = []
    seen = set()

    def add(edge):
        if edge['from'] not in known or edge['to'] not in known or edge['from'] == edge['to']:
            raise ValueError(f"Edge references unknown or identical nodes: {edge['from']} -> {edge['to']}")
        if not edge.get('label') or not edge.get('description'):
            raise ValueError("Edges require a label and description")
        pair = (edge['from'], edge['to'])
        if pair in seen:
            raise ValueError(f"Duplicate edge: {pair[0]} -> {pair[1]}")
        seen.add(pair)
        edges.append(edge)

    for edge in config["connections"]:
        add({'from': edge['from'], 'to': edge['to'], 'label': edge['label'], 'description': edge['description'],
             'tier': edge['evidence'], 'source': edge['source'], 'source_commit': edge['source_commit']})
    for agent in agents:
        for target, label, description in spec.get('agent_workflows', []):
            if (agent, target) not in seen:
                add({'from': agent, 'to': target, 'label': label, 'description': description, 'tier': WORKFLOW_TIER})
    for edge in spec.get('workflow_edges', []):
        if edge.get('tier', WORKFLOW_TIER) != WORKFLOW_TIER or edge.get('source_commit'):
            raise ValueError("Workflow edges must stay in the WORKFLOW_CONTEXT tier")
        add({'from': edge['from'], 'to': edge['to'], 'label': edge['label'],
             'description': edge['description'], 'tier': WORKFLOW_TIER})

    return {
        'columns': columns,
        'groups': [{'id': group['id'], 'label': group['label']} for group, _ in groups],
        'agents': agents,
        'featured': spec['featured'],
        'defaultSelection': spec['default_selection'],
        'nodes': list(nodes.values()),
        'clusters': list(clusters.values()),
        'edges': edges,
        'connections': config['connections'],
    }


def render_data_js(page, config):
    payload = json.dumps(build_constellation(page, config), ensure_ascii=False, indent=1)
    return ('/* Generated by scripts/generate_ecosystem.py from data/ecosystem.json and projects.html.\n'
            '   Do not edit by hand; run: python scripts/generate_ecosystem.py */\n'
            f'window.ECOSYSTEM_DATA = {payload};\n')


def generated_page(page, config):
    if START not in page or END not in page:
        raise ValueError("Missing ecosystem tree markers")
    before, rest = page.split(START, 1)
    _, after = rest.split(END, 1)
    return before + render_tree(page, config) + after


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    target = ROOT / 'projects.html'
    original = target.read_text(encoding='utf-8')
    config = json.loads((ROOT / 'data/ecosystem.json').read_text(encoding='utf-8'))
    result = generated_page(original, config)
    data = render_data_js(result, config)
    current_data = DATA_JS.read_text(encoding='utf-8') if DATA_JS.exists() else ''
    if args.check:
        if result != original or data != current_data:
            print('Ecosystem tree or constellation data is stale. Run python scripts/generate_ecosystem.py')
            return 1
        print('Ecosystem tree and constellation data match project inventory and relationship data.')
    else:
        target.write_text(result, encoding='utf-8', newline='\n')
        DATA_JS.write_text(data, encoding='utf-8', newline='\n')
        print('Updated ecosystem tree in projects.html and assets/js/data/ecosystem-data.js.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
