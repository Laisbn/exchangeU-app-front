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
import { useRoute } from "@react-navigation/native";

import mime from "mime";

const NewCollege = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isError, setIsError] = useState(false);

  const route = useRoute();

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
    setSite("");
    setPhotoUrl(null);
    setIsError(false);
  };

  const handleCreateNewCollege = async () => {
    if (name === "" && site === "") {
      return setIsError(true);
    }

    try {
      setIsLoading(true);

      const data = new FormData();

      data.append("name", name);
      data.append("site", site);
      data.append("countryId", route.params.countryId);

      if (photoUrl) {
        data.append("photoUrl", {
          uri: photoUrl.uri,
          type: mime.getType(photoUrl.uri) || "image",
          name: photoUrl.uri.split("/").pop(),
        });
      }

      await api.postForm("/college/create", data);

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
        <Header title="Nova instituição" />

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
                  : require("./assets/instituicao.png")
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
              placeholder="Nome da instituição"
              placeholderTextColor="#797B7A"
              keyboardType="default"
              onChangeText={(value) => setName(value)}
              value={name}
              style={{
                width: "100%",
              }}
            />
          </View>

          <View style={{ marginHorizontal: 35, alignSelf: "baseline" }}>
            {isError && name === "" && (
              <ErrorMessageInput text="O nome da instituição deve ser informado." />
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
              placeholder="URL da instituição"
              placeholderTextColor="#797B7A"
              keyboardType="url"
              autoCapitalize="none"
              onChangeText={(value) => setSite(value)}
              value={site}
              style={{
                width: "100%",
              }}
            />
          </View>
          <View style={{ marginHorizontal: 35, alignSelf: "baseline" }}>
            {isError && name === "" && (
              <ErrorMessageInput text="A url da instituição deve ser informado." />
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: 32, marginBottom: 24 }}>
          <Button
            title="Salvar"
            onPress={handleCreateNewCollege}
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

export default NewCollege;
