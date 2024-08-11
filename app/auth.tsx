import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Box, Button, Image, ScrollView } from "native-base";
import React from "react";
import Decor from "../components/decoration";
import * as Linking from "expo-linking";
import ASYNC_STORAGE from "./asyncStorage";

type Response = {
    type: string;
    url: string;
};

const Auth = () => {
    const router = useRouter();

    const onGoogleLogin = async () => {
        const redirectUrl = Linking.createURL("/");
        const response = (await WebBrowser.openAuthSessionAsync(
            `https://1030-2404-8000-1005-37ac-24af-35ba-f9f6-a044.ngrok-free.app/google/redirect?redirectTo=${redirectUrl}`,
            redirectUrl
        )) as Response;

        const token = response.url.split("=")[1].split("&")[0];

        ASYNC_STORAGE.SET(token);
        router.navigate("/home");
    };

    return (
        <LinearGradient
            colors={["#5907E6", "#A327FE"]}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box
                    safeAreaY
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 24,
                        paddingTop: 200,
                        paddingBottom: 100,
                    }}
                >
                    <Image
                        source={{
                            uri: "https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722324583/yiywjwrbbmj3lbhzlg9m.png",
                        }}
                        alt="logo"
                        size={"xl"}
                        style={{
                            width: "100%",
                            height: 150,
                        }}
                    />
                    <Button
                        leftIcon={
                            <FontAwesome
                                name="google"
                                size={24}
                                color={"white"}
                            />
                        }
                        width={"100%"}
                        backgroundColor="amber.400"
                        _text={{ color: "white", fontWeight: "bold" }}
                        _hover={{ bg: "amber.500" }}
                        _pressed={{ bg: "amber.500" }}
                        paddingX={6}
                        marginTop={"auto"}
                        borderRadius={100}
                        onPress={onGoogleLogin}
                    >
                        Continue With Google
                    </Button>

                    {/* <Link href={'/result'}>
                        result
                    </Link>

                    <Link href={'/selectAvatar'}>
                        Avatar
                    </Link> */}
                    {/* <Link href={'/matchMaking'}>Find Mach</Link>
                    <Link href={'/result'}>Result</Link>
                    <Link href={'/matchSession'}>Questions</Link> */}

                    <Decor />
                </Box>
            </ScrollView>
        </LinearGradient>
    );
};

export default Auth;
