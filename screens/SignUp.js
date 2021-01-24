import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function SignUp(props) {
  const navigation = props.navigation;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");

  const navLogin = () => {
    navigation.navigate("Login", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Bitte füllen Sie die nachfolgenden Felder aus</Text>
      <TextInput
        placeholder="Benutzername"
        style={styles.inputStyle}
        value={username}
        onChangeText={setUsername}
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
      <Button title="Account erstellen" onPress={navLogin} />
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
