import React, { useState } from "react";
import {
  Animated,
  Button,
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSafeAreaView from "../components/AppSafeAreaView";
import FoldableSection from "../components/FoldableSection";
import CategoryListItem from "../components/CategoryListItem";
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

  const deleteCategory = (itemName) => {
    props.deleteCategory(itemName);
    //TODO Firebase
  };

  const deleteStore = (itemName) => {
    props.deleteStore(itemName);
    //TODO Firebase
  };

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
              <Swipeable
                renderRightActions={(progress) => {
                  const trans = progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [64, 0],
                  });
                  return (
                    <View sty={{ width: 64 }}>
                      <Animated.View
                        style={{ flex: 1, transform: [{ translateX: 0 }] }}
                      >
                        <RectButton
                          style={[
                            styles.swipeButton,
                            { flex: 1, backgroundColor: "red" },
                          ]}
                          onPress={() => {
                            deleteCategory(item);
                          }}
                        >
                          <Text style={styles.textStyle}>Löschen</Text>
                        </RectButton>
                      </Animated.View>
                    </View>
                  );
                }}
              >
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
              <Swipeable
                renderRightActions={(progress) => {
                  const trans = progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [64, 0],
                  });
                  return (
                    <View sty={{ width: 64 }}>
                      <Animated.View
                        style={{ flex: 1, transform: [{ translateX: 0 }] }}
                      >
                        <RectButton
                          style={[
                            styles.swipeButton,
                            { flex: 1, backgroundColor: "red" },
                          ]}
                          onPress={() => {
                            deleteStore(item);
                          }}
                        >
                          <Text style={styles.textStyle}>Löschen</Text>
                        </RectButton>
                      </Animated.View>
                    </View>
                  );
                }}
              >
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
        <Text style={styles.modalTitle}>Neue Kategorie:</Text>
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
              if (
                newCategory !== "" &&
                !props.currentUser.config.categories.includes(newCategory)
              ) {
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
      <CustomModal isVisible={isStoModalVisible}>
        <Text style={styles.modalTitle}>Neues Geschäft:</Text>
        <TextInput
          placeholder="Geschäft"
          style={styles.basicTextInput}
          value={newStore}
          onChangeText={(val) => setNewStore(val)}
        />
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => setIsStoModalVisible(false)}
            style={[
              styles.saveEditButton,
              { backgroundColor: colorDefinitions.light.gray },
            ]}
          >
            <Text>Abbrechen</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (
                newStore !== "" &&
                !props.currentUser.config.stores.includes(newStore)
              ) {
                props.addStore(newStore);
                setNewStore("");
                setIsStoModalVisible(false);
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
  swipeButton: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    marginRight: 3,
    marginVertical: 3,
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
  modalTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
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
