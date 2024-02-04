/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import cam from "./assets/cam.png";
import Button from "./assets/components/Button";
import { api } from "../service/api";
import { Loading } from "../components/Loading";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { ErrorMessageInput } from "../components/ErrorMessageInput";
import { useAuth } from "../hooks/auth";

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [college, setCollege] = useState("");
  const [isError, setIsError] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const [profile, setProfile] = useState(null);

  const { signIn } = useAuth();

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
      setPhotoUrl(pickerResult.assets[0]);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setCollege("");
    setIsError(false);
  };

  const handleCreateAccount = async () => {
    if (
      password === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      password !== passwordConfirm ||
      college === ""
    ) {
      return setIsError(true);
    }

    try {
      setIsLoading(true);

      const dataForm = new FormData();

      dataForm.append("name", name);
      dataForm.append("email", email);
      dataForm.append("password", password);
      dataForm.append("college", college);

      if (photoUrl) {
        dataForm.append("photoUrl", {
          uri: photoUrl.uri,
          type: mime.getType(photoUrl.uri) || "image",
          name: photoUrl.uri.split("/").pop(),
        });
      }

      await api.postForm("/auth/create", dataForm);

      await signIn({
        email,
        password,
      });

      resetForm();

      navigation.navigate("Home");
    } catch (error) {
      if (error.response.status === 400) {
        const handlingError = JSON.parse(error.response.data);

        if (handlingError.error === "User already exists") {
          return Alert.alert(
            "Erro na criação do usuário",
            "Já existe um usuário cadastrado com esse email"
          );
        }
      }

      Alert.alert(
        "Erro na criação do usuário",
        "Ocorreu um erro na criação do usuário, aguarde e tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading title="Aguarde, criando conta..." />}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#BED5FF",
          width: "100%",
          height: 75,
          borderColor: "#BED5FF",
          borderWidth: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          position: "relative",
        }}
      >
        <View style={{ marginTop: 35 }}>
          <Image
            source={require("./assets/logoSemFundo.png")}
            style={{
              height: 60,
              width: 60,
              top: 5,
              left: 50,
            }}
          />
          <Text
            style={{
              marginLeft: 140,
              top: -40,
              paddingVertical: 1,
              fontSize: 25,
              fontWeight: 800,
              color: "#2264C7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Nova Conta
          </Text>
        </View>
        <View style={{ paddingBottom: isError ? 62 : 0 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={
                photoUrl
                  ? { uri: photoUrl.uri }
                  : require("./assets/imgPlaceHolder.png")
              }
              style={{
                width: 120,
                height: 120,
                borderRadius: 120,
                borderWidth: 3,
                borderColor: "blue",
              }}
            />
            <View style={{ marginTop: -30, marginLeft: 70 }}>
              <TouchableOpacity
                onPress={handleUpdateAvatar}
                style={{ alignItems: "flex-end" }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={profile ? { uri: profile } : cam}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ margin: 20 }}>
            <View
              style={{
                width: "100%",
                height: 48,
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
                placeholder="Nome de Usuário"
                placeholderTextColor="#797B7A"
                keyboardType="ascii-capable"
                onChangeText={(value) => setName(value)}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {isError && name === "" && (
              <ErrorMessageInput text="O nome deve ser informado." />
            )}
            <View
              style={{
                width: "100%",
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
                placeholder="Email"
                placeholderTextColor="#797B7A"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => setEmail(value)}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {isError && email === "" && (
              <ErrorMessageInput text="O e-mail deve ser informado." />
            )}
            <View
              style={{
                width: "100%",
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
                placeholder="Senha"
                placeholderTextColor="#797B7A"
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={(value) => setPassword(value)}
                style={{
                  width: "100%",
                }}
              />
            </View>

            {isError && password === "" && (
              <ErrorMessageInput text="A senha deve ser informada." />
            )}

            <View
              style={{
                width: "100%",
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
                placeholder="Confirmar Senha"
                placeholderTextColor="#797B7A"
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={(value) => setPasswordConfirm(value)}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {passwordConfirm !== "" && password !== passwordConfirm && (
              <ErrorMessageInput text="As duas senhas precisam ser iguais." />
            )}

            {isError && passwordConfirm === "" && (
              <ErrorMessageInput text="A confirmação de senha deve ser informada." />
            )}

            <View
              style={{
                width: "100%",
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
                placeholder="Instituição de Ensino"
                placeholderTextColor="#797B7A"
                keyboardType="default"
                onChangeText={(value) => setCollege(value)}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {isError && college === "" && (
              <ErrorMessageInput text="A instituição deve ser informada." />
            )}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                top: 50,
              }}
            >
              <Button
                title="Criar Conta"
                onPress={handleCreateAccount}
                style={{
                  width: "100%",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Button
                title="Sair"
                onPress={() => navigation.navigate("Welcome")}
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Signup;
