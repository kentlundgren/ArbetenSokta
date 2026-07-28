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

### Varför byta gren över huvud taget?

![Bytte från "main" till grenen: github-public](Cursor_bytte_from_main_till_github-public.jpg)

Git checkar bara ut det som en gren faktiskt känner till. `main` känner till allt
(CV, ansökningar, personlighetstester, humanizer-skillet). `github-public` känner
bara till de tre filerna på vitlistan. Att byta gren i Cursor (skärmdumpen ovan,
nere till vänster i fönstret) byter alltså vilka filer som syns i Utforskaren och
vilken historik `git commit`/`git push` arbetar mot just då.

**Varför man behöver byta till `github-public`:** Det är den enda grenen som får
pushas (se spärren nedan). Vill man publicera eller uppdatera något av det som är
tänkt att bli publikt, måste man stå på just den grenen när man committar och
pushar, annars finns det ingen giltig plats att skicka ändringen till.

**När man ska byta tillbaka till `main`:** Direkt efter att publiceringen är klar,
det vill säga så fort man har körts `git push` (eller bestämt sig för att inte
pusha just nu). `github-public` är inget att jobba vidare i. Allt vardagsarbete,
CV, ansökningar, redigering av `controlleransokan`- och
`intervjuforbredelse`-skillsen, och även det löpande arbetet med att skriva
`SKILL.md` för humanizer, sker på `main`. `github-public` är bara en tillfällig
"publiceringsstation": byt till den, uppdatera/committa/pusha, byt direkt tillbaka.

**Bekräftat: ja, all push av `main` till GitHub är spärrad.** Inte bara
avskräckt eller dokumenterad som en regel, tekniskt blockerad av
`.git/hooks/pre-push` oavsett vem som försöker och vilket kommando som skrivs.
Se testresultatet i punkt 3 nedan.

**2. En pre-push-hook som teknisk spärr.** En git-hook (`.git/hooks/pre-push`) körs
automatiskt varje gång `git push` anropas, innan något skickas iväg. Den kontrollerar:

- Är grenen som pushas exakt `github-public`? Om inte: avbryt.
- Innehåller den grenen bara filer från en vitlista (`ALLOWED_FILES` i hook-skriptet)?
  Om inte: avbryt.

Skillnaden mot att bara skriva en regel i CLAUDE.md: en regel kan glömmas eller
missförstås. En hook som avbryter kommandot fungerar likadant oavsett vem (Kent eller
Claude) som råkar skriva `git push origin main`.

**Fallgrop, upptäckt under testet:** hook-skriptet låg först i en spårad mapp
(`.githooks/`, aktiverad via `git config core.hooksPath .githooks`) för att vara
läsbar och versionshanterad. Men den mappen finns bara på grenen `main`, inte på
`github-public`, orphan-grenen känner inte till den. Resultatet: spärren fungerade
när jag testade från `main`, men var helt frånvarande, kördes aldrig, exakt när man
faktiskt står på `github-public` och pushar på riktigt. Fixen: den aktiva hooken
måste ligga i `.git/hooks/pre-push`, som inte är en del av någon gren utan alltid
finns oavsett vad som är utcheckat. En läsbar kopia kan fortfarande sparas spårad
(t.ex. i `.githooks/`) som referens, men den aktiva versionen måste ligga utanför
grenarnas räckvidd. Testat på nytt, från `github-public`, efter fixen: spärren
fungerar nu i den situation den faktiskt behövs.

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
- `Skills/humanizer/Cursor_bytte_from_main_till_github-public.jpg` (skärmdump av grenbytet)

Allt annat i `ArbetenSokta`, inklusive `controlleransokan`- och
`intervjuforbredelse`-skillsen (som innehåller kontaktuppgifter och en
personlighetsprofil), stannar på `main` och kan tekniskt inte pushas till samma remote.

## Vad händer exakt när man kör `git remote add origin <url>`?

Det här kommandot gör bara **en enda sak**: det lägger till en rad i den lokala,
gömda filen `.git/config`, i det här repot:

