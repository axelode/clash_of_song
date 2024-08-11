import { LinearGradient } from 'expo-linear-gradient';
import { Box, Button, Progress, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import Decor from '../components/decoration';
import { FontAwesome } from '@expo/vector-icons';
import Music from '../components/music';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface IQuiz {
    question: string;
    answers: { content: string; isCorrect: boolean; }[];
    score: number;
}

export default function MatchSession() {
    const router = useRouter()

    const [quiz, setQuiz] = useState<IQuiz[]>([]);
    const [time, setTime] = useState<number>(10);
    const [qIndex, setQIndex] = useState<number>(0);
    const [poin, setPoin] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [elapsedTimerId, setElapsedTimerId] = useState<NodeJS.Timeout | null>(null);

    const getQuiz = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await Axios({
                method: 'Get',
                url: 'https://4ed9-2404-8000-1005-37ac-518-12ed-414c-efd1.ngrok-free.app/quiz/all',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQuiz(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const nextQ = () => {
        if (time === 0 && answer === '') {
            moveToNextQuestion();
        } else if (time > 0 && answer !== '') {
            checkAnswer();
        }
    };

    const moveToNextQuestion = () => {
        if (qIndex < quiz.length - 1) {
            setIsPlaying(false);
            setTime(3);
            setTimeout(() => {
                setQIndex(prevQIndex => prevQIndex + 1);
                setTime(10);
                setIsPlaying(true);
            }, 3000);
        } else {
            endQuiz();
        }
    };

    const checkAnswer = () => {
        if (quiz.length === 0) return;

        const userAnswer = quiz[qIndex].answers.find((data) => data.content === answer);
        if (!userAnswer) return;

        if (userAnswer.isCorrect && time > 0) {
            setPoin(prevPoin => prevPoin + quiz[qIndex].score);
        }

        setAnswer('');
        moveToNextQuestion();
    };

    const endQuiz = async () => {
        setIsPlaying(false);
        setQIndex(0);
        setIsDone(true);

        if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
        }

        if (elapsedTimerId) {
            clearInterval(elapsedTimerId);
            setElapsedTimerId(null);
        }

        // await AsyncStorage.setItem("skor", poin.toString())
        // await AsyncStorage.setItem("time", elapsedTime.toString())

        router.navigate('/result');
    };

    useEffect(() => {
        const id = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
        setTimerId(id);

        nextQ();

        return () => clearInterval(id);
    }, [time]);

    useEffect(() => {
        setIsPlaying(true);
        getQuiz();
    }, []);

    useEffect(() => {
        if (isDone) {
            if (elapsedTimerId) {
                clearInterval(elapsedTimerId);
                setElapsedTimerId(null);
            }
        } else {
            const id = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            setElapsedTimerId(id);

            return () => clearInterval(id);
        }
    }, [isDone]);

    console.log("isDone", isDone);
    console.log("elapsed time: ", elapsedTime);

    return (
        <LinearGradient colors={['#5907E6', '#A327FE']} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box safeAreaY style={{ width: '100%', height: '100%' }}>
                    <Box style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', margin: 20, borderRadius: 20, padding: 20 }}>
                        <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Box style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                <FontAwesome name='trophy' size={32} color={'gold'} />
                                <Text style={{ fontSize: 22, fontWeight: '800', color: 'white' }}>{poin}</Text>
                            </Box>
                        </Box>
                        <Box style={{ marginTop: 50 }}>
                            <Text style={{ fontSize: 30, fontWeight: '500', color: 'white', textAlign: 'center', padding: 8 }}>{time}</Text>
                        </Box>
                        <Box style={{ marginTop: 32, marginBottom: 32 }}>
                            <Music music={quiz[qIndex]?.question || ''} isPlaying={isPlaying} />
                        </Box>
                        <VStack space={4} alignItems="center">
                            {quiz[qIndex]?.answers.map((option, index) => (
                                <Button
                                    key={index}
                                    style={{
                                        backgroundColor: answer === option.content && option.isCorrect ? 'lime' : answer === option.content && !option.isCorrect ? 'red' : 'white',
                                        width: '80%',
                                        justifyContent: 'center',
                                        borderRadius: 10
                                    }}
                                    onPress={() => setAnswer(option.content)}
                                >
                                    <Text color={'#2075B8'}>{option.content}</Text>
                                </Button>
                            ))}
                        </VStack>
                        <Box marginTop={'auto'}>
                            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', marginBottom: 12 }}>
                                Question {qIndex + 1} / {quiz.length}
                            </Text>
                            <Progress value={(qIndex + 1) / quiz.length * 100} size={'lg'} />
                        </Box>
                        <Box style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Elapsed Time: {elapsedTime}s</Text>
                        </Box>
                    </Box>
                    <Decor />
                </Box>
            </ScrollView>
        </LinearGradient>
    );
}
