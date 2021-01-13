import React, { useState, useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethodIcon from "../components/PaymentMethodIcon";
import PaymentAmountText from "../components/PaymentAmountText";
import {
  OverflowMenuContainer,
  OverflowMenuItem,
} from "../components/OverflowMenu";
import Hr from "../components/HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Subscriptions_Details(props) {
  const route = props.route;
  const navigation = props.navigation;
  const item = JSON.parse(route.params.itemObject);

  const [displayHeaderMenu, setDisplayHeaderMenu] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Abo Details",
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
            <Hr />
            <CardItem title="Datum" text={item.amount + " " + item.currency} />
            <Hr />
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
