import React, { useState, useEffect, useRef, FC } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';

interface MusicProps {
    music: string;
    isPlaying: boolean;
}

const Music: FC<MusicProps> = ({ music, isPlaying }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const rotateValue = useRef(new Animated.Value(0)).current;

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: music }
        );
        setSound(sound);
        await sound.playAsync();
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
        }
    };

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useEffect(() => {
        let animation: Animated.CompositeAnimation;

        const startRotation = () => {
            rotateValue.setValue(0);  // Reset rotation value
            animation = Animated.loop(
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );
            animation.start();
        };

        const stopRotation = () => {
            if (animation) {
                animation.stop();
                rotateValue.setValue(0); // Ensure it resets to initial position
            }
        };

        if (isPlaying) {
            startRotation();
            playSound();
        } else {
            stopRotation();
            pauseSound();
        }

        return () => {
            if (animation) {
                animation.stop();
            }
        };
    }, [rotateValue, isPlaying]);

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
                source={{
                    uri: 'https://res.cloudinary.com/dbzdxsmvy/image/upload/v1722933462/u4yw3ixqkttwallmlh0v.png'
                }}
                style={{ width: 200, height: 200, transform: [{ rotate }] }}
            />
        </View>
    );
};

export default Music;
