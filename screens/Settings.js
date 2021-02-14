import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSafeAreaView from "../components/AppSafeAreaView";
import CategoryListItem from "../components/CategoryListItem";
import SwipeableActionItem from "../components/SwipeableActionItem";

const colorDefinitions = require("../assets/colorDefinition.json");

function Settings(props) {
  const navigation = props.navigation;
  const [displayOptional, setDisplayOptional] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    email: "",
    config: {
      categories: [],
      stores: [],
    },
  });

  useEffect(() => {
    setUserInfo(props.currentUser)
  }, []);
  

  const addCategory = () => {
    alert("Add category");
  };

  const renderRightActions = (progress, itemId) => (
    <View
      style={{
        flexDirection: "row",
        width: 64,
      }}
    >
      <SwipeableActionItem
        text="Delete"
        color={colorDefinitions.light.red}
        x={64}
        progress={progress}
        onPress={() => {
          alert("text");
        }}
      />
    </View>
  );

  return (
    <AppSafeAreaView title="Einstellungen">
      <View style={styles.container}>
        <Text>Name: {userInfo.name}</Text>
        <Text>ID: {userInfo.userId}</Text>
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
            <FlatList
              data={userInfo.config.categories}
              style={{ height: 200 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Swipeable renderRightActions={renderRightActions}>
                  <CategoryListItem name={item} />
                </Swipeable>
              )}
            />
            <Button
              title="Kategorie hinzufügen"
              onPress={addCategory}
              style={styles.addCategoryButton}
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
  addCategoryButton: {
    marginTop: 5,
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

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

export default connect(mapStateToProps)(Settings);
