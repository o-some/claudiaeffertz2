# GesundeUnternehmen

Statische Website für das Beratungs- und Umsetzungsnetzwerk. Alle Seiten und Bilder liegen direkt im Repository; es gibt keinen Build-Schritt und keine externen Skripte oder Webfonts.

## Lokal ansehen

```sh
python3 -m http.server 8766
```

Danach `http://localhost:8766/` öffnen. Die Seiten arbeiten mit relativen Pfaden und können auf einer GitHub-Pages-Projektadresse oder einer eigenen Domain veröffentlicht werden.

## Quellen und Entscheidungen

- Redaktionelles Konzept: `../20261007GesundeUnternehmen_Website-Konzept_2026-10-06-2.docx` (Arbeitsstand 6. Oktober 2026).
- Bestandswebsite: `https://www.gesundeunternehmen.com/`, besonders `/beraterverbund/qualitaetsgesicherte-partner` und die dort verlinkten 20 Partnerprofile, am 9. Oktober 2026 geprüft.
- Designinspiration: Dropbox `[Chelonaki - The Quiet Author]/[Buchdesign]/[077] [Business & Ratgeber] – Burgundy Code.png`. Übernommen wurden Farbspannung, feine Linien, Serifentypografie und ruhiger editorialer Aufbau; keine Buchseite wurde kopiert.
- 20 neue redaktionelle Bildmotive liegen in `assets/`. Sie zeigen anonyme Szenen und sind keine Porträts von Claudia Effertz, Marcus Süßenbach oder den Partnern. Die Quelldateien wurden mit dem Bildgenerator erstellt und für Webauslieferung als JPEG komprimiert.
- Bestehende Impressumsdaten wurden von `https://www.gesundeunternehmen.com/service/impressum` übernommen. Die Datenschutzseite wurde für eine statische Website ohne Formular, Tracking und externe Schrift- oder Skripteinbindung neu gefasst.

## Vor endgültiger Freischaltung prüfen

1. Rolle, Zuständigkeiten und direkte Kontaktdaten von Marcus Süßenbach bestätigen.
2. Partnerprofile und Qualifikationen mit den Partnern aktualisieren. Die bisherigen Detailseiten für Manuela Keck und Lena Germann waren beim Abruf leer bzw. nicht erreichbar.
3. Freigegebene Originalporträts, echtes Buchcover, Leseprobe, Kauf- und Editionslinks sowie bestätigte Preise einsetzen. Die aktuellen Symbolbilder dürfen keine realen Produkte oder Personen suggerieren.
4. Impressum, Datenschutz und tatsächlichen Hostingweg rechtlich prüfen. Das alte Impressum enthält keine hier verifizierten zusätzlichen Pflichtangaben.
5. GitHub Pages und gegebenenfalls Domain/DNS einrichten. Die bestehende Domain `gesundeunternehmen.com` wurde nicht verändert.

## Veröffentlichung

GitHub ist die Quelle. Die Workflow-Datei `.github/workflows/pages.yml` veröffentlicht den Repository-Inhalt über GitHub Pages, sobald Pages in den Repository-Einstellungen auf GitHub Actions gestellt ist. ChatGPT Sites wird für diese Website nicht verwendet.
