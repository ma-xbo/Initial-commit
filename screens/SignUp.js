import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import firebase from "../Firebase";
import "firebase/auth";

export default function SignUp(props) {
  const navigation = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");
  const [error, setError] = useState();

  const _signUp = () => {
    if (!email) {
      setError("Bitte geben Sie eine E-Mail Adresse ein");
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars");
      return;
    } else if (password !== passwordVeri) {
      setError(
        "Die eingegebenen Passwörter stimmen nicht miteinander überein!"
      );
      return;
    }

    _createUser(email, password);
    navigation.navigate("Login", {});
  };

  const _createUser = async (email, password) => {
    try {
      let response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert("Success ✅", "Account created successfully");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Bitte füllen Sie die nachfolgenden Felder aus</Text>
      <TextInput
        placeholder="E-Mail Adresse"
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
      <TextInput
        placeholder="Passwort bestätigen"
        style={styles.inputStyle}
        value={passwordVeri}
        onChangeText={setPasswordVeri}
        secureTextEntry
      />
      <Text style={styles.errorText}>{error}</Text>
      <Button title="Account erstellen" onPress={_signUp} />
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
  errorText: {
    color: "red",
  },
});
