import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import users from "../data/users";
import textCommentApps from "../data/textCommentApps";
import countries from "../data/countries";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const navigation = useNavigation();
  const [isPressedMap, setIsPressedMap] = useState({});
  const [isPressedMap2, setIsPressedMap2] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleButtonPress = (id) => {
    setIsPressedMap((prevState) => {
      const newState = { ...prevState };
      newState[id] = !prevState[id];
      return newState;
    });
  };

  const handleButtonPress2 = (id) => {
    setIsPressedMap2((prevState) => {
      const newState = { ...prevState };
      newState[id] = !prevState[id];
      return newState;
    });
  };

  const handleCountrySelection = (selectedCountry) => {
    const borderWidth = 1;
    //setModalVisible(!modalVisible);
  };

  function getUserText(id) {
    const textItem = textCommentApps.find((text) => text.idUser === id);
    return textItem ? <Text>{textItem.texto}</Text> : null;
  }

  function getUserItem({ item: user }) {
    return (
      <View>
        <View
          style={{ width: "auto", height: "auto", flexDirection: "column" }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "auto",
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: user.fotoUsuario }}
              key={user.id}
              title={user.name}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.text}>{getUserText(user.id)}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "80%",
                  marginTop: 4,
                }}
              >
                <TouchableOpacity onPress={() => handleButtonPress(user.id)}>
                  <Image
                    source={
                      isPressedMap[user.id]
                        ? require("./assets/like.png")
                        : require("./assets/whiteHeart.png")
                    }
                    style={{
                      height: 22,
                      width: 22,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress2(user.id)}>
                  <Image
                    source={
                      isPressedMap2[user.id]
                        ? require("./assets/atention.png")
                        : require("./assets/whiteAtention.png")
                    }
                    style={{
                      height: 22,
                      width: 22,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#BED5FF",
          width: "100%",
          height: 75,
          borderColor: "#BED5FF",
          borderWidth: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Utilities")}>
          <Image
            source={require("./assets/arrow.png")}
            style={{
              height: 31,
              width: 24,
              right: 100, // Ajuste a posição esquerda conforme necessário
            }}
          />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 800,
                color: "#2264C7",
              }}
            >
              Aplicativos
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
          marginBottom: -20,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("./assets/filter.png")}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </TouchableOpacity>
        <View>
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
                <FlatList
                  style={{ backgroundColor: "white" }}
                  keyExtractor={(country) => country.idPais.toString()}
                  data={countries}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{
                        borderColor: "black",
                        width: 210,
                        height: 44,
                        justifyContent: "center",
                        borderBottomWidth: 1,
                      }}
                      onPress={() => handleCountrySelection(item)}
                    >
                      <Text style={{ fontSize: 16, marginLeft: 15 }}>
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Voltar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={({ item }) => getUserItem({ item })}
      />

      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Pressable
          style={{ width: "95%" }}
          onPress={() => navigation.navigate("NewComent")}
        >
          <View
            style={{
              height: 48,
              marginBottom: 10,
              borderColor: "#CACCCC",
              backgroundColor: "#F1F5F4",
              borderWidth: 1,
              borderRadius: 15,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={{ marginLeft: 20 }}>Escreva sobre...</Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "#BED5FF",
          width: "100%",
          height: 75,
          borderColor: "#BED5FF",
          borderWidth: 5,
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
  avatar: {
    height: 60,
    width: 60,
    margin: 20,
  },
  name: {
    color: "black",
    fontWeight: "bold",
  },
  text: {
    color: "black",
  },
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
    height: 315,
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
