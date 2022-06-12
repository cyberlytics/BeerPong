# Problemstellung

## Mision statement

Bier Pongo ist eine Webanwendung, welche es Bierpong-Spielern ermöglicht,
auch räumlich voneinander getrennt zusammen zu spielen und immer den aktuellen Stand des Spielfelds vor sich zu haben. Benötigt wird dafür nur ein Gerät mit Webbrowser und Internetverbindung. Bier Pongo maximiert den Spielspaß dank intuitiver Bedienung, die keiner ausführlichen Erklärung bedarf. 

<br><br>
## Kontextabgrenzung

Im Folgenden wird das Gesamtsystem als Blackbox dargestellt.
Alle verwendeten externen Systeme werden als Box um die Anwendung "Bier Pongo" herum dargestellt. Der menschliche Akteur "Spieler" kann in diesem Fall als Plural aufgefasst werden, da an einem Bierpong-Spiel immer zwei Spieler beteiligt sind.

<br><br>

![blackbox_bierpongo](images/blackbox.svg)

Für die Entwicklung des Frontend wird die JavaScript Library "React" verwendet. Das Backend bilden die Dienste "Lambda" und "DynamoDB" von AWS. Als Schnittstelle dient der Dienst "AWS API Gateway", um Daten im jeweilig gewünschten Format abzurufen. Für die Benutzerverwaltung wird "AWS Cognito" verwendet. Um alle Dienste von AWS per Infrastructure as Code zu orchestrieren, wird das "AWS CDK" (Cloud Development Kit) benutzt.

*TODO: Wo wird der React-Projektordner abgelegt? (EC2, S3)* 

<br><br>
## Qualitätsziele

| Qualitätsziel        | Beschreibung                                                                                                 |
|----------------------|--------------------------------------------------------------------------------------------------------------|
| Gute Benutzbarkeit   | Bier Pongo ist für die Spieler intuitiv zu bedienen und ohne Erklärung spielbar.                             |
| Hohe Zuverlässigkeit | Das System steht den Spielern jederzeit zur Verfügung und bildet den Spielstand live ab.                     |
| Gute Wartbarkeit     | Bier Pongo ist ohne großen Administrationsaufwand betreibbar und leicht um zusätzliche Features erweiterbar. |

*TODO: evtl. noch 1-2 weitere Ziele definieren*

<br><br>
## Entscheidende Rahmenbedingungen

| Vorgabe                   | Beschreibung                                                                                                             |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Zeitlicher Rahmen         | Das Projekt ist innerhalb von 5 Kalenderwochen abzuschließen.                                                            |
| Technischer Anspruch      | Das Projekt muss mind. einen der Themenbereiche BigData / Cloud / NoSQL in einer hinreichend technischen Tiefe bedienen. |
| Einfachheit der Anwendung | Die Anwendung soll aber so einfach gehalten werden, dass sie im gegebenen Zeitraum umgesetzt werden kann.                |



<br><br>
# Lösungsstrategie

## Lösungsstrategie
<i>FORM: Tabelle</i>
- 2 Spalten
- Architekturziele + Architekturansätze
- Ansätze mit Verweisen auf Überblicksbild und Lösungsdetails
- Beispiele für rechte Spalte:
    - Architekturentscheidungen, z.B. AWS (Ausfallsicherheit)
    - Architekturziele, z.B. MicroServices (Schnelle Anpassung an Trends / Austauschbarkeit)
    - Architekturprinzipien, z.B. Verwendung des AWS-Stacks, um alles zentral verwalten zu können
    - Vorgehen, z.B. User centered design, intuitive Benutzbarkeit

## Architekturprinzipien
<i>FORM: Aufzählungsliste</i>
- Präferenzen, "wir bevorzugen XY vor Z"

## Informelles Überblickbild
<i>FORM: Diagramm/Grafik</i>
- Visualisierung der Lösung (evtl. Cloudcraft)
- (eher kein UML!)

<br><br>

 # Lösungsdetails

## Architekturentscheidung
<i>FORM: Ausformulierter Text, ggf. mit Bildern</i>
- Herleitung einer zentralen Entscheidung bzgl. Technologien & Frameworks
- inkl. Alternativen und Bewertungskriterien

## Struktur
<i>FORM: Diagramm/Grafik</i>
- Technische/fachliche Zerlegung des Systems
- (ggf. Definition des Strings, der als Austausch dient)

## Verhalten
<i>FORM: Diagramm/Grafik</i>
- Zentrale Abläufe innerhalb des Systems
- z.B. Walktrhough
- z.B. Failover (autom. Ausfallsicherung, <b>hier nötig??</b>)

## Verteilung (<b>hier nötig??</b>)
<i>FORM: Diagramm/Grafik</i>
- Visualisierung der Zielumgebung, Inbetriebnahme und Betrieb des Systems

## Übergreifendes Konzept
<i>FORM: Ausformulierter Text, ggf. mit Bildern<</i>
- Darstellung einer Systemübergreifenden Idee (z.B. Persistenzkonzept)

<br><br>

# (Evtl.) Fazit und Ausblick
- offene Punkte
- Nächste Schritte
- was haben wir nicht geschafft/was würde in Zukunft noch an Features implementiert werden?