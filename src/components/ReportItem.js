import { useRef, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "../service/api";

export const ReportItem = ({ comment }) => {
  const commentRef = useRef(null);

  const removeReport = async () => {
    await api.delete(`/comments/reports/${comment.id}`);

    commentRef.current.setNativeProps({
      style: { display: "none" },
    });
  };

  const deleteComment = async () => {
    await api.delete(`/comments/${comment.comment_id}`);

    commentRef.current.setNativeProps({
      style: { display: "none" },
    });
  };

  return (
    <View ref={commentRef} style={{ display: "flex" }}>
      <View
        style={{
          backgroundColor: "#ccc",
          height: 1,
          flex: 1,
        }}
      />

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 8,
          paddingVertical: 8,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Image
            source={
              comment.user_photo_url && comment.user_photo_url !== ""
                ? { uri: comment.user_photo_url }
                : require("../screens/assets/imgPlaceHolder.png")
            }
            style={{
              height: 64,
              width: 64,
              borderRadius: 64,
              borderWidth: 3,
              marginRight: 8,
              borderColor: "blue",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: "69%",
              paddingRight: 3,
              gap: 8,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {comment.username}
            </Text>
            <Text style={{ color: "black" }}>{comment.message}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
            marginLeft: -30,
            gap: 8,
            zIndex: 99,
          }}
        >
          <TouchableOpacity onPress={removeReport}>
            <Ionicons name="checkmark-done" size={32} color="green" />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteComment}>
            <Ionicons name="trash-outline" size={32} color="#EE5656" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};
