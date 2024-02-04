import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import { useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { api } from "../service/api";

export default () => {
  const navigation = useNavigation();

  const route = useRoute();

  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState([]);

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/countries");

      setCountries(response.data);
    }

    fetchData();
  }, []);

  const handleSaveComment = async () => {
    try {
      const subCategoryId = route.params.subCategoryId;

      await api.post("/comments/create", {
        subCategoryId,
        countryId: value,
        message: text,
      });

      navigation.goBack();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Novo Comentário" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10,
              marginTop: 75,
            }}
          >
            Selecione o país
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={countries.map((country) => ({
              label: country.name,
              value: country.id,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setCountries}
            placeholder=""
            style={{
              backgroundColor: "#F1F5F4",
              borderWidth: 1,
              borderRadius: 25,
              height: 39,
              borderColor: "#CACCCC",
            }}
          />

          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                marginTop: 26,
                borderColor: "#CACCCC",
                backgroundColor: "#F1F5F4",
                borderWidth: 1,
                borderRadius: 15,
                padding: 8,
                height: 181,
                width: 354,
                left: 4,
              }}
            >
              <TextInput
                placeholder="Escreva sobre..."
                placeholderTextColor="#797B7A"
                keyboardType="default"
                multiline
                onChangeText={(value) => setText(value)}
                style={{
                  alignItems: "flex-start",
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  JustifyContent: "space-between",
                }}
              >
                <Pressable
                  style={[styles.buttonComent, styles.buttonClose]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonComent, styles.buttonOpen]}
                  onPress={handleSaveComment}
                >
                  <Text style={styles.textStyle}>Enviar</Text>
                </Pressable>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Está prestes a desistir do comentário{" "}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "800",
                        fontSize: 24,
                        color: "#2264C7",
                      }}
                    >
                      Tem certeza?{" "}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        JustifyContent: "space-between",
                      }}
                    >
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => navigation.navigate("Home")}
                      >
                        <Text style={styles.textStyle}>Sim</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Não</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: "#BED5FF",
          width: "100%",
          height: 75,
          borderColor: "#BED5FF",
          borderWidth: 5,
          marginTop: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          tyle={{
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("./assets/logoSemFundo.png")}
              style={{
                height: 60,
                width: 60,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#BED5FF",
    borderWidth: 2,
    borderColor: "#E7BE29",
    borderRadius: 20,
    height: 189,
    width: 285,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    margin: 8,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: 87,
  },
  buttonComent: {
    borderRadius: 20,
    margin: 8,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: 125,
  },
  buttonOpen: {
    backgroundColor: "#7AC943",
  },
  buttonClose: {
    backgroundColor: "#EE5656",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: -15,
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
});
