import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Box, Button, Image, ScrollView, Text } from "native-base";
import io, { Socket } from "socket.io-client";
import Decor from "../components/decoration";
import ModalAvatar from "@/components/ModalAvatar";
import ModalDiamond from "@/components/ModalDiamond";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRouter } from "expo-router";
import axios from "axios";
import useStore from "./z-context";

const Home: React.FC = () => {
  const router = useRouter();
  const setUserInRoom = useStore((state) => state.SET_USERINROOM);

  const queue: any[] = [];

  const [openAva, setOpenAva] = useState<boolean>(false);
  const [openDiamond, setOpenDiamond] = useState<boolean>(false);
  const [diamondCount, setDiamondCount] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.SET_USER);

  const handleDiamondPurchase = (amount: number) => {
    setDiamondCount((prevCount) => prevCount + amount);
  };

  const handleStartGame = async () => {
    const newSocket = io(
      "https://4ed9-2404-8000-1005-37ac-518-12ed-414c-efd1.ngrok-free.app"
    );

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log('triged');
      const googleId = user.googleId;
      newSocket.emit("startGame", { userId: googleId });

      console.log("Connected to server");
      router.navigate("/matchMaking");
    });

    // Pindahkan listener 'matchFound' di sini
    newSocket.on("matchFound", async (data: any) => {
      console.log('match found');

      setUserInRoom(data.players)
      router.navigate('/matchSession')
    });

    return () => {
      newSocket.close();
    };
  };

  const fetchLogged = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.get('https://1030-2404-8000-1005-37ac-24af-35ba-f9f6-a044.ngrok-free.app/users/logged', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUser(response.data);
  };

  useEffect(() => {
    fetchLogged();
  }, []);

  return (
    <LinearGradient
      colors={["#5907E6", "#A327FE"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box
          safeAreaY
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* header */}
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722324583/yiywjwrbbmj3lbhzlg9m.png",
              }}
              alt="logo"
              size={"xl"}
            />

            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <FontAwesome
                name="diamond"
                size={32}
                color={"gold"}
              />
              <Text style={{ fontSize: 22, fontWeight: 800, color: "white" }}>
                {user.diamondQty}
              </Text>
              <Box
                style={{
                  padding: 4,
                  backgroundColor: "#00FF47",
                  borderRadius: 5,
                }}
                onTouchEnd={() => setOpenDiamond(true)}
              >
                <FontAwesome
                  name="plus"
                  size={24}
                  color={"white"}
                />
              </Box>
            </Box>
          </Box>

          {/* profile avatar */}
          <Box
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              source={{
                uri: user.avatar
              }}
              size={"2xl"}
            />

            <Button
              style={{
                position: "absolute",
                top: 80,
                right: 150,
                borderRadius: 100,
              }}
              onPress={() => setOpenAva(true)}
            >
              <FontAwesome
                name="pencil"
                size={24}
                color={"white"}
              />
            </Button>

            <Text
              fontSize={24}
              fontWeight={800}
              color={"white"}
            >
              {user.username}
            </Text>
          </Box>

          {/* button */}
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 24,
              paddingRight: 24,
              marginTop: 50,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722445746/COS_maskot.png",
              }}
              alt="image"
              resizeMode="contain"
              style={{ width: "100%", aspectRatio: 1 }}
            />

            <Button
              width={"100%"}
              backgroundColor="green.400"
              _text={{ color: "white", fontWeight: "bold" }}
              _hover={{ bg: "green.500" }}
              _pressed={{ bg: "green.500" }}
              paddingX={6}
              borderRadius={100}
              onPress={handleStartGame}
            // onPress={() => router.navigate('/result')}
            >
              Start Game
            </Button>
          </Box>

          <Decor />
        </Box>

        <ModalAvatar
          open={openAva}
          onClose={() => setOpenAva(false)}
        />
        <ModalDiamond
          open={openDiamond}
          onClose={() => setOpenDiamond(false)}
          onPurchase={handleDiamondPurchase}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
