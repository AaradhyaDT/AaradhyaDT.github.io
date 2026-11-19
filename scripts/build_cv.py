#!/usr/bin/env python3
"""Compatibility wrapper delegating CV builds and SSOT checks to scripts/compile_cv.py.

Canonical Single Source of Truth (SSOT): data/master_cv.json.
Derived outputs:
  - assets/docs/AARADHYA_DEV_TAMRAKAR_CV*.{docx,pdf} (all 6 presets)
  - assets/js/data/resume-data.js (interactive on-site CV viewer)
"""
import argparse
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
COMPILER = ROOT / "scripts" / "compile_cv.py"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verify CV SSOT parity via compile_cv.py --check-ssot")
    parser.add_argument("--sync-web", action="store_true", help="Regenerate assets/js/data/resume-data.js from master_cv.json")
    args = parser.parse_args()

    if args.check:
        cmd = [sys.executable, str(COMPILER), "--check-ssot"]
    elif args.sync_web:
        cmd = [sys.executable, str(COMPILER), "--sync-web", "--check-ssot"]
    else:
        cmd = [sys.executable, str(COMPILER), "--all-presets", "--check-ssot"]

    return subprocess.run(cmd, check=False).returncode


if __name__ == "__main__":
    raise SystemExit(main())
