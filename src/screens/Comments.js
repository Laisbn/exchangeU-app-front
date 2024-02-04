/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { subCategories } from "./constants/subcategories";
import { Header } from "../components/Header";
import { api } from "../service/api";
import { useFocusEffect } from "@react-navigation/native";
import { CommentItem } from "../components/CommentItem";

const Comments = ({ navigation }) => {
  const [comments, setComments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryChecked, setCountryChecked] = useState(-1);
  const [countrySelected, setCountrySelected] = useState(-1);

  const route = useRoute();

  const subCategory = subCategories.find(
    (subCategory) => subCategory.id === route.params.subCategoryId
  );

  async function fetchData() {
    try {
      if (subCategory) {
        const [responseComments, responseCountries] = await Promise.all([
          countrySelected && countrySelected > 0
            ? api.get(
                `/comments?subCategoryId=${subCategory.id}&countryId=${countrySelected}`
              )
            : api.get(`/comments?subCategoryId=${subCategory.id}`),
          api.get("/countries"),
        ]);

        setComments(responseComments.data);
        setCountries(responseCountries.data);
      }
    } catch (error) {
      Alert.alert(
        "Erro na busca dos dados",
        "Algo de errado aconteceu na busca dos comentários, tente novamente mais tarde",
        error.message
      );
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [route, countrySelected])
  );

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={subCategory.name}
        rightOptions
        params={{
          subCategoryId: route.params.subCategoryId,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
          marginBottom: 3,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("./assets/filter.png")}
            style={{
              height: 32,
              width: 32,
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
                  keyExtractor={(item) => item.id}
                  data={[{ id: -1, name: "Todos" }, ...countries]}
                  renderItem={({ item }) => (
                    <Pressable
                      key={item.id}
                      onPress={() => setCountryChecked(item.id)}
                      style={{
                        borderColor: "black",
                        width: 210,
                        height: 44,
                        backgroundColor: "white",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 15,
                          color:
                            countryChecked === item.id ? "#BED5FF" : "black",
                          fontWeight:
                            countryChecked === item.id ? "800" : "400",
                        }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                  style={{
                    flex: 1,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    JustifyContent: "space-between",
                  }}
                >
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setCountryChecked(countrySelected);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Voltar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      setCountrySelected(countryChecked);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Ok</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        {comments.map((comment, index) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 48,
            marginBottom: 10,
            borderColor: "#CACCCC",
            backgroundColor: "#F1F5F4",
            borderWidth: 1,
            borderRadius: 15,
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
            onPress={() =>
              navigation.navigate("NewComent", {
                subCategoryId: subCategory.id,
              })
            }
          >
            <Text style={{ marginLeft: 20 }}>Escreva sobre...</Text>
          </Pressable>
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#BED5FF",
    borderWidth: 2,
    borderColor: "#E7BE29",
    borderRadius: 20,
    padding: 16,
    height: 300,
    width: 285,
    justifyContent: "center",
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
  content: {},
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

export default Comments;
