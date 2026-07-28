# ArbetenSokta

Det här publika repot innehåller exakt en användbar fil: en Claude Skill som tar
bort tecken på AI-genererad text ("humanizer"). Namnet `ArbetenSokta` är ett arv
från det lokala, privata projekt (jobbansökningar, CV, personlighetstester) som
skillet togs fram i. Det övriga innehållet i det projektet är och blir aldrig
publikt, det finns bara på en lokal gren som tekniskt inte kan pushas hit.

## Innehåll

- [`Skills/humanizer/SKILL.md`](Skills/humanizer/SKILL.md) – själva skillet:
  regler för att ta bort AI-skrivmönster ur en text, baserat på Wikipedias
  ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
- [`Skills/humanizer/skillprocess.md`](Skills/humanizer/skillprocess.md) – hur
  just den här filen, och bara den, kunde göras publik utan att resten av det
  privata projektet följde med. Beskriver en orphan-gren utan delad historik och
  en pre-push-hook som teknisk spärr, med skärmdumpar och en genomgång av vad
  varje git-kommando i processen faktiskt gör.

## Varför bara en fil?

De flesta filerna i ursprungsprojektet innehåller personuppgifter (kontaktuppgifter,
en personlighetsprofilsyntes) och ska aldrig bli publika. Humanizer-skillet
innehåller ingen personlig information och är generellt användbart, det är den
enda filen som medvetet valts ut för att delas.

## Källa till skill-strukturen

Anthropic (u.å.) *Skill Development for Claude Code Plugins*. [SKILL.md]
claude-plugins-official (GitHub). Tillgänglig:
https://github.com/anthropics/claude-plugins-official/blob/main/plugins/plugin-dev/skills/skill-development/SKILL.md
[Hämtad: 2026-07-28].
