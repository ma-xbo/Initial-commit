import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import firebase from "../js/Firebase";
import "firebase/auth";

export default function Login(props) {
  const navigation = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _signIn = async () => {
    try {
      let response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        alert("Login erfolgreich", "Willkommen zurück");
        console.log(response.user.uid);
        navigation.navigate("MainNav", {});
      }
    } catch (e) {
      switch (e) {
        case "Error: The password is invalid or the user does not have a password.":
          alert(
            "Fehler",
            "Die eingegebene Kombination aus E-Mail und Passwort ist falsch. Bitte versuchen Sie er erneut."
          );
          break;
        case "[Error: The email address is badly formatted.]":
          alert(
            "Fehler",
            "Die eingegebene Kombination aus E-Mail und Passwort ist falsch. Bitte versuchen Sie er erneut."
          );

          break;

        default:
          break;
      }
      setEmail("");
      setPassword("");
    }
  };

  const _navSignUp = () => {
    navigation.navigate("SignUp", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Willkommen</Text>
      <Text>Bitte loggen Sie sich ein</Text>
      <View>
        <TextInput
          placeholder="Benutzername"
          style={styles.inputStyle}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Passwort"
          style={styles.inputStyle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={_signIn} />
        <Button title="Registrieren" onPress={_navSignUp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    alignSelf: "center",
    width: 200,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "black",
  },
});
