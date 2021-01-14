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

  const tes = () => {
    navigation.navigate("MainNav", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello from Login</Text>
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={tes} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
});
