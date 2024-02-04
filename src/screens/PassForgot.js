/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable, Alert } from "react-native";

import Button from "./assets/components/Button";

import { api } from "../service/api";
import { Loading } from "../components/Loading";

const PassForgot = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);

      if (email) {
        await api.post("/auth/forgot-password", {
          email,
        });

        setIsLoading(false);

        navigation.navigate("ValidRecoveryCode", {
          email,
        });
      }
    } catch (error) {
      Alert.alert(
        "Erro na busca dos dados",
        "Algo de errado aconteceu na busca das informações, tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#BED5FF",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Text
            style={{
              fontSize: 25,
              top: 10,
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
              top: 50,
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
              placeholder="Email"
              placeholderTextColor="#797B7A"
              keyboardType="ascii-capable"
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View>
            <Button
              title="Enviar"
              onPress={handleForgotPassword}
              style={{
                marginTop: 70,
                width: 350,
                marginBottom: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Button
              title="Voltar"
              onPress={() => navigation.navigate("Login")}
              style={{
                marginTop: 340,
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
        </>
      )}
    </View>
  );
};

export default PassForgot;
