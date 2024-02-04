/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Loading } from "../components/Loading";
import { api } from "../service/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [exhanges, setExchanges] = useState([]);
  const [modalDeleteCountryIsOpen, setModalDeleteCountryIsOpen] =
    useState(false);
  const [destinySelected, setDestinySelected] = useState({});

  const { user } = useAuth();

  async function fetchData() {
    try {
      setIsLoading(true);

      const [responseCountries, responseExchanges] = await Promise.all([
        api.get("/countries"),
        api.get("/exchange"),
      ]);

      setExchanges(responseExchanges.data);
      setCountries(responseCountries.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Alert.alert(
        "Erro na busca dos dados",
        "Algo de errado aconteceu na busca das informações, tente novamente mais tarde"
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDeleteCountry = async () => {
    await api.delete(`/countries/${destinySelected.id}`);
    setModalDeleteCountryIsOpen(false);

    fetchData();
  };

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#BED5FF",
              width: "100%",
              height: 120,
              borderColor: "#BED5FF",
              borderWidth: 5,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    paddingVertical: 1,
                    fontSize: 30,
                    marginLeft: 10,
                    fontWeight: 800,
                    color: "#2264C7",
                  }}
                >
                  ExchangeU
                </Text>
              </View>
              <Image
                source={require("./assets/logoSemFundo.png")}
                style={{
                  height: 60,
                  width: 60,
                }}
              />
            </View>
            <View style={{ height: 50, width: 100, flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={require("./assets/profileIcon.png")}
                  style={{
                    height: 35,
                    width: 35,
                    margin: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Info")}>
                <Image
                  source={require("./assets/infoIcon.png")}
                  style={{
                    height: 35,
                    width: 35,
                    margin: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
                color: "black",
              }}
            >
              Destinos
            </Text>

            {user?.admin && (
              <Pressable onPress={() => navigation.navigate("NewDestiny")}>
                <Ionicons name="add-circle" size={32} color="#7AC943" />
              </Pressable>
            )}
          </View>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                {countries.map((country) => (
                  <TouchableOpacity
                    key={country.id}
                    onPress={() =>
                      navigation.navigate("CollegesDestiny", {
                        country,
                      })
                    }
                    style={{
                      position: "relative",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: country.photoUrl }}
                        style={{
                          height: 38,
                          width: 38,
                          top: 35,
                          position: "absolute",
                          zIndex: 2,
                        }}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          zIndex: 3,
                          fontWeight: "bold",
                          top: 70,
                          color: "black",
                          width: "65%",
                          textAlign: "center",
                        }}
                      >
                        {country.name}
                      </Text>
                      <Image
                        source={require("./assets/yellowCircle.png")}
                        style={{
                          height: 117,
                          width: 117,
                          margin: 5,
                          zIndex: 1,
                        }}
                      />
                    </View>

                    {user?.admin && (
                      <Pressable
                        onPress={() => {
                          setDestinySelected(country);
                          setModalDeleteCountryIsOpen(true);
                        }}
                      >
                        <Ionicons
                          name="remove-circle-sharp"
                          size={32}
                          color="#EE5656"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                          }}
                        />
                      </Pressable>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              marginLeft: 15,
              color: "black",
            }}
          >
            Moedas
          </Text>
          <ScrollView horizontal={false}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    marginTop: 10,
                    width: 355,
                    height: 57.7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#E7BE29",
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./assets/dolar.png")}
                      style={{
                        height: 19,
                        width: 19,
                        position: "absolute",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 10, color: "black", marginBottom: -12 }}
                    >
                      Dólar Comercial
                    </Text>
                    <Text style={{ margin: 10, color: "black" }}>
                      {exhanges["USDBRL"]?.ask}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    marginTop: 10,
                    width: 355,
                    height: 57.7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#E7BE29",
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./assets/iene.png")}
                      style={{
                        height: 19,
                        width: 19,
                        position: "absolute",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 10, color: "black", marginBottom: -12 }}
                    >
                      Yen
                    </Text>
                    <Text style={{ margin: 10, color: "black" }}>
                      {exhanges["JPYBRL"]?.ask}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    marginTop: 10,
                    width: 355,
                    height: 57.7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#E7BE29",
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./assets/libra.png")}
                      style={{
                        height: 19,
                        width: 19,
                        position: "absolute",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 10, color: "black", marginBottom: -12 }}
                    >
                      Libra
                    </Text>
                    <Text style={{ margin: 10, color: "black" }}>
                      {exhanges["GBPBRL"]?.ask}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    marginTop: 10,
                    width: 355,
                    height: 57.7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#E7BE29",
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./assets/euro.png")}
                      style={{
                        height: 19,
                        width: 19,
                        position: "absolute",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 10, color: "black", marginBottom: -12 }}
                    >
                      Euro
                    </Text>
                    <Text style={{ margin: 10, color: "black" }}>
                      {exhanges["EURBRL"]?.ask}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FBECB8",
                    marginLeft: 20,
                    marginTop: 10,
                    width: 355,
                    height: 57.7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#E7BE29",
                      marginLeft: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./assets/peso.png")}
                      style={{
                        height: 19,
                        width: 19,
                        position: "absolute",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 10, color: "black", marginBottom: -12 }}
                    >
                      Peso
                    </Text>
                    <Text style={{ margin: 10, color: "black" }}>
                      {exhanges["ARSBRL"]?.ask}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              backgroundColor: "#BED5FF",
              width: "100%",
              height: 80 + getBottomSpace(),
              borderColor: "#BED5FF",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Visa")}>
              <Image
                source={require("./assets/visa.png")}
                style={{
                  height: 52,
                  width: 52,
                  top: 2,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Finances")}>
              <Image
                source={require("./assets/pig.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Utilities")}>
              <Image
                source={require("./assets/tip.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Asurance")}>
              <Image
                source={require("./assets/seguros.png")}
                style={{
                  height: 55,
                  width: 55,
                  top: 2,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Contracts")}>
              <Image
                source={require("./assets/estude.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteCountryIsOpen}
        onRequestClose={() => {
          setModalDeleteCountryIsOpen(!modalDeleteCountryIsOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Está prestes a excluir o destino {destinySelected?.name}
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
                onPress={handleDeleteCountry}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() =>
                  setModalDeleteCountryIsOpen(!modalDeleteCountryIsOpen)
                }
              >
                <Text style={styles.textStyle}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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

export default Home;