```
[remote "origin"]
	url = https://github.com/kentlundgren/ArbetenSokta.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

Ingenting annat. Ingen nätverkstrafik, ingen kontroll att URL:en faktiskt existerar
eller att man har behörighet att pusha dit, ingen fil skickas iväg. Det är rent
lokal bokföring, ett smeknamn (`origin`, vald av konvention, kunde hetat vad som
helst) kopplat till en adress.

**Varför det ser ut som "ingenting hände":** kommandot ger inget output vid
lyckat resultat. Det är normal git-stil, tyst framgång, felmeddelande om något
gick fel. Att skärmen ser likadan ut före och efter är alltså inte ett tecken på
att något gick snett, det är tecknet på att det gick precis som det ska.

**Det som faktiskt skickar något över internet är nästa steg**, `git push`. Fram
till den kommandoraden har inget lämnat datorn. Man kan verifiera att kopplingen
faktiskt registrerades med `git remote -v`, som listar url:erna för alla
konfigurerade remotes, utan att skicka något.

## Vad händer exakt när man kör `git push -u origin github-public:main`?

Till skillnad från `git remote add` skickar det här kommandot faktiskt data över
internet. I ordning:

1. **`git push`** – huvudkommandot, "skicka commits till en fjärrserver".
2. **`origin`** – vilken fjärrserver, den adress som registrerades i förra steget.
3. **`github-public:main`** – refspec-syntax, `<lokal gren>:<fjärr-gren>`. Ta den
   lokala grenen `github-public` och skicka den till en gren som ska heta `main`
   på fjärrservern. Eftersom repot är tomt skapas `main` där i samma steg.
4. **`-u`** (kort för `--set-upstream`) – efter lyckad push, kom ihåg kopplingen:
   den lokala grenen `github-public` "följer" nu `origin/main`. Nästa gång räcker
   det att skriva `git push` utan hela refspecen, git minns var den ska.

**Vad som faktiskt skickas:** bara det som är nåbart från `github-public`s senaste
commit, alltså de fåtal commits som finns på just den grenen och bara innehåller
de tre vitlistade filerna. Eftersom `github-public` är en orphan-gren utan delad
historik med `main` finns det inget sätt för git att av misstag plocka med sig
CV:n eller ansökningarna här, de är inte en del av det som är "nåbart" från denna
gren, oavsett vad kommandot skulle råka pusha.

**Ordningen saker faktiskt sker i:**
1. Den lokala pre-push-hooken (`.git/hooks/pre-push`) körs FÖRST, innan någon
   nätverkstrafik. Om den blockerar avbryts allt här, ingenting skickas.
2. Om hooken godkänner: git packar ihop de commit-, träd- och filobjekt som
   fjärrservern saknar, och skickar dem.
3. GitHub tar emot dem och skapar grenen `main` i det tidigare tomma repot.
4. Lokalt sparas upstream-kopplingen i `.git/config`.

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

## Fallgrop: README.md räcker inte för en GitHub Pages-sida

Efter att `README.md` pushats och GitHub Pages aktiverats (Settings → Pages →
Branch: main, mapp: /) gav `https://kentlundgren.github.io/ArbetenSokta/`
fortfarande ett 404-fel: "For root URLs ... you must provide an index.html file."

Orsaken: GitHub har egentligen **två separata renderingsvägar** som råkar se
likartade ut i sammanhanget, men är helt orelaterade tekniskt:

1. **Repo-sidan** (`github.com/<user>/<repo>`) – renderar automatiskt
   `README.md` om en sådan finns i roten. Det är den vägen som fungerade direkt.
2. **GitHub Pages** (`<user>.github.io/<repo>`) – en helt separat statisk
   webbserver. Den bryr sig inte om `README.md` alls, den letar specifikt efter
   `index.html` (eller `index.md` om Jekyll är konfigurerat) i roten av den valda
   grenen/mappen. Utan den filen: 404, oavsett vad README.md innehåller.

Fixen: lade till en egen `index.html` i roten av `github-public`, med samma
innehåll som README.md men som en fristående, självstädande HTML-sida (ingen
Jekyll, inget byggsteg, samma princip som i Kents Ekonomi-projekt). Lades till i
`ALLOWED_FILES` i båda hook-kopiorna, testat och pushat.

## Fallgrop: samma fil ser olika ut beroende på var man länkar till den

`index.html` länkade först till `SKILL.md` och `skillprocess.md` med relativa
sökvägar (`Skills/humanizer/SKILL.md`). Tekniskt korrekt, länken fungerar, men
resultatet blir en fil som visas **rå**: ingen styling, ingen syntax-färgning av
kodblocken, inga bilder synliga inline, bara oformaterad markdown-text i
webbläsaren.

Orsaken är i grunden samma sak som i fallgropen ovan, ännu en gång två separata
system som råkar dela varumärke:

1. **GitHub Pages** är en statisk filserver. Ber man om en `.md`-fil därifrån får
   man exakt de byte som ligger i filen, obehandlade. Ingen rendering sker.
2. **GitHub.coms egna repo-vy** (`github.com/<user>/<repo>/blob/<gren>/<sökväg>`,
   fliken "Preview") är en helt annan produkt: en webbapplikation som aktivt
   tolkar markdown och bygger om den till formaterad HTML server-side varje gång
   sidan öppnas, med GitHubs eget utseende, klickbara rubrikankare,
   syntax-färgning och bilder inbäddade.

En relativ länk från en GitHub Pages-sida pekar på (1). Ska en `.md`-fil visas
med samma "designade" känsla som i webbläsaren måste länken peka explicit på (2),
den fullständiga `blob`-URL:en, inte en relativ sökväg.

Fixen: `index.html`s länkar till `SKILL.md` och `skillprocess.md` pekar nu på
`https://github.com/kentlundgren/ArbetenSokta/blob/main/...` istället för
relativa sökvägar, och öppnas i ny flik (`target="_blank"`).

## Källa till skill-strukturen själv

Anthropic (u.å.) *Skill Development for Claude Code Plugins*. [SKILL.md]
claude-plugins-official (GitHub). Tillgänglig:
https://github.com/anthropics/claude-plugins-official/blob/main/plugins/plugin-dev/skills/skill-development/SKILL.md
[Hämtad: 2026-07-28].
