/* eslint-disable prettier/prettier */
import { View, Image, Pressable, TextInput, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import Button from "./assets/components/Button";
import cam from "./assets/cam.png";
import { Loading } from "../components/Loading";
import * as ImagePicker from "expo-image-picker";

import { api } from "../service/api";
import { Header } from "../components/Header";
import { ErrorMessageInput } from "../components/ErrorMessageInput";
import mime from "mime";

const NewDestiny = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSelectPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "É necessário a permissão para acessar a câmera para a alteraçāo da foto!"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
    });

    if (!pickerResult.canceled) {
      setPhotoUrl(pickerResult.assets[0]);
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setPhotoUrl(null);
    setIsError(false);
  };

  const handleCreateNewDestiny = async () => {
    if (name === "" && code === "") {
      return setIsError(true);
    }

    try {
      setIsLoading(true);

      const data = new FormData();

      data.append("name", name);
      data.append("code", code);

      if (photoUrl) {
        data.append("photoUrl", {
          uri: photoUrl.uri,
          type: mime.getType(photoUrl.uri) || "image",
          name: photoUrl.uri.split("/").pop(),
        });
      }

      await api.postForm("/countries/create", data);

      resetForm();
    } catch (error) {
      Alert.alert(
        "Erro na criação do usuário",
        "Ocorreu um erro na criação do usuário, aguarde e tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <View style={{ flex: 1 }}>
        <Header title="Novo Destino" />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 150,
              height: 150,
              borderRadius: 150,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 3,
              borderColor: "blue",
            }}
          >
            <Image
              source={
                photoUrl
                  ? { uri: photoUrl.uri }
                  : require("./assets/destination.png")
              }
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
              }}
            />
          </View>
          <View style={{ marginTop: -30, marginLeft: 70 }}>
            <Pressable
              onPress={handleSelectPhoto}
              style={{ alignItems: "flex-end" }}
            >
              <Image style={{ width: 50, height: 50 }} source={cam} />
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 322,
              height: 48,
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
              placeholder="Nome do destino"
              placeholderTextColor="#797B7A"
              keyboardType="default"
              onChangeText={(value) => setName(value)}
              style={{
                width: "100%",
              }}
            />
          </View>

          <View style={{ marginHorizontal: 35, alignSelf: "baseline" }}>
            {isError && name === "" && (
              <ErrorMessageInput text="O nome do destino deve ser informado." />
            )}
          </View>

          <View
            style={{
              width: 322,
              height: 48,
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
              placeholder="Sigla do destino"
              placeholderTextColor="#797B7A"
              keyboardType="default"
              autoCapitalize="characters"
              maxLength={3}
              onChangeText={(value) => setCode(value.toUpperCase())}
              value={code}
              style={{
                width: "100%",
              }}
            />
          </View>
          <View style={{ marginHorizontal: 35, alignSelf: "baseline" }}>
            {isError && name === "" && (
              <ErrorMessageInput text="A sigla do destino deve ser informado." />
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: 32, marginBottom: 24 }}>
          <Button
            title="Salvar"
            onPress={handleCreateNewDestiny}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
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
    </>
  );
};

export default NewDestiny;
