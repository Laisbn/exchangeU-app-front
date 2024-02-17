/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import Button from "./assets/components/Button";

import { api } from "../service/api";
import { Loading } from "../components/Loading";

const ValidRecoveryCode = ({ navigation }) => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleValidateCode = async () => {
    try {
      const email = route.params?.email;

      setIsLoading(true);

      if (code) {
        await api.post("/auth/valid-recovery-code", {
          email,
          code,
        });

        setIsLoading(false);

        navigation.navigate("NewPass", {
          email,
          code,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        return Alert.alert(
          "Erro na validação do código",
          "O código informado é inválido, informe um novo código e tente novamente"
        );
      }

      Alert.alert(
        "Erro na validação do código",
        "Algo de errado aconteceu na validação do código, tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
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
              top: 50,
              fontWeight: 800,
              color: "#2264C7",
            }}
          >
            Código de Recuperação
          </Text>
          <View
            style={{
              width: "90%",
              height: 48,
              top: 70,
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
              placeholder="Código de verificação"
              placeholderTextColor="#797B7A"
              keyboardType="number-pad"
              onChangeText={(value) => setCode(value)}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Button
              title="Validar"
              onPress={handleValidateCode}
              style={{
                marginTop: 90,
                width: 320,
                marginBottom: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Button
              title="Voltar"
              onPress={() => navigation.navigate("PassForgot")}
              style={{
                marginTop: 340,
                width: 320,
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
          <View style={{height:70}}></View>
        </>
      )}
    </View>
    </ScrollView>
  );
};

export default ValidRecoveryCode;
