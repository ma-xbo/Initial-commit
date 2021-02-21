import React, { useState, useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { deleteTemplate } from "../js/redux/actions/User";
import PaymentMethodIcon from "../components/PaymentMethodIcon";
import PaymentAmountText from "../components/PaymentAmountText";
import {
  OverflowMenuContainer,
  OverflowMenuItem,
} from "../components/OverflowMenu";
import Hr from "../components/HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

function Templates_Details(props) {
  const route = props.route;
  const navigation = props.navigation;
  const [displayHeaderMenu, setDisplayHeaderMenu] = useState(false);

  const item = JSON.parse(route.params.itemObject);
  item.date = new Date(item.date);
  item.createdAt = new Date(item.createdAt);
  item.modifiedAt = new Date(item.modifiedAt);

  console.log(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details zu Vorlage",
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
    alert("Edit item: " + item.templateId);
    //TODO Add Edit Screen
    //Navigate to Edit Screen
  };

  const onPressDelete = () => {
    alert("Delete item: " + item.templateId);

    //TODO Redux
    //deleteTemplate(item.templateId)

    //TODO Firebase
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
            <CardItem title="Betrag" text={item.amount + item.currency} />
            <CardItem title="Geschäft" text={item.store} />
            <CardItem title="Kategorie" text={item.category} />
            {item.description !== "" && (
              <CardItem title="Beschreibung" text={item.description} />
            )}
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
        backgroundColor: colorDefinitions.light.gray5,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 2,
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
});

const mapStateToProps = (state) => {
  return { userProfile: state.currentUser };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ deleteTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates_Details);
