import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "../js/Firebase";
import { loadUser } from "../js/redux/actions/User";

function Login(props) {
  const navigation = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _signIn = async () => {
    try {
      let response = await firebase.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response && response.user) {
        //Message
        alert("Login erfolgreich", "Willkommen zurück");

        // Get User Data from Firebase
        _getUserProfile(response.user.uid);

        //TODO Get Financial Data from Firebase
        //_getFinanceData();

        //Navigate
        _navMain();
      }
    } catch (e) {
      switch (e) {
        case "[Error: The password is invalid or the user does not have a password.]":
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
          console.log(e);
          break;
      }
      setEmail("");
      setPassword("");
    }
  };

  const _getUserProfile = async (userId) => {
    const docUser = await firebase.db
      .collection("userProfiles")
      .doc(userId)
      .get();

    if (!docUser.exists) {
      console.log("Userinformationen konnten nicht gefunden werden");
      return;
    }

    const userData = await docUser.data();
    props.loadUser(userData);
  };

  const _getFinanceData = async () => {
    const snapshot = await firebase.db
      .collection("userProfiles")
      .where("capital", "==", true)
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  const _navMain = () => {
    navigation.navigate("MainNav", {});
    navigation.reset({
      index: 0,
      routes: [{ name: "MainNav" }],
    });
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

const mapStateToProps = (state) => {
  return { userProfile: state.currentUser };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
