import React, { useState } from "react";
import { Button, Text, Modal, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry_CategorySelection(props) {
  const { categories, visible, onPress } = props;
  const [category, setCategory] = useState("");

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <BlurView
          intensity={100}
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Wählen Sie die Kategorie aus</Text>
              <Picker
                selectedValue={category}
                style={{ height: 50, width: 200, marginBottom: 150 }}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                {categories.map((val) => (
                  <Picker.Item label={val} value="js" />
                ))}
                {/*           <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="JavaScript" value="js2" />
                <Picker.Item label="JavaScript" value="js3" />
                <Picker.Item label="JavaScript" value="js4" />
                <Picker.Item label="JavaScript" value="js5" /> */}
              </Picker>
              <Button title="Auswahl bestätigen" onPress={onPress} />
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
