/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Header } from "../components/Header";
import { subCategories } from "./constants/subcategories";

const Contracts = ({ navigation }) => {
  const listSubCategories = subCategories.filter(
    (subCategory) => subCategory.category === 5
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Contrato de Estudos" />

      <View style={{ flexDirection: "column", flex: 1, marginTop: 16 }}>
        {listSubCategories.map((subCategory) => (
          <TouchableOpacity
            key={subCategory.id}
            style={{ flexDirection: "row", marginBottom: 16 }}
            onPress={() =>
              navigation.navigate("Comments", {
                subCategoryId: subCategory.id,
              })
            }
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
                  source={subCategory.image}
                  style={{
                    height: 60,
                    width: 60,
                    position: "absolute",
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
                  }}
                >
                  {subCategory.name}
                </Text>
                <Text
                  style={{
                    margin: 10,
                    color: "black",
                    fontWeight: "normal",
                    color: "black",
                    fontSize: 13,
                    marginTop: -5,
                  }}
                >
                  {subCategory.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: "#BED5FF",
            width: "100%",
            height: 75,
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
    </View>
  );
};

export default Contracts;
