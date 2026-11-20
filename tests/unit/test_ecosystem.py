"""Protect project coverage, link privacy, and evidence boundaries in the tree."""

import copy
import importlib.util
import json
import unittest
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("generate_ecosystem", ROOT / "scripts/generate_ecosystem.py")
engine = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(engine)


class EcosystemTests(unittest.TestCase):
    def setUp(self):
        self.page = (ROOT / 'projects.html').read_text(encoding='utf-8')
        self.config = json.loads((ROOT / 'data/ecosystem.json').read_text(encoding='utf-8'))

    def test_every_project_has_exactly_one_tree_link_and_no_repository_destination(self):
        page = BeautifulSoup(self.page, 'html.parser')
        tree = BeautifulSoup(engine.render_tree(self.page, self.config), 'html.parser')
        ids = {card['id'] for card in page.select('#projectsGrid details.project-card')}
        links = [link['href'] for link in tree.select('a.ecosystem-node')]
        self.assertEqual(len(links), len(ids))
        self.assertEqual(set(links), {'#' + key for key in ids})
        self.assertFalse(tree.select('[data-payload-link-id], a[href^="https://github.com/"]'))

    def test_generation_preserves_cards_and_is_repeatable(self):
        generated = engine.generated_page(self.page, self.config)
        self.assertEqual(generated, self.page, 'Run scripts/generate_ecosystem.py')
        self.assertEqual(engine.generated_page(generated, self.config), generated)
        before = self.page.split(engine.END, 1)[1]
        self.assertEqual(generated.split(engine.END, 1)[1], before)

    def test_search_examples_are_existing_searchable_project_names(self):
        tree = BeautifulSoup(engine.render_tree(self.page, self.config), 'html.parser')
        placeholder = tree.select_one('#ecosystem-search')['placeholder']
        for key in self.config['search_examples']:
            node = tree.select_one(f'[data-project="{key}"]')
            label = node.select_one('.ecosystem-node span').get_text()
            self.assertIn(label, placeholder)
            self.assertIn(label.casefold(), node['data-search'].casefold())
        for node in tree.select('[data-project]'):
            label = node.select_one('.ecosystem-node span').get_text()
            self.assertIn(label.casefold(), node['data-search'].casefold())
        self.config['search_examples'].append('nonexistent-project')
        with self.assertRaises(ValueError):
            engine.render_tree(self.page, self.config)

    def test_new_project_is_discoverable_without_manual_inventory_edits(self):
        new_card = '<details class="project-card" id="new"><h3 class="project-title">New &amp; useful</h3><a data-payload-link-id="secret">Repo</a></details>'
        page = self.page.replace('<div class="projects-grid" id="projectsGrid">', '<div class="projects-grid" id="projectsGrid">' + new_card)
        soup = BeautifulSoup(engine.render_tree(page, self.config), 'html.parser')
        self.assertEqual(soup.select_one('[data-group="more"] a')['href'], '#new')
        self.assertEqual(soup.select_one('[data-group="more"] a span').get_text(), 'New & useful')
        self.assertNotIn('secret', str(soup))

    def test_stale_membership_and_duplicate_membership_are_rejected(self):
        for value in ('missing-card', self.config['groups'][0]['projects'][0]):
            with self.subTest(value=value):
                config = copy.deepcopy(self.config)
                config['groups'][1]['projects'].append(value)
                with self.assertRaises(ValueError):
                    engine.render_tree(self.page, config)

    def test_connections_require_known_endpoints_and_evidence(self):
        for key, value in (('to', 'unknown'), ('source', ''), ('evidence', ''), ('to', 'p-040'), ('source_commit', 'placeholder'), ('evidence', 'PROVEN')):
            with self.subTest(key=key, value=value):
                config = copy.deepcopy(self.config)
                config['connections'][0][key] = value
                with self.assertRaises(ValueError):
                    engine.render_tree(self.page, config)

    def test_all_projects_assigned_to_named_branches(self):
        cards = engine.project_cards(self.page)
        groups = engine.resolve_groups(cards, self.config)
        group_ids = [g['id'] for g, _ in groups]
        self.assertNotIn('more', group_ids)
        assigned = {key for _, ids in groups for key in ids}
        self.assertEqual(assigned, set(cards.keys()))
        self.assertIn('p-047', assigned)
        self.assertIn('p-048', assigned)

    def test_constellation_tiers_clusters_and_generated_data_freshness(self):
        payload = engine.build_constellation(self.page, self.config)
        clusters = {c['id']: c for c in payload['clusters']}
        self.assertEqual(set(clusters), {'google-oauth', 'fellowship', 'mcp-group', 'college'})
        fellowship = clusters['fellowship']
        self.assertTrue(fellowship['timeline'])
        self.assertEqual(fellowship['capstone'], 'p-025')
        self.assertEqual(len(fellowship['members']), 19)
        self.assertEqual(fellowship['members'][-1], 'p-025')

        for edge in payload['edges']:
            if edge['tier'] == engine.WORKFLOW_TIER:
                self.assertNotIn('source_commit', edge)
            else:
                self.assertIn(edge['tier'], engine.DOCUMENTED_TIERS)
                self.assertRegex(edge['source_commit'], r'^[0-9a-f]{40}$')

        bad_config = copy.deepcopy(self.config)
        bad_config['constellation']['workflow_edges'][0]['source_commit'] = '0' * 40
        with self.assertRaises(ValueError):
            engine.build_constellation(self.page, bad_config)

        expected_js = engine.render_data_js(self.page, self.config)
        actual_js = (ROOT / 'assets/js/data/ecosystem-data.js').read_text(encoding='utf-8')
        self.assertEqual(actual_js, expected_js, 'Run scripts/generate_ecosystem.py')


if __name__ == '__main__':
    unittest.main()
