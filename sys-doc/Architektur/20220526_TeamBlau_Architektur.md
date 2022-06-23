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

_TODO: Wo wird der React-Projektordner abgelegt? (EC2, S3)_

<br><br>

## Qualitätsziele

| Qualitätsziel        | Beschreibung                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Gute Benutzbarkeit   | Bier Pongo ist für die Spieler intuitiv zu bedienen und ohne Erklärung spielbar.                             |
| Hohe Zuverlässigkeit | Das System steht den Spielern jederzeit zur Verfügung und bildet den Spielstand live ab.                     |
| Gute Wartbarkeit     | Bier Pongo ist ohne großen Administrationsaufwand betreibbar und leicht um zusätzliche Features erweiterbar. |

_TODO: evtl. noch 1-2 weitere Ziele definieren_

<br><br>

## Entscheidende Rahmenbedingungen

| Vorgabe                   | Beschreibung                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Zeitlicher Rahmen         | Das Projekt ist innerhalb von 5 Kalenderwochen abzuschließen.                                                            |
| Technischer Anspruch      | Das Projekt muss mind. einen der Themenbereiche BigData / Cloud / NoSQL in einer hinreichend technischen Tiefe bedienen. |
| Einfachheit der Anwendung | Die Anwendung soll aber so einfach gehalten werden, dass sie im gegebenen Zeitraum umgesetzt werden kann.                |

<br><br>

# Lösungsstrategie

## Lösungsansätze

Die zuvor benannten Qualitätsziele wurden beim Projekt Bier Pongo folgendermaßen brücksichtigt:

| Ziel                 | Lösungsansatz                                                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gute Benutzbarkeit   | <ul><li>Dank der simpel gehaltenen React-Oberfläche kann die Anwendung direkt ohne Tutorial o.Ä. benutzt werden.<li> Kennt man die Regeln des "Real-Life"-Spiels kommt man ohne Einweisung direkt zurecht. <li>Die Benutzer benötigen lediglich einen Webbrowser.</ul>                           |
| Hohe Zuverlässigkeit | <ul><li>Da sämtliche Infrastruktur durch Dienste von AWS bereitgestellt wird, ist die Anwendung praktisch ohne zu erwartende Ausfälle verfügbar. <li> Den einzigen Flaschenhals stellt die Internetverbindung des Benutzers dar.</ul>                                                            |
| Gute Wartbarkeit     | <ul><li>Durch Nutzung des AWS Clous Development Kit können etwaige Änderungen an der Infrastruktur im Code getätigt und anschließend deployed werden. <li>Zusätzliche Features können für das separate React-Frontend entwickelt werden, ohne dadurch das Backend auf AWS zu beeinflussen. </ul> |

## Technologie-Stack

Das Frontend von Bier Pongo besteht aus einer React-Anwendung in einem Docker-Container.

Die Backend-Infrastruktur besteht aus Diensten von AWS. Die Brücke zwischen React und AWS bildet eine REST-API, realisiert durch AWS API-Gateway. Die zur Verfügung gestellten Endpoints nehmen API-Aufrufe von Seiten React entgegen und bedienen diese, indem AWS Lambda-Funktionen aufgerufen werden. Durch die Lambda-Funktionen werden die Spiel-Daten aus der AWS DynamoBD gelesen und geschrieben.

Für die Verwaltung der AWS Infrastruktur wird per Infrastructure as code das AWS Cloud Development Kit verwendet.

<br><br>

![blackbox_bierpongo](images/techstack.svg)

<br><br>

# Lösungsdetails

## Architekturentscheidung

<i>FORM: Ausformulierter Text, ggf. mit Bildern</i>

- Herleitung einer zentralen Entscheidung bzgl. Technologien & Frameworks
- inkl. Alternativen und Bewertungskriterien
- React, Python
- Docker
  Die Applikation lief zur Entwicklungszeit in einem Docker-Container, damit sie von allen Entwicklern ohne Kompatibilitätsprobleme nachgebaut und getestet werden konnte.

## Struktur

<i>FORM: Diagramm/Grafik</i>

- Technische/fachliche Zerlegung des Systems
- (ggf. Definition des Strings, der als Austausch dient)
- Eine Lambda genauer beschreiben?

## Verhalten

<i>FORM: Diagramm/Grafik</i>

- Zentrale Abläufe innerhalb des Systems
- z.B. Walktrhough
- z.B. Failover (autom. Ausfallsicherung, <b>hier nötig??</b>)

<br><br>

# (Evtl.) Fazit und Ausblick

- offene Punkte
- Nächste Schritte
- was haben wir nicht geschafft/was würde in Zukunft noch an Features implementiert werden?
