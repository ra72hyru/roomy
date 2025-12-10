<h2>Roomy Programmier Challenge - Niklas Schmitt</h2>
<h3>Frontend: React</h3>
	<ol>
    <li>cd frontend</li>
  	<li>npm install</li>
  	<li>npm run dev</li>
  </ol>

<h3>Backend: Express und better SQLite als Datenbank</h3>
	<ol>
    <li>cd backend</li>
  	<li>npm install</li>
	<li>exmp.env in .env umbenennen</li>
  	<li>npm run dev</li>
  </ol>

Beides mit Typescript (Ich habe vorher nur Javascript benutzt, also wenn manches Typescript-Spezifische nicht so best-practice sein sollte, könnte das ein Grund sein :D)

Der Port fürs Backend ist in der exmp.env Datei - <strong>muss noch umbenannt werden in .env</strong>

<h2>Default Login: Username: admin - Password: password</h2>

Ich habe den Fokus tendenziell aufs Frontend gelegt, aber versucht, von allem was zu machen, auch, um möglichst alles ein bisschen zu üben, und ich würde sagen, dass ich viel gelernt habe.

<h3>Meine Vorgehensweise:</h3>
<ul>
	<li>Zuerst die User Stories nacheinander implementieren mit Fokus auf Frontend</li>
	<li>Dann doch Backend angefangen zu implementieren, weil Daten nur im Frontend unschön war und eben auch, um Backend und Datenbanken zu üben</li>
	<li>Nach kurzer Zeit Styling ein bisschen vernachlässigt, um mich mehr auf die Funktionalität zu konzentrieren</li>
	<li>Ich habe auch erstmal den Unterschied zwischen Admin und nicht Admin ignoriert und das dann später als Kontext implementiert</li>
	<li>Dann letztendlich wieder die User Stories nacheinander implementiert</li>
	<li>Zum Schluss dann ein bisschen Refactoring, um einerseits UI von Logik zu trennen (custom Hooks erstellt); zum Beispiel wollte ich auch die editBookings Funktion nicht zweimal implementiert haben (in Bookings.tsx und Rooms.tsx)</li>
	<li>Und noch ein bisschen Styling :)</li>
</ul>

<h3>Was ich jetzt anders machen würde, wenn ich nochmal anfangen würde:</h3>
	<ul>
    <li>Mehr über Gemeinsamkeiten zwischen den einzelnen Komponenten nachdenken (Styling und Logik)</li>
	  <li>Die handler-Funktionen gleich in einer extra Datei implementieren für mehr Übersichtlichkeit</li>
  </ul>

<h3>Was cool wäre, auch zu implementieren:</h3>
<ul>
	<li>Möglichkeit zu schauen, wann Mitarbeiter XY in einem Büro ist</li>
	<li>Kapazitäten anzeigen für bestimmten Tag (bin nicht fertig geworden: Man kann die Buchungen für ein Datum in einem Raum anzeigen, aber die Auslastung wird im Raum nicht angezeigt, außerdem ist aktuell noch das Problem, dass das Datum beim Raumwechsel nicht übernommen wird, also man muss es neu setzen)</li>
	<li>Highlight Button für freie und belegte Räume</li>
	<li>Möglichkeit Benutzernamen und Passwort zu ändern (evtl. ein default setzen und bei erster Anmeldung den Nutzer auffordern neue Daten zu festzulegen)</li>
	<li>Ein bisschen schöneres Styling</li>
	<li>Allgemein Error Handling statt bloß Ausgabe in der Konsole</li>
	<li>Im Backend Parameter validieren</li>
	<li>Die List der Buchungen in eine extra Komponente auslagern, die man dann sowohl in Bookings.tsx als auch in Rooms.tsx benutzen könnte; habe angefangen, aber nicht fertig geschafft :/ (ich weiß, Rooms.tsx ist deswegen nicht schön :/)</li>
</ul>
