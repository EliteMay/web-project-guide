from pathlib import Path

p = Path('maintenance/research/content-depth-reinforcement.md')
s = p.read_text(encoding='utf-8')

replacements = {
    '- Current reinforcement branch: `guide/reinforce-project-profiles`': '- Current reinforcement state: merged main `345211dbb86be6d5903eac1bda94f59d5c28d1c0`',
    '- Project Profile Decision Depth: reinforced / no longer active backlog after this branch merges': '- Project Profile Decision Depth: reinforced / no longer active backlog',
    '- Active depth backlog after this branch: None': '- Active depth backlog: None',
}

for old, new in replacements.items():
    if s.count(old) != 1:
        raise SystemExit(f'expected one checkpoint phrase: {old}')
    s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')
