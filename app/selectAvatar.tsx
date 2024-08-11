import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Box, Button, Flex, Image, Input, Text } from "native-base";
import { ScrollView } from "react-native";
import { useState } from "react";
import React from "react";
import Decor from "../components/decoration";
import avaBasic from "./data/avaBasic.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAvatar } from "./interface/interface";

export default function SelectAvatar() {
  const [selected, setSelected] = useState<IAvatar>();

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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Image
            source={{
              uri: "https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722323016/cajb3dnvpiljzqejyrdf.png",
            }}
            alt="logo"
            resizeMode="contain"
            alignSelf={"center"}
            style={{ width: "50%", aspectRatio: 1 }}
          />

          <Box>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              CHOOSE YOUR AVATAR
            </Text>

            <Flex
              width="100%"
              direction="row"
              wrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {avaBasic.map((item) => (
                <Box
                  key={item.id}
                  style={{
                    width: "30%",
                    position: "relative",
                    alignItems: "center",
                    padding: 4,
                  }}
                  onTouchEnd={() => setSelected(item)}
                >
                  <Avatar
                    source={{
                      uri: item.ava,
                    }}
                    size="xl"
                    borderWidth={item.id === selected?.id ? 4 : 0}
                    borderColor={"amber.500"}
                  />
                </Box>
              ))}
            </Flex>
          </Box>

          <Box
            style={{
              width: "100%",
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              USERNAME
            </Text>

            <Input
              placeholder="Enter your username"
              w={"100%"}
              bg={"white"}
              style={{}}
              InputLeftElement={
                <FontAwesome
                  name="user"
                  size={20}
                  color="gray"
                  style={{ marginLeft: 10 }}
                />
              }
              _focus={{ backgroundColor: "white" }}
            />

            <Button
              width={"100%"}
              backgroundColor="green.500"
              _text={{ color: "white", fontWeight: "bold" }}
              _hover={{ bg: "green.600" }}
              _pressed={{ bg: "green.600" }}
              paddingX={6}
              marginTop={"auto"}
              onPress={async () => {
                // await AsyncStorage.setItem("user", "2");
                console.log(await AsyncStorage.getItem("user"));
              }}
            >
              JOIN
            </Button>
          </Box>

          {/* decor */}
          <Decor />
        </Box>
      </ScrollView>
    </LinearGradient>
  );
}
