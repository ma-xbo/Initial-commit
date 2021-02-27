import React, { useState, useLayoutEffect } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteFinanceItem } from "../redux/actions/Finance";
import firebase from "../Firebase";
import { selectablePaymentMethods } from "../Helper";
import {
  OverflowMenuContainer,
  OverflowMenuItem,
} from "../components/OverflowMenu";
import Hr from "../components/HorizontalRule";
import DetailsContainer from "../components/DetailsContainer";
const colorDefinitions = require("../../assets/colorDefinition.json");

function Overview_Details(props) {
  const route = props.route;
  const navigation = props.navigation;

  const [displayHeaderMenu, setDisplayHeaderMenu] = useState(false);
  const item = JSON.parse(route.params.itemObject);
  item.date = new Date(item.date);
  item.createdAt = new Date(item.createdAt);
  item.modifiedAt = new Date(item.modifiedAt);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setDisplayHeaderMenu(!displayHeaderMenu)}
          style={{ padding: 10 }}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation, displayHeaderMenu]);

  const onPressEdit = () => {
    setDisplayHeaderMenu(false);
    navigation.navigate("Bearbeiten", {
      itemObject: route.params.itemObject,
    });
  };

  const onPressDelete = () => {
    console.log("delete item: " + item.docId);

    props.deleteFinanceItem(item.docId);

    firebase.db
      .collection("financialData")
      .doc(item.docId)
      .delete()
      .then(() => {
        Alert.alert(
          "Löschen erfolgreich 🗑️",
          "Der Eintrag " + item.title + " wurde gelöscht"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Fehler",
          "Beim Löschen ist ein Fehler aufgetreten: " + error.message
        );
      });

    setDisplayHeaderMenu(false);
    navigation.navigate("Übersicht");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text>{displayHeaderMenu}</Text>
        <Pressable
          style={styles.contentContainer}
          onPress={() => setDisplayHeaderMenu(false)}
        >
          <DetailsContainer title="Titel" text={item.title} />
          <DetailsContainer
            title="Datum"
            text={new Date(item.date).toDateString()}
          />
          <DetailsContainer
            title="Betrag"
            text={item.amount + item.currency}
            containerStyle={
              item.amount < 0
                ? { backgroundColor: colorDefinitions.light.red }
                : { backgroundColor: colorDefinitions.light.green }
            }
          />
          <DetailsContainer
            title="Bezahlmethode"
            text={
              selectablePaymentMethods.find(
                (el) => el.value === item.paymentMethod
              ).label
            }
          />
          <DetailsContainer title="Geschäft" text={item.store} />
          <DetailsContainer title="Kategorie" text={item.category} />
          {item.description !== "" && (
            <DetailsContainer title="Beschreibung" text={item.description} />
          )}

          {item.imageUrl !== "" && (
            <DetailsContainer title="Angehängtes Bild">
              <View style={{ height: 300 }}>
                <Image
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="contain"
                  source={{ uri: item.imageUrl }}
                />
              </View>
            </DetailsContainer>
          )}

          <DetailsContainer
            title="Erstellt am"
            text={new Date(item.createdAt).toDateString()}
          />
          <DetailsContainer
            title="Zuletzt geändert am"
            text={new Date(item.modifiedAt).toDateString()}
          />
        </Pressable>

        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.controlButton,
                { backgroundColor: colorDefinitions.light.blue },
              ]}
              onPress={onPressEdit}
            >
              <Ionicons
                name="construct"
                size={22}
                color={colorDefinitions.light.white}
              />
              <Text style={styles.controlButtonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={[
                styles.controlButton,
                { backgroundColor: colorDefinitions.light.red },
              ]}
              onPress={onPressDelete}
            >
              <Ionicons
                name="trash"
                size={22}
                color={colorDefinitions.light.white}
              />
              <Text style={styles.controlButtonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {displayHeaderMenu && (
        <OverflowMenuContainer
          menuType="topRight"
          closeAction={() => setDisplayHeaderMenu(false)}
          bottom
        >
          <OverflowMenuItem text="Edit" action={onPressEdit} />
          <Hr />
          <OverflowMenuItem text="Delete" action={onPressDelete} />
        </OverflowMenuContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  bottomContainer: {
    width: "100%",
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: 150,
    padding: 6,
    marginVertical: 1,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 22,
    marginHorizontal: 6,
    color: colorDefinitions.light.white,
  },
});

const mapStateToProps = (state) => {
  return { financeData: state.finance };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ deleteFinanceItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overview_Details);
