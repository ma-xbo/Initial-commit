import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSafeAreaView from "../components/AppSafeAreaView";
import FoldableSection from "../components/FoldableSection";
import CategoryListItem from "../components/CategoryListItem";
import SwipeableActionItem from "../components/SwipeableActionItem";
import CustomModal from "../components/CustomModal";
import {
  addCategory,
  addStore,
  deleteCategory,
  deleteStore,
} from "../js/redux/actions/User";
import { TextInput } from "react-native-gesture-handler";

const colorDefinitions = require("../assets/colorDefinition.json");

function Settings(props) {
  const navigation = props.navigation;
  const [isCatModalVisible, setIsCatModalVisible] = useState(false);
  const [isStoModalVisible, setIsStoModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newStore, setNewStore] = useState("");

  const addStore = () => {
    props.addStore(newStore);
  };

  const deleteCategory = () => {
    alert("Delete category");
  };

  const deleteStore = () => {
    alert("Delete category");
  };

  const swipDeleteCategory = (progress, itemId) => (
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
        onPress={deleteCategory}
      />
    </View>
  );

  const swipDeleteStore = (progress, itemId) => (
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
        onPress={deleteStore}
      />
    </View>
  );

  return (
    <AppSafeAreaView title="Einstellungen">
      <View style={styles.container}>
        <Text>Name: {props.currentUser.name}</Text>
        <Text>ID: {props.currentUser.userId}</Text>

        <FoldableSection cardTitle="Kategorien">
          <FlatList
            data={props.currentUser.config.categories}
            style={{ height: 200 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={swipDeleteCategory}>
                <CategoryListItem name={item} />
              </Swipeable>
            )}
          />
          <Button
            title="Kategorie hinzufügen"
            onPress={() => setIsCatModalVisible(true)}
            style={styles.addCategoryButton}
          />
        </FoldableSection>

        <FoldableSection cardTitle="Geschäfte">
          <FlatList
            data={props.currentUser.config.stores}
            style={{ height: 200 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={swipDeleteStore}>
                <CategoryListItem name={item} />
              </Swipeable>
            )}
          />
          <Button
            title="Geschäft hinzufügen"
            onPress={() => setIsStoModalVisible(true)}
            style={styles.addCategoryButton}
          />
        </FoldableSection>

        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <CustomModal isVisible={isCatModalVisible}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Neue Kategorie:
        </Text>
        <TextInput
          placeholder="Kategorie"
          style={styles.basicTextInput}
          value={newCategory}
          onChangeText={(val) => setNewCategory(val)}
        />
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => setIsCatModalVisible(false)}
            style={[
              styles.saveEditButton,
              { backgroundColor: colorDefinitions.light.gray },
            ]}
          >
            <Text>Abbrechen</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (newCategory !== "") {
                props.addCategory(newCategory);
                setNewCategory("");
                setIsCatModalVisible(false);
              }
            }}
            style={styles.saveEditButton}
          >
            <Text>Speichern</Text>
          </Pressable>
        </View>
      </CustomModal>
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
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: colorDefinitions.light.blue,
    opacity: 0.85,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
  basicTextInput: {
    fontSize: 18,
    backgroundColor: colorDefinitions.light.gray6,
    padding: 10,
    borderRadius: 15,
  },
});

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { addCategory, addStore, deleteCategory, deleteStore },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
