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
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSafeAreaView from "../components/AppSafeAreaView";
import FoldableSection from "../components/FoldableSection";
import CategoryListItem from "../components/CategoryListItem";
import SwipeableActionItem from "../components/SwipeableActionItem";

const colorDefinitions = require("../assets/colorDefinition.json");

function Settings(props) {
  const navigation = props.navigation;
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    email: "",
    config: {
      categories: [],
      stores: [],
    },
  });
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setUserInfo(props.currentUser);
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

        <FoldableSection cardTitle="Kategorien">
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
        </FoldableSection>

        <FoldableSection cardTitle="Geschäfte">
          <FlatList
            data={userInfo.config.stores}
            style={{ height: 200 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={renderRightActions}>
                <CategoryListItem name={item} />
              </Swipeable>
            )}
          />
          <Button
            title="Geschäft hinzufügen"
            onPress={addCategory}
            style={styles.addCategoryButton}
          />
        </FoldableSection>

        {isEdited && (
          <Pressable
            style={styles.saveEditButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.saveEditText}>Save</Text>
          </Pressable>
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
  saveEditButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: colorDefinitions.light.blue,
    opacity: 0.85,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  saveEditText: {
    fontSize: 18,
    color: colorDefinitions.light.white,
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
