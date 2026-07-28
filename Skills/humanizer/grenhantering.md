# Hur grenarna i ArbetenSokta hänger ihop

`skillprocess.md` beskriver *varför* och *hur* enstaka filer görs publika. Den
här filen beskriver bara en sak, mer i detalj: vilka grenar som faktiskt finns,
var de bor, och ett namnkrock-problem som uppstod och hur det löstes.

## Totalt två grenar, inte tre

Det finns exakt två grenar, **lokalt på datorn**. Ingen tredje gren har lagts
till, och ska inte läggas till:

| Gren (lokal) | Innehåll | Får pushas till GitHub? |
|---|---|---|
| `main` | Allt: CV, ansökningar, personlighetstester, alla skills. Privat. | Nej, aldrig (spärrat, se `ArbetenSokta/CLAUDE.md` avsnitt 1B). |
| `github-public` | Bara de filer som står i vitlistan (`ALLOWED_FILES` i `.git/hooks/pre-push`). Publikt. | Ja, det är den enda som får det. |

**På GitHub finns bara en enda gren**, den som `github-public` pushas till.

## Namnkrocken som uppstod, och varför den var förvirrande

När `github-public` först pushades, döptes fjärrgrenen till "main":

```bash
git push -u origin github-public:main
```

Det gav ett repo på GitHub med en gren som heter "main", men innehållet kom
från `github-public`, inte från den lokala, privata `main`-grenen. Två helt
orelaterade saker som råkade dela namn. Det orsakade två konkreta problem:

1. **`git push origin main` gav ett förvirrande felmeddelande.** Git vägrade,
   med texten "non-fast-forward... kör Pull först". Det lät som om något gått
   fel, men det var egentligen bra: git kunde inte känna igen den lokala
   privata `main`-historiken som en fortsättning på fjärrens "main"-historik
   (som ju kom från `github-public`), och vägrade skriva över den. Att följa
   felmeddelandets råd (`git pull`) hade varit fel, det hade försökt slå ihop
   privat och publikt innehåll.
2. **Att bläddra till `github.com/kentlundgren/ArbetenSokta/blob/main/...`
   visade publikt innehåll**, vilket är helt korrekt (det är den enda grenen
   som finns där), men lätt att förväxla med den lokala `main`-grenen, som
   inte har något att göra med det som visas.

## Fixen: byt namn på fjärrgrenen, inte lägg till en ny

```bash
git push -u origin github-public:public   # skapar en NY fjärrgren, "public"
```

Detta skapar inte en tredje gren. Det är fortfarande samma två lokala grenar
som innan, bara att den publicerade motsvarigheten på GitHub nu heter "public"
istället för "main". `github-public` (lokalt) följer nu `origin/public`.

**Kvarstående manuella steg** (görs i GitHub:s webbgränssnitt, inte via git):
- **Settings → Pages**: byt källgren från `main` till `public`.
- **Settings → General → Default branch**: byt till `public`.
- Först därefter: ta bort den gamla fjärrgrenen `main`
  (`git push origin --delete main`), så att inget pekar på den längre.

## Sammanfattning, som en enkel regel

"Main" betyder alltid den lokala, privata grenen. Om något publikt visas under
namnet "main" på GitHub är det ett namn som råkar krocka, inte samma innehåll.
Efter namnbytet ovan finns den förväxlingen inte längre: publikt innehåll på
GitHub heter numera "public", aldrig "main".
