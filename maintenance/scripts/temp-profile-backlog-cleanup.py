from pathlib import Path

p = Path('maintenance/research/content-depth-reinforcement.md')
s = p.read_text(encoding='utf-8')

old = '- Testing / Verification + External Integration + Deployment + Learning Verification — `docs/07`\n- Version / Maintenance / Rollback / Product outcome follow-up — `docs/09`\n'
new = '- Testing / Verification + External Integration + Deployment + Learning Verification — `docs/07`\n- GitHub Pages / Static Delivery Decision Depth — `docs/08`\n- Version / Maintenance / Rollback / Product outcome follow-up — `docs/09`\n'
if old not in s:
    raise SystemExit('docs/08 strong-area anchor missing')
s = s.replace(old, new, 1)

old = '- Electron / Distribution / Update / Electron Security — `docs/11`\n- Dependencies / Assets / Supply Chain / External contract lifecycle — `docs/13`\n'
new = '- Electron / Distribution / Update / Electron Security — `docs/11`\n- Project Profiles / selection / combination / lifecycle / drift — `docs/12`\n- Dependencies / Assets / Supply Chain / External contract lifecycle — `docs/13`\n'
if old not in s:
    raise SystemExit('docs/12 strong-area anchor missing')
s = s.replace(old, new, 1)

s = s.replace('5. Active candidateをPriority順に再監査する', '5. Active candidateがある場合だけPriority順に再監査する')
p.write_text(s, encoding='utf-8')
