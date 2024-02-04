/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import cam from "./assets/cam.png";
import Button from "./assets/components/Button";
import { Loading } from "../components/Loading";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useAuth } from "../hooks/auth";

import { api } from "../service/api";

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { signOut } = useAuth();

  async function fetchData() {
    try {
      setIsLoading(true);

      const response = await api.get("/users/me");

      setProfile(response.data);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "É necessário a permissão para acessar a câmera para a alteraçāo da foto!"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: "Images",
    });

    if (!pickerResult.canceled) {
      const data = new FormData();

      data.append("photoUrl", {
        uri: pickerResult.assets[0].uri,
        type: mime.getType(pickerResult.assets[0].uri) || "image",
        name: pickerResult.assets[0].uri.split("/").pop(),
      });

      await api.patchForm("/users/photo-profile", data);

      fetchData();
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  {
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <View
          style={{
            backgroundColor: "#BED5FF",
            width: "100%",
            height: 280,
            borderColor: "#BED5FF",
            borderWidth: 5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: "column",
            alignItems: "center",
            paddingTop:30
          }}
        >
          <View
            style={{
              height: 50,
              width:'100%',
              justifyContent:'flex-start',
              alignItems:'center',
              flexDirection: "row",
            }}
          >
            <Pressable onPress={() => navigation.navigate("Home")}>
              <Image
                source={require("./assets/arrow.png")}
                style={{
                  height: 31,
                  width: 24,
                  marginLeft:15
                }}
              />
            </Pressable>
            <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#2264C7",
                marginLeft:'47%'
              }}>
              Perfil
            </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={
                profile?.photoUrl
                  ? { uri: profile?.photoUrl }
                  : require("./assets/imgPlaceHolder.png")
              }
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
                borderWidth: 8,
                borderColor: "blue",
              }}
            />
            <View style={{ marginTop: -30, marginLeft: 70 }}>
              <TouchableOpacity
                onPress={handleUpdateAvatar}
                style={{ alignItems: "flex-end" }}
              >
                <Image style={{ width: 50, height: 50 }} source={cam} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "column", margin: 70 }}>
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
                    Está prestes a sair do aplicativo{" "}
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
                      onPress={() => {
                        signOut();
                        navigation.navigate("Welcome");
                      }}
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
            <View
              style={{
                height: 48,
                borderColor: "#CACCCC",
                backgroundColor: "#F1F5F4",
                borderWidth: 1,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                margin:10,
                paddingLeft:15
              }}
            >
              <TextInput
                placeholder="Nome de Usuário"
                placeholderTextColor="#797B7A"
                keyboardType="ascii-capable"
                style={{
                  width: "100%",
                }}
                editable={false}
                defaultValue={profile?.name}
              />
            </View>
            <View
              style={{
                height: 48,
                margin:10,
                marginTop: 15,
                borderColor: "#CACCCC",
                backgroundColor: "#F1F5F4",
                borderWidth: 1,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#797B7A"
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                editable={false}
                defaultValue={profile?.email}
              />
            </View>
            <View
              style={{
                width: 300,
                height: 48,
                margin:10,
                marginTop: 15,
                borderColor: "#CACCCC",
                backgroundColor: "#F1F5F4",
                borderWidth: 1,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginBottom:20
              }}
            >
              <TextInput
                placeholder="Instituição de Ensino"
                placeholderTextColor="#797B7A"
                keyboardType="default"
                style={{
                  width: "100%",
                }}
                editable={false}
                defaultValue={profile?.college}
              />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Button
                title="Sair"
                onPress={() => setModalVisible(true)}
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Pressable onPress={() => navigation.navigate("Home")}>
              <Image
                source={require("./assets/logoSemFundo.png")}
                style={{
                  height: 60,
                  width: 60,
                  margin:10
                }}
              />
            </Pressable>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            
          </View>
        </View>
      </>
    );
  }
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

export default Profile;
