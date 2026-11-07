/* ============================================================
   PROJECT EVIDENCE — quantitative claim provenance display (v58.10)
   Reads the canonical machine-readable claims manifest and
   renders only fields present for the matching repository.
   ============================================================ */
(function () {
  'use strict';

  function text(value) {
    return value === null || value === undefined ? '' : String(value).trim();
  }

  function layoutProjectProofs() {
    document.querySelectorAll('.project-card-body').forEach(function (body) {
      if (body.querySelector('.project-proof-row')) return;
      var media = body.querySelector('.project-media-preview');
      var narrative = body.querySelector('.project-story, .project-desc-list');
      if (!media || !narrative) return;
      var row = document.createElement('div');
      row.className = 'project-proof-row';
      var aside = document.createElement('div');
      aside.className = 'project-proof-aside';
      var caption = body.querySelector('[data-output-caption]');
      body.insertBefore(row, body.firstChild);
      row.appendChild(narrative);
      row.appendChild(aside);
      aside.appendChild(media);
      if (caption) aside.appendChild(caption);
    });
  }

  function addRow(list, label, value) {
    if (!text(value)) return;
    var dt = document.createElement('dt');
    dt.textContent = label;
    var dd = document.createElement('dd');
    dd.textContent = text(value);
    list.appendChild(dt);
    list.appendChild(dd);
  }

  function renderEvidence(card, claim) {
    var summary = card.querySelector('.project-summary');
    var body = card.querySelector('.project-card-body');
    if (!summary || !body || card.querySelector('.project-evidence')) return;

    var verified = claim.status === 'verified';
    var metric = text(claim.metric);
    var value = text(claim.value);
    var summaryEvidence = document.createElement('div');
    summaryEvidence.className = 'project-evidence-summary';
    summaryEvidence.setAttribute('aria-label', 'Evidence summary');
    summaryEvidence.innerHTML =
      '<span class="project-evidence-tier"></span>' +
      '<span class="project-evidence-summary-value"></span>';
    summaryEvidence.querySelector('.project-evidence-tier').textContent =
      verified ? (text(claim.evidence_tier) || 'Evidence') : 'Evaluation';
    summaryEvidence.querySelector('.project-evidence-summary-value').textContent =
      verified ? [metric, value].filter(Boolean).join(' · ') : 'Source review pending';
    summary.appendChild(summaryEvidence);

    var panel = document.createElement('details');
    panel.className = 'project-evidence' +
      (claim.status === 'needs_review' ? ' project-evidence--review' : '');
    panel.setAttribute('aria-label', 'Evidence and provenance');
    var heading = document.createElement('summary');
    heading.className = 'project-evidence-heading';
    heading.textContent = 'Evaluation sources and limitations';
    panel.appendChild(heading);
    var list = document.createElement('dl');
    list.className = 'project-evidence-list';
    addRow(list, 'Verification', verified ? 'Verified source record' : 'Source verification pending');
    if (verified) addRow(list, 'Evidence tier', claim.evidence_tier);
    addRow(list, verified ? 'Recorded result' : 'Historical claim under review', [metric, value].filter(Boolean).join(' · '));

    if (text(claim.source_commit)) {
      var commit = text(claim.source_commit);
      var dt = document.createElement('dt');
      dt.textContent = 'Immutable commit';
      var dd = document.createElement('dd');
      var link = document.createElement('a');
      link.href = 'https://github.com/' + text(claim.source_repo) + '/commit/' + encodeURIComponent(commit);
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = commit.slice(0, 12);
      link.title = commit;
      dd.appendChild(link);
      list.appendChild(dt);
      list.appendChild(dd);
    } else {
      addRow(list, 'Immutable commit', 'Pending source verification');
    }

    addRow(list, 'Benchmark / experiment', claim.verification_test);
    addRow(list, 'Method', claim.verification_method);
    addRow(list, 'Scope', claim.scope);
    addRow(list, 'Limitations', claim.limitations);
    if (text(claim.source_path)) addRow(list, 'Source', claim.source_path);
    if (claim.status === 'needs_review') addRow(list, 'Status', 'Needs review');
    panel.appendChild(list);

    card.classList.add('has-evidence');
    var mediaPreview = body.querySelector('.project-media-preview');
    if (mediaPreview && mediaPreview.closest('.project-proof-row')) {
      var proofRow = mediaPreview.closest('.project-proof-row');
      body.insertBefore(panel, proofRow.nextSibling);
    } else if (mediaPreview) {
      var row = document.createElement('div');
      row.className = 'project-evidence-row';
      body.insertBefore(row, mediaPreview);
      row.appendChild(panel);
      row.appendChild(mediaPreview);
    } else {
      body.insertBefore(panel, body.firstChild);
    }
  }

  function initProjectEvidence() {
    layoutProjectProofs();
    var cards = document.querySelectorAll('details.project-card[data-evidence-repo]');
    if (!cards.length) return;
    fetch('data/quantitative-claims.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('status ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        var claims = Array.isArray(payload.claims) ? payload.claims : [];
        var byRepo = new Map();
        claims.forEach(function (claim) {
          var repo = text(claim.source_repo);
          if (repo && !byRepo.has(repo)) byRepo.set(repo, claim);
        });
        cards.forEach(function (card) {
          var claim = byRepo.get(card.dataset.evidenceRepo);
          if (claim) renderEvidence(card, claim);
        });
      })
      .catch(function (error) {
        console.warn('project evidence:', error);
      });
  }

  window.initProjectEvidence = initProjectEvidence;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectEvidence);
  } else {
    initProjectEvidence();
  }
})();
