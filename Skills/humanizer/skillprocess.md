# Hur en enda fil blir publik ur ett repo fullt av personliga filer

Det här dokumentet beskriver hur `ArbetenSokta`, ett repo med jobbansökningar, CV och
personlighetstester, kan ha exakt en publik fil på GitHub, `Skills/humanizer/SKILL.md`,
utan att något av det andra innehållet riskerar att följa med. Inte som en regel man
måste komma ihåg, utan som en teknisk spärr som stoppar det även om man skulle glömma.

## Problemet

De flesta filerna i `ArbetenSokta` (CV, ansökningar, personlighetstester,
intervjuförberedelser) innehåller personuppgifter och ska aldrig bli publika. Men en av
skillsen i projektet, `humanizer` (regler för att ta bort AI-skrivmönster), innehåller
ingen personlig information alls och är generellt användbar. Frågan blev: hur delar man
den ena filen publikt utan att riskera resten?

Ett separat repo för bara den filen är ett sätt att lösa det, men det är inte det som
används här. Lösningen nedan håller allt i **samma** repo, med samma historik för
"main"-innehållet som redan fanns, och löser separationen med grenar och en spärr.

## Lösningen: en gren utan delad historik + en teknisk spärr

**1. En orphan-gren.** `github-public` skapades med `git checkout --orphan
github-public`. En orphan-gren delar ingen historik med `main` alls, den vet inte att
CV:n eller ansökningarna existerar. Den innehåller bara det som uttryckligen läggs till
på den, ingenting ärvs.

```bash
git checkout --orphan github-public
git reset                              # rensar det som main lämnade i indexet
git add Skills/humanizer/SKILL.md      # bara den tillåtna filen
git commit -m "Publicera humanizer-skillet"
git checkout main                      # tillbaka till vardagsarbetet
```

**2. En pre-push-hook som teknisk spärr.** En git-hook (`.githooks/pre-push`) körs
automatiskt varje gång `git push` anropas, innan något skickas iväg. Den kontrollerar:

- Är grenen som pushas exakt `github-public`? Om inte: avbryt.
- Innehåller den grenen bara de tillåtna filerna? Om inte: avbryt.

```bash
git config core.hooksPath .githooks    # aktiverar hook-mappen i detta repo
```

Skillnaden mot att bara skriva en regel i CLAUDE.md: en regel kan glömmas eller
missförstås. En hook som avbryter kommandot fungerar likadant oavsett vem (Kent eller
Claude) som råkar skriva `git push origin main`.

**3. Verifierat mot en låtsas-server innan något riktigt GitHub-repo fanns.** Innan
`kentlundgren/ArbetenSokta` skapades på GitHub testades spärren mot ett tillfälligt,
lokalt bare-repo:

```
Försök: git push <låtsas-remote> main            → SPÄRR: push av 'refs/heads/main' är blockerad.
Försök: git push <låtsas-remote> github-public   → lyckades, exakt de tillåtna filerna hamnade där.
```

## Vad som faktiskt är publikt

Just nu, uteslutande innehållet i grenen `github-public`:

- `Skills/humanizer/SKILL.md`
- `Skills/humanizer/skillprocess.md` (den här filen)
- `Skills/humanizer/<skärmdump av grenbytet i Cursor>`

Allt annat i `ArbetenSokta`, inklusive `controlleransokan`- och
`intervjuforbredelse`-skillsen (som innehåller kontaktuppgifter och en
personlighetsprofil), stannar på `main` och kan tekniskt inte pushas till samma remote.

## Att uppdatera den publika versionen senare

Redigera filen på `main` som vanligt, committa där. Publicera sedan:

```bash
git checkout github-public
git checkout main -- Skills/humanizer/SKILL.md   # hämtar senaste versionen från main
git add Skills/humanizer/SKILL.md
git commit -m "Uppdatera humanizer-skillet"
git push origin github-public:main
git checkout main
```

## Källa till skill-strukturen själv

Anthropic (u.å.) *Skill Development for Claude Code Plugins*. [SKILL.md]
claude-plugins-official (GitHub). Tillgänglig:
https://github.com/anthropics/claude-plugins-official/blob/main/plugins/plugin-dev/skills/skill-development/SKILL.md
[Hämtad: 2026-07-28].
