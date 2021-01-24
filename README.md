# finance-app
Applikation wird im Zuge des Moduls Mobile Computing erstellt und soll als Einstieg in die Entwicklung mobiler Anwendung dienen.

## Vorbereitungen zum Starten der Anwendung
- `npm install --global expo-cli` zum Installieren der Expo CLI
- `npm install` im Ordner finance-app

## Starten der Anwendung
- Öffnen des Terminal im Ordner finance-app
- Ausführen des Befehls `expo start`
- Starten des iOS bzw. Android Simulators/Emulators
- In den Expo Developer Tools (im Browser) auf "Run on iOS bzw. Android" klicken
- Warten bis die Expo App im Simulator/Emulator geöffnet und die eigene App heruntergeladen wurde

## Erstellen von Demo-Daten
Zum erstellen von Demo-Daten wurde die Webseite: https://www.json-generator.com/# genutzt. Die Vorlage sieht wie folgt aus:
```javascript
[
  {
    "repeat(20, 30)": {
      "id": "{{guid()}}",
      "title": "{{company()}}",
      "description": "{{lorem(1, \"sentences\")}}",
      "storeName": "{{company()}}",
      "category": "{{company()}}",
      "amount": "{{integer(-1000, 999)}}",
      "currency": "€",
      "isSubscription": "{{bool()}}",
      "subscriptionType": "{{random(\"daily\",\"weekly\",\"monthly\",\"yearly\")}}",
      "subscriptionStartDate": "{{date(new Date(2020,05, 1), new Date(2020,10, 1))}}",
      "subscriptionEndDate": "{{date(new Date(2020,10, 1), new Date())}}",
      "paymentMethod": "{{random(\"cash\", \"card\", \"paypal\")}}",
      "date": "{{date(new Date(2020,10, 1), new Date())}}",
      "createdBy": "Max",
      "createdAt": "{{date(new Date(2020,10, 1), new Date())}}",
      "modifiedBy": "Max",
      "modifiedAt": "{{date(new Date(2020,10, 1), new Date())}}"
    }
  }
]

```
