import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "../service/api";
import { useAuth } from "../hooks/auth";

export const CommentItem = ({ comment }) => {
  const { user } = useAuth();

  const commentRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const [isLiked, setIsLiked] = useState(
    comment.likes.findIndex((like) => like.userId === user.id) >= 0
  );
  const [totalLikes, setTotalLikes] = useState(comment.likes.length);

  const handleLikeComment = async () => {
    try {
      isLiked
        ? await api.delete(`/comments/like/${comment.id}`)
        : await api.post(`/comments/like/${comment.id}/create`);

      setTotalLikes((state) => (isLiked ? state - 1 : state + 1));
      setIsLiked((state) => !state);

      setIsModalVisible(false);
    } catch {
      Alert.alert(
        "Erro ao curtir o comentário",
        "Algo de errado aconteceu ao curtir o comentário, tente novamente mais tarde"
      );
    }
  };

  const handleReportComment = async () => {
    try {
      await api.post(`/comments/report/${comment.id}/create`);

      commentRef.current.setNativeProps({
        style: { display: "none" },
      });

      setIsModalVisible(false);
    } catch {
      Alert.alert(
        "Erro ao denunciar o comentário",
        "Algo de errado aconteceu ao denunciar o comentário, tente novamente mais tarde"
      );
    }
  };

  const handleLongPressButton = (comment, event) => {
    if (commentRef.current) {
      commentRef.current.measure((fx, fy, width, height, px, py) => {
        const position = {
          top: py + height,
          left: px,
        };

        setModalPosition(position);
        setIsModalVisible(true);
      });
    }
  };

  return (
    <View ref={commentRef}>
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
        onLongPress={(event) => handleLongPressButton(comment, event)}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Image
            source={
              comment.user.photoUrl && comment.user.photoUrl !== ""
                ? { uri: comment.user.photoUrl }
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
              {comment.user.name}
            </Text>
            <Text style={{ color: "black" }}>{comment.message}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
            marginLeft: -30,
            gap: 2,
            zIndex: 99,
          }}
        >
          <TouchableOpacity onPress={handleLikeComment}>
            <Image
              source={
                isLiked
                  ? require("../screens/assets/like.png")
                  : require("../screens/assets/whiteHeart.png")
              }
              style={{
                height: 26,
                width: 26,
              }}
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "600" }}>{totalLikes}</Text>
        </View>
        <Modal
          transparent
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            onPress={() => setIsModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: modalPosition.top,
                left: modalPosition.left,
              }}
            >
              <View
                style={{
                  padding: 16,
                  width: 180,
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
                  onPress={handleLikeComment}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    {isLiked ? "Descurtir" : "Curtir"}
                  </Text>
                  <Ionicons name="heart-outline" size={24} />
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
                  onPress={handleReportComment}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    Denunciar
                  </Text>
                  <Ionicons name="alert-circle-outline" size={24} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </Pressable>
    </View>
  );
};
