import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Box, Button, Image, ScrollView, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import Decor from '../components/decoration';
import { useRouter } from 'expo-router';
import Axios from 'axios';
import useStore from './z-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IMatch {
    avatar: string;
    userName: string;
}

const data = [
    {
        id: 1,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263436/quizAva/fg9il9kp2al1cw0pilte.png',
        userName: 'Hamdan'
    },
    {
        id: 2,
        avatar: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722263435/quizAva/bewnlhsga31mqaoakwfy.png',
        userName: 'Dewi'
    }
];

const MatchMaking = () => {
    const userInRoom = useStore((state) => state.userInRoom);
    // const googleId: string[] = [];

    const [opponent, setOpponent] = useState<any>();

    console.log("pepe", userInRoom);

    const router = useRouter();
    const [time, setTime] = useState<number>(0);
    const [maxOpponent, setMaxOpponent] = useState<number>(2);

    const fetchUserInRoom = async () => {
        const queue = await AsyncStorage.getItem("queue")
        console.log(queue);


        const res = await Axios({
            method: 'Get',
            url: 'https://4ed9-2404-8000-1005-37ac-518-12ed-414c-efd1.ngrok-free.app/users/in/room',
            params: {
                googleId: userInRoom[0].id
            }
        });

        console.log("data match", res.data);

        setOpponent(res.data);
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [time]);

    // useEffect(() => {
    //     fetchUserInRoom();
    // }, []);

    return (
        <LinearGradient
            colors={['#5907E6', '#A327FE']}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box safeAreaY
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >

                    <Button onPress={fetchUserInRoom}>test</Button>
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 24

                        }}
                    >
                        <Image
                            source={{
                                uri: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722324583/yiywjwrbbmj3lbhzlg9m.png'
                            }}
                            alt='logo'
                            size={'xl'}
                        />

                        <FontAwesome name='close' size={32} color={'gold'} onPress={() => router.navigate('/home')} />

                    </Box>

                    <Box style={{ padding: 4, height: 40 }}>

                        <Text style={{
                            fontSize: 30,
                            fontWeight: 500,
                            color: 'white',
                            textAlign: 'center',
                            padding: 8

                        }}>{time}</Text>

                    </Box>

                    <Box style={{ padding: 4, height: 50 }}>

                        <Text style={{
                            fontSize: 30,
                            fontWeight: 500, color: 'white',
                            textAlign: 'center',
                            padding: 10

                        }}>Finding Opponent</Text>
                    </Box>

                    {/* <Box style={{ padding: 4, height: 35 }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 500, color: 'white',
                            textAlign: 'center',
                            padding: 5
                        }}>
                            {opponent === undefined ? 0 : opponent.length} / {maxOpponent}
                        </Text>
                    </Box> */}

                    <Box style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        alignItems: 'center',
                        padding: 24

                    }}
                    >

                        <Text style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>Loading.....</Text>

                        {/* {opponent === undefined ? (
                            <Text>pepe</Text>
                        ) : (
                            opponent.map((item: any) => (
                                <Box
                                    key={item.id}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        justifyContent: 'flex-start',
                                        gap: 24,
                                        borderRadius: 6,
                                        padding: 8,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        borderColor: 'white',

                                    }}
                                >
                                    <Avatar
                                        source={{
                                            uri: item.avatar
                                        }}

                                        size={'md'}
                                    />

                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: 800,
                                        color: '#fff'
                                    }}>
                                        {item.username}
                                    </Text>
                                </Box>
                            ))
                        )} */}
                    </Box>
                    <Decor />
                </Box>
            </ScrollView>
        </LinearGradient>
    );
};

export default MatchMaking;
