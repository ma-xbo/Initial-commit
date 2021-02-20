import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import AppSafeAreaView from "../components/AppSafeAreaView";
import SubscriptionItem from "../components/SubscriptionItem";

function Templates_List(props) {
  const navigation = props.navigation;

  return (
    <AppSafeAreaView title="Vorlagen">
      <View style={{ width: "100%" }}>
        {props.currentUser.config.templates.length > 0 && (
          <FlatList
            data={props.currentUser.config.templates}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item) => item.templateId}
            renderItem={({ item }) => (
              <SubscriptionItem
                itemObject={item}
                onPress={() =>
                  navigation.navigate("Details", {
                    itemObject: item,
                  })
                }
              />
            )}
          />
        )}
        {props.currentUser.config.templates.length === 0 && (
          <Text style={{ alignSelf: "center", fontSize: 20, opacity: 0.5 }}>
            Keine Templates vorhanden
          </Text>
        )}
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

export default connect(mapStateToProps)(Templates_List);
