import { Image, Modal, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useAuth } from "../hooks/auth";

export const Header = ({ title = "", rightOptions = false, params }) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: "#BED5FF",
        width: "100%",
        height: 100,
        borderColor: "#BED5FF",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../screens/assets/arrow.png")}
            style={{
              height: 31,
              width: 24,
              alignSelf: "flex-start",
            }}
          />
        </Pressable>

        <Text
          style={{
            fontSize: 22,
            color: "#2264C7",
            fontWeight: "bold",
            marginLeft: rightOptions ? 0 : -30,
          }}
        >
          {title}
        </Text>
        <View>
          {user?.admin && rightOptions && (
            <>
              <Pressable onPress={() => setIsModalVisible(true)}>
                <Ionicons name="ellipsis-vertical" size={32} color="black" />
              </Pressable>
              <Modal
                transparent
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
              >
                <Pressable
                  style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  onPress={() => setIsModalVisible(false)}
                >
                  <View
                    style={{
                      flex: 1,
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      top: 88,
                      right: 25,
                    }}
                  >
                    <View
                      style={{
                        padding: 16,
                        width: 280,
                        backgroundColor: "white",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                          color: "#aaa",
                          marginBottom: 16,
                        }}
                      >
                        Opções
                      </Text>

                      <Pressable
                        onPress={() => {
                          navigation.navigate("ReportComments", {
                            ...params,
                          });

                          setIsModalVisible(false);
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                          Comentários Denunciados
                        </Text>
                        <Ionicons name="alert-circle-outline" size={24} />
                      </Pressable>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "#ccc",
                          height: 1,
                          marginVertical: 8,
                        }}
                      />
                      <Pressable
                        onPress={() => setIsModalVisible(false)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                          Fechar
                        </Text>
                        <Ionicons name="close-outline" size={26} />
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </Modal>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
