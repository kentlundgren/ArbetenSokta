# ArbetenSokta

Det här publika repot innehåller enstaka, medvetet utvalda filer ur ett annars
privat projekt (jobbansökningar, CV, personlighetstester). Namnet `ArbetenSokta`
är ett arv från det ursprungsprojektet. De allra flesta filerna där ska aldrig
bli publika, och kan tekniskt inte pushas hit, bara de filer som explicit valts
ut hamnar här. Just nu är det två: en Claude Skill som tar bort tecken på
AI-genererad text ("humanizer"), och en sida med en delmängd av sökta jobb
redovisade till Arbetsförmedlingen. Fler kan läggas till, se
["Lägga till fler publika filer"](#lägga-till-fler-publika-filer) nedan.

## Live-sida

**[kentlundgren.github.io/ArbetenSokta](https://kentlundgren.github.io/ArbetenSokta/)**
– samma innehåll som denna README, men som en fristående GitHub Pages-sida.

## Innehåll

- [`Skills/humanizer/SKILL.md`](Skills/humanizer/SKILL.md) – själva skillet:
  regler för att ta bort AI-skrivmönster ur en text, baserat på Wikipedias
  ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
- [`Skills/humanizer/skillprocess.md`](Skills/humanizer/skillprocess.md) – hur
  enstaka, utvalda filer kan göras publika utan att resten av det privata
  projektet följer med, och hur man lägger till fler. Beskriver en orphan-gren
  utan delad historik och en pre-push-hook som teknisk spärr, med skärmdumpar
  och en genomgång av vad varje git-kommando i processen faktiskt gör.
- [`Skills/humanizer/grenhantering.md`](Skills/humanizer/grenhantering.md) –
  vilka grenar som finns (bara två, lokalt), och hur en namnkrock mellan den
  privata `main`-grenen och fjärrgrenens ursprungliga namn upptäcktes och
  åtgärdades genom att döpa om fjärrgrenen till `public`, inte genom att lägga
  till en tredje gren. Med skärmdumpar av de två GitHub-inställningarna
  (Default branch, Pages-källgren) som fick bytas manuellt för att
  namnbytet skulle slå igenom fullt ut.
- [`Aktivitetsrapport/index.html`](Aktivitetsrapport/index.html) – en
  delmängd av sökta jobb, redovisade till Arbetsförmedlingens
  aktivitetsrapport. Genererad ur ett annars privat arbetsverktyg – bara
  yrkesroll, arbetsgivare, ort och datum, aldrig kontaktpersoner eller
  privata anteckningar.

## Varför bara enstaka filer?

De flesta filerna i ursprungsprojektet innehåller personuppgifter (kontaktuppgifter,
en personlighetsprofilsyntes) och ska aldrig bli publika. Humanizer-skillet
innehåller ingen personlig information och är generellt användbart, det är därför
det valts ut för att delas. Samma princip gäller för varje ny fil som eventuellt
läggs till här: den ska vara medvetet vald, inte råka följa med.

## Lägga till fler publika filer

En ny fil blir aldrig publik av misstag, en teknisk spärr (en pre-push-hook)
blockerar allt som inte står på en vitlista. Att lägga till en ny fil är därför
ett par medvetna steg, inte en vanlig commit:

1. Redigera/skapa filen på `main` som vanligt, committa där.
2. Lägg till filens sökväg i `ALLOWED_FILES` i **båda** hook-kopiorna:
   `.git/hooks/pre-push` (den aktiva) och `.githooks/pre-push` (den läsbara
   referenskopian), på `main`.
3. Byt till `github-public`: `git checkout github-public`.
4. Hämta in filen på den grenen: `git checkout main -- <sökväg-till-filen>`.
5. `git add <sökväg-till-filen>`, `git commit`, `git push`.
6. `git checkout main` – tillbaka till vardagsarbetet.

Full genomgång, med skärmdumpar och en förklaring av varje kommando, finns i
[`Skills/humanizer/skillprocess.md`](Skills/humanizer/skillprocess.md).

## Källa till skill-strukturen

Anthropic (u.å.) *Skill Development for Claude Code Plugins*. [SKILL.md]
claude-plugins-official (GitHub). Tillgänglig:
https://github.com/anthropics/claude-plugins-official/blob/main/plugins/plugin-dev/skills/skill-development/SKILL.md
[Hämtad: 2026-07-28].
