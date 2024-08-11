import { LinearGradient } from "expo-linear-gradient";
import { Box, Button, Image, ScrollView, Text } from "native-base";
import React from "react";
import Decor from "../components/decoration";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
    {
        id: 1,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263436/quizAva/mp8peohjmgv2nkuw8xvv.png',
        userName: 'Hamdan',
        skore: 7151,
    },
    {
        id: 2,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263436/quizAva/fg9il9kp2al1cw0pilte.png',
        userName: 'Dewi',
        skore: 6015,
    },
    {
        id: 3,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263436/quizAva/zpsbch3ebdwy6atehn12.png',
        userName: 'Rizki',
        skore: 5603,
    },
    {
        id: 4,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263436/quizAva/vy0wvkalc5zimqvp87ra.png',
        userName: 'Hafiz',
        skore: 5505,
    },
    {
        id: 5,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263435/quizAva/fq3ufdthhdwtnvsz1csq.png',
        userName: 'Rizki',
        skore: 5000,
    },
];

const Result = () => {
    const router = useRouter();

    // const skor = await AsyncStorage.getItem("skor")
    // const time = await AsyncStorage.getItem("time")

    return (
        <LinearGradient
            colors={['#5907E6', '#A327FE']}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box safeAreaY
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text fontSize={18} textAlign={'center'} fontWeight={800} color={'white'}>
                        Yeay, you finished this game
                    </Text>

                    {/* <Text fontSize={18} textAlign={'center'} fontWeight={800} color={'white'}>
                        Yeay, you got {skor} poin in {time} seconds
                    </Text> */}

                    {/* <Text fontSize={24} fontWeight={800} color={'white'}>you got <Text color={'gold'}>1 Diamond</Text> </Text> */}

                    <Box style={{
                        position: 'relative',
                        padding: 24,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 100
                    }}>


                        <Image
                            source={{
                                uri: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1723161251/uycd1zic5m0m4zuomo3w.png'
                            }}
                            size={'2xl'}
                            resizeMode="contain"
                        />

                        {/* <Box style={{ backgroundColor: 'white', borderRadius: 6, padding: 10, gap: 10 }}>
                            <Box style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                backgroundColor: "gold",
                                borderRadius: 6
                            }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                                    <Image source={{ uri: data[3].avatar }} alt="Avatar" size={"xs"} />
                                    <Text style={{ color: 'black' }}>{data[3].userName}</Text>
                                </Box>
                                <Text style={{ color: 'black' }}>{data[3].skore}</Text>

                            </Box >
                            <Box style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                backgroundColor: "silver",
                                borderRadius: 6
                            }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                                    <Image source={{ uri: data[3].avatar }} alt="Avatar" size={"xs"} />
                                    <Text style={{ color: 'black' }}>{data[3].userName}</Text>
                                </Box>
                                <Text style={{ color: 'black' }}>{data[3].skore}</Text>
                            </Box>
                            <Box style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                backgroundColor: "#74512D",
                                borderRadius: 6
                            }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                                    <Image source={{ uri: data[3].avatar }} alt="Avatar" size={"xs"} />
                                    <Text style={{ color: 'black' }}>{data[3].userName}</Text>
                                </Box>
                                <Text style={{ color: 'black' }}>{data[3].skore}</Text>

                            </Box >
                            <Box style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                backgroundColor: "tomato",
                                borderRadius: 6
                            }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                                    <Image source={{ uri: data[3].avatar }} alt="Avatar" size={"xs"} />
                                    <Text style={{ color: 'black' }}>{data[3].userName}</Text>
                                </Box>
                                <Text style={{ color: 'black' }}>{data[3].skore}</Text>

                            </Box >
                            <Box style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                backgroundColor: "tomato",
                                borderRadius: 6
                            }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                                    <Image source={{ uri: data[4].avatar }} alt="Avatar" size={"xs"} />
                                    <Text style={{ color: 'black' }}>{data[4].userName}</Text>
                                </Box>
                                <Text style={{ color: 'black' }}>{data[4].skore}</Text>



                            </Box>

                        </Box> */}
                    </Box>

                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 30,
                        width: '100%'
                    }}>
                        <Button style={{ backgroundColor: 'red' }} onPress={() => router.navigate('/home')}>Return to Home</Button>
                        {/* <Button style={{ backgroundColor: 'green' }}>Play Again</Button> */}
                    </Box>

                    <Decor />
                </Box>
            </ScrollView>
        </LinearGradient>
    );
};

export default Result;
