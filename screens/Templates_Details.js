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

  const item = route.params.itemObject;
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
    alert("Edit item: ", item.templateId);
  };

  const onPressDelete = () => {
    alert("Delete item: ", item.templateId);

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
            <Text>Test</Text>
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

const mapStateToProps = (state) => {
  return { userProfile: state.currentUser };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ deleteTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates_Details);
