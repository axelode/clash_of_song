import { LinearGradient } from 'expo-linear-gradient'
import { Box, Button, ScrollView, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import Decor from '@/components/decoration';
import { FontAwesome } from '@expo/vector-icons';


export default function Questions() {
    const [time, setTime] = useState<number>(30);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [answers, setAnswers] = useState([
        { text: 'Boom Ba Yah', isCorrect: false, clicked: false },
        { text: 'Bang Bang Bang', isCorrect: true, clicked: false },
        { text: 'Everything', isCorrect: false, clicked: false },
        { text: 'Aloha', isCorrect: false, clicked: false },
    ]);

    useEffect(() => {
        if (time === 0) {
            console.log("Time's up");
            return;
        }

        const timerId = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [time]);

    const handleAnswerClick = (index: number) => {
        setSelectedAnswerIndex(index);
        setAnswers(prevAnswers => {
            return prevAnswers.map((answer, i) => ({
                ...answer,
                clicked: true,
            }));
        });

        if (answers[index].isCorrect) {
            setScore(prevScore => prevScore + 1);
            console.log('Jawaban benar');
        } else {
            console.log('Jawaban salah');
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <LinearGradient colors={['#5907E6', '#A327FE']}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box
                    safeAreaY
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        margin: 20,
                        borderRadius: 20,
                        padding: 20,
                    }}>
                        <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Box style={{
                                flexDirection: 'row',
                                gap: 4,
                                alignItems: 'center'
                            }}>
                                <FontAwesome
                                    name='trophy'
                                    size={32}
                                    color={'gold'}
                                />
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: 800,
                                }}
                                    color={'white'}
                                >
                                    {score}
                                </Text>
                            </Box>
                        </Box>

                        <Box style={{ marginTop: 50 }} >
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 500,
                                color: 'white',
                                textAlign: 'center',
                                padding: 8
                            }}>{formatTime(time)}</Text>
                        </Box>

                        <Box>
                            <VStack space={4} alignItems="center">
                                {answers.map((answer, index) => (
                                    <Button
                                        key={index}
                                        onPress={() => handleAnswerClick(index)}
                                        style={{
                                            backgroundColor: answer.clicked
                                                ? (answer.isCorrect ? 'green' : 'red')
                                                : 'white',
                                            width: '80%',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                            borderWidth: selectedAnswerIndex === index ? 2 : 0,
                                            borderColor: selectedAnswerIndex === index ? 'black' : 'transparent',
                                        }}
                                    >
                                        <Text style={{ color: answer.clicked ? 'white' : 'black' }}>
                                            {answer.text}
                                        </Text>
                                    </Button>
                                ))}
                            </VStack>
                        </Box>
                    </Box>

                    <Decor />
                </Box>
            </ScrollView>
        </LinearGradient>
    );
}
