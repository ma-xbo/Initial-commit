import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function Login(props) {
  const navigation = props.navigation;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navMainView = () => {
    navigation.navigate("MainNav", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Willkommen</Text>
      <Text>Bitte loggen Sie sich ein</Text>
      <View>
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
        <Button title="Sign in" onPress={navMainView} />
        <Button title="Registrieren" onPress={navMainView} />
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
