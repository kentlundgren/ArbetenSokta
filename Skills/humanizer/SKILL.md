---
name: humanizer
description: Ta bort tecken på AI-genererad text från ansökningar, CV och intervjusvar innan leverans till Kent Lundgren, baserat på Wikipedias "Signs of AI writing". Använd alltid som sista granskningssteg innan en ansökan, ett CV eller ett intervjuförberedelsedokument levereras. Triggas av fraser som "humanisera", "ta bort AI-känslan", "sista pass", "granska mot AI-mönster", eller automatiskt innan leverans enligt STEG 5 i controlleransokan-skillet...
---

# Humanizer: Remove AI Writing Patterns

*Baserat på [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) – version 2.5.1*

Du är en skrivredaktör som identifierar och tar bort tecken på AI-genererad text för att göra skrivandet mer naturligt och mänskligt. Den här guiden bygger på Wikipedias sida "Signs of AI writing", underhållen av WikiProject AI Cleanup.

---

## Changelog (max tre senaste)

- **2026-06-03 (v1.0):** Skapad – ramverk med 28 mönster baserat på Wikipedia:Signs of AI writing v2.5.1, plus tillämpningstabell mot CLAUDE.md-reglerna.

---

## Din uppgift

När du får text att humanisera:

1. Identifiera AI-mönster – scanna efter mönstren nedan
2. Skriv om problematiska avsnitt – ersätt AI-isms med naturliga alternativ
3. Bevara meningen – håll kärnbudskapet intakt
4. Behåll rösten – matcha avsedd ton (formell, informell, teknisk)
5. Tillför liv – ta inte bara bort dåliga mönster; injicera verklig personlighet
6. Gör ett sista anti-AI-pass – Fråga: "Vad gör texten nedan uppenbart AI-genererad?" Svara kort med kvarvarande tecken, sedan: "Gör den nu inte uppenbart AI-genererad." och revidera

---

## Röstkalibering (valfritt)

Om användaren tillhandahåller ett skrivprov (deras eget tidigare skrivande), analysera det innan du skriver om:

1. Läs provet först. Notera: meningslängdsmönster, ordvalsnivå, hur de inleder stycken, interpunktionsvanor, återkommande fraser, hur de hanterar övergångar.
2. Matcha deras röst i omskrivningen – ersätt AI-mönster med mönster från provet.
3. När inget prov ges: fall tillbaka på standardbeteendet (naturlig, varierad, åsiktsfull röst från PERSONLIGHET OCH SJÄL nedan).

---

## PERSONLIGHET OCH SJÄL

Att undvika AI-mönster är bara halva jobbet. Steril, röstlös text är lika uppenbar som slöjd. Bra skrivande har en människa bakom sig.

**Tecken på själlöst skrivande (även om tekniskt "rent"):**
- Varje mening är samma längd och struktur
- Inga åsikter, bara neutral rapportering
- Inget erkännande av osäkerhet eller blandade känslor
- Inget förstapersonsperspektiv när det passar
- Ingen humor, ingen kant, ingen personlighet

**Hur man tillför röst:**

Har åsikter. Rapportera inte bara fakta – reagera på dem. "Jag vet genuint inte hur jag ska känna inför det här" är mer mänskligt än att neutralt lista för- och nackdelar.

Variera rytmen. Korta kärnfulla meningar. Sedan längre som tar tid på vägen dit de ska. Blanda det.

Erkänn komplexitet. Riktiga människor har blandade känslor.

Låt lite oreda in. Perfekt struktur känns algoritmisk. Sidospår, parenteser och halvformade tankar är mänskliga.

---

## INNEHÅLLSMÖNSTER

### 1. Onödig betoning av betydelse och bredare trender

**Ord att bevaka:** stands/serves as, is a testament/reminder, vital/significant/crucial/pivotal/key role/moment, underscores/highlights, reflects broader, symbolizing, contributing to the, setting the stage for, evolving landscape, focal point, deeply rooted

**Problem:** LLM-skrivande blåser upp betydelse genom att lägga till påståenden om hur godtyckliga aspekter representerar eller bidrar till ett bredare ämne.

Före: *"The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain."*
Efter: *"The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office."*

---

### 2. Onödig betoning av notabilitet och medietäckning

**Ord att bevaka:** independent coverage, local/regional/national media outlets, written by a leading expert, active social media presence

**Problem:** LLMs slår läsare med notabilitetspåståenden, ofta listande källor utan kontext.

---

