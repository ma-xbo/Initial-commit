# finance-app

Applikation wird im Zuge des Moduls Mobile Computing erstellt und soll als Einstieg in die Entwicklung mobiler Anwendung dienen.

## Vorbereitungen zum Starten der Anwendung

- `npm install --global expo-cli` zum Installieren der Expo CLI
- `npm install` im Ordner finance-app

Hinweis: Wenn die Fehlermeldung "npm ERR! Failed at the grpc@1.24.2 install script." auftritt muss zunächst firebase auf den aktuellen Stand gebracht werden. [Link](https://github.com/grpc/grpc-node/issues/1183#issuecomment-596956959)
- Löschen des node_modules Ordners und der package-lock.json
- Ausführen des Befehls `npm install --save-exact --save firebase@latest`

## Starten der Anwendung

- Öffnen des Terminal im Ordner finance-app
- Ausführen des Befehls `expo start`
- Starten des iOS bzw. Android Simulators/Emulators
- In den Expo Developer Tools (im Browser) auf "Run on iOS bzw. Android" klicken
- Warten bis die Expo App im Simulator/Emulator geöffnet und die eigene App heruntergeladen wurde

## Eingesetzte Bibliotheken

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Redux](https://redux.js.org/api/api-reference)
- [Firebase](https://firebase.google.com/docs/reference/js)
- [Segment Control](https://github.com/react-native-segmented-control/segmented-control)
- [Picker](https://github.com/react-native-picker/picker)
- [Datetime Picker](https://github.com/react-native-datetimepicker/datetimepicker)
- [React Native Chart Kit](https://github.com/indiespirit/react-native…)
- [Currency Input](https://github.com/CaioQuirinoMedeiros/react-native-currency-input)
- [Gesture Handler - Swipeable](https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/swipeable)
- [SafeAreaContext](https://docs.expo.io/versions/v40.0.0/sdk/safe-area-context/)
- [StatusBar](https://docs.expo.io/versions/v40.0.0/sdk/status-bar/#statusbarstyle)
- [Icons](https://docs.expo.io/guides/icons/)
- [BlurView](https://docs.expo.io/versions/v40.0.0/sdk/blur-view/)
- [Camera](https://docs.expo.io/versions/latest/sdk/camera/)

## Offene Punkte/Probleme
- Problem bei der Verwendung von Firebase in Android (siehe [Link](https://github.com/facebook/react-native/issues/12981))
- Die Kamera-Funktionalität konnte nicht mit einem Android Smartphone getestet werden (kein Android-Gerät im Besitz, das Kamera Paket unterstützt den Android Emulator nicht)

## Ideen/Erweiterungen für zukünftige Versionen
- Verbesserung der Animationen durch den Einsatz von Reanimated und/oder Lottie
- Möglichkeit Bilder aus der Galerie mit Hilfe eines [ImagePicker](https://docs.expo.io/versions/v40.0.0/sdk/imagepicker/) einzubinden
