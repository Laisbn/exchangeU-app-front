/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Header } from "../components/Header";
import { subCategories } from "./constants/subcategories";

const Visa = ({ navigation }) => {
  const listSubCategories = subCategories.filter(
    (subCategory) => subCategory.category === 1
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Visto de Estudante" />

      <ScrollView style={{ flexDirection: "column", flex: 1, marginTop: 16 }}>
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
                marginLeft: 15,
                width: '90%',
                height: 110,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 81,
                  height: 90,
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
                    height: 50,
                    width: 50,
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
                    marginLeft: 10,
                    color: "black",
                    fontWeight: "normal",
                    color: "black",
                    fontSize: 13,
                    marginTop: -5,
                    width: "70%",
                  }}
                >
                  {subCategory.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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

export default Visa;