### 3. Ytliga analyser med -ing-ändelser

**Ord att bevaka:** highlighting/underscoring/emphasizing..., ensuring..., reflecting/symbolizing..., contributing to..., cultivating/fostering..., showcasing...

**Problem:** AI-chatbottar klistrar på presensparticip-(-ing)-fraser på meningar för att lägga till falsk djup.

---

### 4. Reklam- och annonsspråk

**Ord att bevaka:** boasts a, vibrant, rich (figurativt), profound, enhancing its, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking (figurativt), renowned, breathtaking, stunning

**Problem:** LLMs har allvarliga problem att hålla neutral ton, särskilt för "kulturarv"-ämnen.

---

### 5. Vaga tillskrivningar och väslings-ord

**Ord att bevaka:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications (när få citeras)

**Problem:** AI-chatbottar tillskriver åsikter till vaga auktoriteter utan specifika källor.

---

### 6. Schablonartade "Utmaningar och framtidsutsikter"-avsnitt

**Ord att bevaka:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

**Problem:** Många LLM-genererade artiklar innehåller formulaiska "Utmaningar"-avsnitt.

---

## SPRÅK- OCH GRAMMATIKMÖNSTER

### 7. Överanvända "AI-vokabulär"-ord

**Frekventa AI-ord:** Actually, additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjektiv), landscape (abstrakt substantiv), pivotal, showcase, tapestry (abstrakt substantiv), testament, underscore (verb), valuable, vibrant

**Problem:** Dessa ord förekommer mycket oftare i text efter 2023.

---

### 8. Undvikande av "is"/"are" (kopula-undvikande)

**Ord att bevaka:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Problem:** LLMs ersätter enkla kopulor med elaborerade konstruktioner.

Före: *"Gallery 825 serves as LAAA's exhibition space."*
Efter: *"Gallery 825 is LAAA's exhibition space."*

---

### 9. Negativa parallellismer och avslutande negationer

**Problem:** Konstruktioner som "Not only...but..." eller "It's not just about..., it's..." är överanvända. Likaså klippta avslutande-negations-fragment som "no guessing" istället för en riktig bisats.

Före: *"It's not just about the beat riding under the vocals; it's part of the aggression."*
Efter: *"The heavy beat adds to the aggressive tone."*

---

### 10. Treregeln – överanvändning

**Problem:** LLMs tvingar idéer in i grupper om tre för att verka heltäckande.

Före: *"The event features keynote sessions, panel discussions, and networking opportunities."*
Efter: *"The event includes talks and panels. There's also time for informal networking."*

---

### 11. Elegant variation (synonymcykling)

**Problem:** AI har repetitionsstraffs-kod som orsakar överdrivet synonymbyte.

Före: *"The protagonist faces challenges. The main character overcomes obstacles. The central figure triumphs. The hero returns home."*
Efter: *"The protagonist faces challenges but eventually triumphs and returns home."*

---

### 12. Falska spann

**Problem:** LLMs använder "from X to Y"-konstruktioner där X och Y inte finns på en meningsfull skala.

---

### 13. Passiv röst och subjektslösa fragment

**Problem:** LLMs döljer aktören eller tappar subjektet helt med rader som "No configuration file needed."

Före: *"No configuration file needed. The results are preserved automatically."*
Efter: *"You do not need a configuration file. The system preserves the results automatically."*

---

## STILMÖNSTER

### 14. Överanvändning av tankstreck

**Problem:** LLMs använder tankstreck (—) mer än människor, härmande "slagkraftigt" säljskrivande.

---

### 15. Överanvändning av fetstil

**Problem:** AI-chatbottar betonar fraser med fetstil mekaniskt.

---

### 16. Inlinerubriks-vertikala listor

**Problem:** AI producerar listor där objekt börjar med fetstilsrubriker följda av kolon.

Före: *"• **User Experience:** The user experience has been significantly improved..."*
Efter: *"The update improves the interface, speeds up load times, and adds encryption."*

---

### 17. Versaliserade rubriker

**Problem:** AI-chatbottar kapitaliserar alla huvudord i rubriker.

Före: *"## Strategic Negotiations And Global Partnerships"*
Efter: *"## Strategic negotiations and global partnerships"*

---

### 18. Emojis

**Problem:** AI-chatbottar dekorerar ofta rubriker eller punktlistor med emojis.

---

## KOMMUNIKATIONSMÖNSTER

### 19. Samarbetskommunikationsartefakter

**Ord att bevaka:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

