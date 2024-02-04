/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import { api } from "../service/api";
import { useAuth } from "../hooks/auth";
import { Header } from "../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";

const CollegesDestiny = ({ navigation }) => {
  const route = useRoute();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState({});
  const [colleges, setColleges] = useState([]);
  const [modalDeleteCollegeIsOpen, setModalDeleteCollegeIsOpen] =
    useState(false);
  const [collegeSelected, setCollegeSelected] = useState({});

  async function fetchData() {
    const country = route.params?.country;

    setCountry(country);

    try {
      setIsLoading(true);

      if (country.id) {
        const response = await api.get(`/college/${country.id}`);

        setColleges(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Alert.alert(
        "Erro na busca dos dados",
        "Algo de errado aconteceu na busca das informações, tente novamente mais tarde",
        error.message
      );
    }
  }

  const handleDeleteCollege = async () => {
    try {
      await api.delete(`/college/${collegeSelected.id}`);

      setModalDeleteCollegeIsOpen(false);

      fetchData();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [route])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title={country.name} />

      {user?.admin && (
        <Pressable
          style={{ alignSelf: "center", marginTop: 8 }}
          onPress={() =>
            navigation.navigate("NewCollege", {
              countryId: route.params?.country.id,
            })
          }
        >
          <Ionicons name="add-circle" size={48} color="#7AC943" />
        </Pressable>
      )}

      {colleges.length > 0 ? (
        <ScrollView style={{ flex: 1, gap: 8, marginTop: 16 }}>
          {colleges.map((college) => (
            <Pressable
              key={college.id}
              style={{ flexDirection: "column", marginBottom: 16 }}
              onPress={
                college.site ? () => Linking.openURL(college.site) : undefined
              }
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    width: 355,
                    height: 120,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 91,
                      height: 100,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 15,
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        college.photoUrl !== ""
                          ? {
                              uri: college.photoUrl,
                            }
                          : require("./assets/sem-foto.jpg")
                      }
                      style={{
                        height: college.photoUrl !== "" ? 50 : 80,
                        width: college.photoUrl !== "" ? 80 : 110,
                        objectFit: "scale-down",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{
                        margin: 10,
                        color: "black",
                        fontWeight: "800",
                        fontSize: 16,
                        width: "92%",
                      }}
                    >
                      {college.name}
                    </Text>
                  </View>
                </View>
              </View>
              {user?.admin && (
                <Pressable
                  onPress={() => {
                    setCollegeSelected(college);
                    setModalDeleteCollegeIsOpen(true);
                  }}
                >
                  <Ionicons
                    name="remove-circle-sharp"
                    size={32}
                    color="#EE5656"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 18,
                    }}
                  />
                </Pressable>
              )}
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            rowGap: 16,
          }}
        >
          <Text style={{ fontSize: 48 }}>{":("}</Text>
          <Text style={{ fontSize: 16, width: "60%", textAlign: "center" }}>
            Ainda não temos informações sobre as instituições deste país
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: "#BED5FF",
            width: "100%",
            height: 90,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteCollegeIsOpen}
        onRequestClose={() => {
          setModalDeleteCollegeIsOpen(!modalDeleteCollegeIsOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Está prestes a excluir a instiuição {collegeSelected?.name}
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
                onPress={handleDeleteCollege}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() =>
                  setModalDeleteCollegeIsOpen(!modalDeleteCollegeIsOpen)
                }
              >
                <Text style={styles.textStyle}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

export default CollegesDestiny;
