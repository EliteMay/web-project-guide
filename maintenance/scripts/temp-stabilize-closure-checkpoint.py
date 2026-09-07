from pathlib import Path
p = Path('maintenance/research/content-depth-reinforcement.md')
s = p.read_text(encoding='utf-8')
old = '- Current reinforcement state: merged main `345211dbb86be6d5903eac1bda94f59d5c28d1c0`'
new = '- Reinforcement completion merge: `345211dbb86be6d5903eac1bda94f59d5c28d1c0`'
if s.count(old) != 1:
    raise SystemExit('closure checkpoint phrase missing or duplicated')
p.write_text(s.replace(old, new, 1), encoding='utf-8')
