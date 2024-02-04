/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

import { api } from "../service/api";

import { Loading } from "../components/Loading";
import Button from "./assets/components/Button";
import { ErrorMessageInput } from "../components/ErrorMessageInput";

const NewPass = ({ navigation }) => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangePassword = async () => {
    if (
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return setIsError(true);
    }

    try {
      const email = route.params?.email;
      const code = route.params?.code;

      setIsLoading(true);

      if (code && password === confirmPassword) {
        await api.post("/auth/reset-password", {
          email,
          code,
          newPassword: password,
        });

        setIsLoading(false);

        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert(
        "Erro na mudança de senha",
        "Algo de errado aconteceu na mudança de senha, tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View
      style={{
        backgroundColor: "#BED5FF",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </View>
  ) : (
    <View style={{ backgroundColor: "#BED5FF", flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontSize: 25,
          top: 40,
          fontWeight: 800,
          color: "#2264C7",
        }}
      >
        Redefinição de Senha
      </Text>
      <View
        style={{
          width: "90%",
          height: 48,
          top: 100,
          borderColor: "#CACCCC",
          backgroundColor: "#F1F5F4",
          borderWidth: 1,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 22,
          zIndex: 1000,
        }}
      >
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#797B7A"
          keyboardType="default"
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
          style={{
            width: "100%",
          }}
        />
      </View>
      <View style={{ top: 100, left: -78 }}>
        {isError && password === "" && (
          <ErrorMessageInput text="A senha deve ser informada." />
        )}
      </View>

      <View
        style={{
          width: "90%",
          height: 48,
          marginTop: 15,
          top: 100,
          borderColor: "#CACCCC",
          backgroundColor: "#F1F5F4",
          borderWidth: 1,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 22,
          zIndex: 1000,
        }}
      >
        <TextInput
          placeholder="Confirma Senha"
          placeholderTextColor="#797B7A"
          keyboardType="default"
          secureTextEntry
          onChangeText={(value) => setConfirmPassword(value)}
          style={{
            width: "100%",
          }}
        />
      </View>

      {confirmPassword !== "" && password !== confirmPassword && (
        <View style={{ top: 100, left: -50 }}>
          <ErrorMessageInput text="As duas senhas precisam ser iguais." />
        </View>
      )}

      {isError && confirmPassword === "" && (
        <View style={{ top: 100, left: -22 }}>
          <ErrorMessageInput text="A confirmação de senha deve ser informada." />
        </View>
      )}
      <View>
        <Button
          title="Salvar"
          onPress={handleChangePassword}
          style={{
            marginTop: 120,
            width: 350,
            marginBottom: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Button
          title="Sair"
          onPress={() => navigation.navigate("Welcome")}
          style={{
            marginTop: 280,
            width: 350,
            marginBottom: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Welcome")}>
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
  );
};

export default NewPass;
