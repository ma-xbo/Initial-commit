import React, { useState, useLayoutEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethodIcon from "./PaymentMethodIcon";
import PaymentAmountText from "./PaymentAmountText";
import { OverflowMenuContainer, OverflowMenuItem } from "./OverflowMenu";
import Hr from "./HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_Details(props) {
  const route = props.route;
  const navigation = props.navigation;
  const item = JSON.parse(route.params.itemObject);
  const [displayHeaderMenu, setDisplayHeaderMenu] = useState(false);

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

  const dateText = new Date(item.date).toDateString();
  const amountBackColor =
    item.amount < 0 ? colorDefinitions.light.red : colorDefinitions.light.green;

  const onPressEdit = () => {
    alert("Greetings from edit");
  };

  const onPressDelete = () => {
    alert("Greetings from delete");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text>{displayHeaderMenu}</Text>
        <Pressable
          style={styles.contentContainer}
          onPress={() => setDisplayHeaderMenu(false)}
        >
          <View
            style={{
              flex: 1,
              margin: 8,
              padding: 5,
            }}
          >
            <CardItem title="Titel" text={item.title} />
            <Hr />
            <CardItem title="Beschreibung" text={item.description} />
            <View
              style={{
                marginVertical: 30,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 250,
                  width: 250,
                  marginHorizontal: 4,
                  padding: 20,
                  borderRadius: 200,
                  backgroundColor: amountBackColor,
                  shadowColor: colorDefinitions.light.gray,
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  opacity: 0.9,
                }}
              >
                <Text style={{ fontSize: 30, color: "white" }}>
                  {item.amount}
                  {item.currency}
                </Text>
              </View>
            </View>
            <CardItem title="Bezahlmethode">
              <View style={{ flexDirection: "row" }}>
                <PaymentMethodIcon paymentMethod={item.paymentMethod} />
                <Text>{item.paymentMethod}</Text>
              </View>
            </CardItem>
            <Hr />
            <CardItem title="Datum" text={dateText} />
          </View>
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
        <OverflowMenuContainer closeAction={() => setDisplayHeaderMenu(false)} bottom>
          <OverflowMenuItem text="Edit" action={onPressEdit} />
          <Hr />
          <OverflowMenuItem text="Delete" action={onPressDelete} />
        </OverflowMenuContainer>
      )}
    </View>
  );
}

function CardItem(props) {
  const { title, text, children } = props;

  return (
    <View
      style={{
        /*  backgroundColor: colorDefinitions.light.gray5, */
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 4,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
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
