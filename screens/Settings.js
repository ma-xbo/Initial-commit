import React, { useState } from "react";
import {
  Button,
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSafeAreaView from "../components/AppSafeAreaView";
import CategoryListItem from "../components/CategoryListItem";
const colorDefinitions = require("../assets/colorDefinition.json");
const dummyProfile = require("../assets/dummyProfile.json");

export default function Settings(props) {
  const navigation = props.navigation;
  const [displayOptional, setDisplayOptional] = useState(true);
  const categoriesArray = dummyProfile.categories;

  return (
    <AppSafeAreaView title="Einstellungen">
      <View style={styles.container}>
        <Pressable
          onPress={() => setDisplayOptional(!displayOptional)}
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colorDefinitions.light.gray2,
              padding: 10,
              marginTop: 20,
              marginHorizontal: 5,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
            !displayOptional && {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
          ]}
        >
          <Text
            style={{
              color: colorDefinitions.light.white,
              fontSize: 20,
            }}
          >
            Kategorien
          </Text>
          {!displayOptional && (
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorDefinitions.light.white}
            />
          )}
          {displayOptional && (
            <Ionicons
              name="arrow-down"
              size={24}
              color={colorDefinitions.light.white}
            />
          )}
        </Pressable>
        {displayOptional && (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: colorDefinitions.light.gray3,
              padding: 10,
              marginHorizontal: 5,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Button title="Kategorie hinzufügen" />
            <FlatList
              data={categoriesArray}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CategoryListItem name={item} />}
            />
          </View>
        )}

        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: colorDefinitions.light.red,
    opacity: 0.85,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  logoutText: {
    fontSize: 18,
    color: colorDefinitions.light.white,
  },
});