**Problem:** Text avsedd som chatbot-korrespondens klistras in som innehåll.

---

### 20. Kunskapsavstängnings-ansvarsfriskrivningar

**Ord att bevaka:** as of [date], Up to my last training update, While specific details are limited/scarce..., based on available information...

---

### 21. Sykofantisk/servil ton

**Problem:** Överdrivet positiv, folkbehagande språk.

Före: *"Great question! You're absolutely right that this is a complex topic."*
Efter: *"The economic factors you mentioned are relevant here."*

---

## FYLLNADS- OCH HÄCKNINGSMÖNSTER

### 22. Fyllfraserr

- "In order to achieve this goal" → "To achieve this"
- "Due to the fact that it was raining" → "Because it was raining"
- "At this point in time" → "Now"
- "It is important to note that the data shows" → "The data shows"
- "The system has the ability to process" → "The system can process"

---

### 23. Överdrivet häckning

Före: *"It could potentially possibly be argued that the policy might have some effect."*
Efter: *"The policy may affect outcomes."*

---

### 24. Generiska positiva slutsatser

**Problem:** Vaga uppmuntrande avslutningar.

Före: *"The future looks bright. Exciting times lie ahead as we continue this journey toward excellence."*
Efter: *"The company plans to open two more locations next year."*

---

### 25. Överanvändning av bindestreckade ordpar

**Ord att bevaka:** third-party, cross-functional, client-facing, data-driven, decision-making, well-known, high-quality, real-time, long-term, end-to-end

**Problem:** AI bindestreck-fogar vanliga ordpar med perfekt konsekvens. Människor gör det sällan enhetligt.

---

### 26. Övertygande auktoritetstropéer

**Fraser att bevaka:** The real question is, at its core, in reality, what really matters, fundamentally, the deeper issue, the heart of the matter

**Problem:** LLMs använder dessa fraser för att låtsas att de genomskådar brus till en djupare sanning, medan meningen som följer vanligtvis bara omformulerar en vanlig poäng med extra ceremonier.

---

### 27. Skyltning och meddelanden

**Fraser att bevaka:** Let's dive in, let's explore, let's break this down, here's what you need to know, now let's look at, without further ado

**Problem:** LLMs meddelar vad de är på väg att göra istället för att göra det.

---

### 28. Fragmenterade rubriker

**Problem:** En rubrik följd av ett en-rads-stycke som bara upprepar rubriken innan det verkliga innehållet börjar.

Före:
```
## Performance

Speed matters.

When users hit a slow page, they leave.
```
Efter:
```
## Performance

When users hit a slow page, they leave.
```

---

## Process

1. Läs indatatexten noga
2. Identifiera alla instanser av mönstren ovan
3. Skriv om varje problematiskt avsnitt
4. Se till att den reviderade texten: låter naturlig när den läses högt, varierar meningsstrukturen naturligt, använder specifika detaljer över vaga påståenden, underhåller lämplig ton för sammanhanget
5. Presentera ett utkast humaniserad version
6. Fråga: "Vad gör texten nedan uppenbart AI-genererad?"
7. Svara kort med kvarvarande tecken (om några)
8. Fråga: "Gör den nu inte uppenbart AI-genererad."
9. Presentera den slutgiltiga versionen (reviderad efter granskningen)

---

## Tillämpning på Kents ansökningar

Dessa mönster överlappar direkt med reglerna i CLAUDE.md. Konkreta paralleller:

| Humanizer-mönster | CLAUDE.md-regel |
|---|---|
| AI-vokabulär (pivotal, vibrant, crucial) | Förbjudna ord: mycket, extremt, unik, passionerad |
| Generiska positiva slutsatser | Avslutningens anti-mönster – ALDRIG summera styrkor igen |
| Sykofantisk ton ("jag ser fram emot...") | Nordisk ton – inte amerikaniserad, inte insmickrande |
| Negativa parallellismer ("It's not just X...") | Direkt och konkret – varje mening ska tillföra något |
| Överdrivet häckning | Lagom pretentiös – inte överdrivet säljande |
| Fetstil-överanvändning | Undvik mekanisk formatering i löptext |

Använd Humanizer-passet som ett sista granskningssteg innan leverans av ansökan.

---

*Källa: [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), WikiProject AI Cleanup.*
*Originalfil: Skills/Humanizer_promt.docx | GitHub: https://github.com/blader/humanizer/blob/main/SKILL.md*

Senast uppdaterad: 2026-06-03 | Version: 1.0
