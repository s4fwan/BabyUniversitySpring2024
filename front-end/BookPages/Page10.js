import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import BackButton from './BackButton';
const Page10 = () => {
    const [electronScale] = useState(() => {
        const scale = new Animated.Value(1);
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
        return scale;
    });

    const [glowOpacity] = useState(() => {
        const opacity = new Animated.Value(0.8);
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.8,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
        return opacity;
    });

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.circleContainer}>
                <View style={[styles.circle]}>
                    <Animated.View style={[styles.innerCircle, { transform: [{ scale: electronScale }] }]} />
                    <Animated.View style={[styles.glowing, styles.glowing1, { opacity: glowOpacity }]} />
                    <Animated.View style={[styles.glowing, styles.glowing2, { opacity: glowOpacity }]} />
                    <Animated.View style={[styles.glowing, styles.glowing3, { opacity: glowOpacity }]} />
                </View>

                <View style={[styles.circle2]}>
                    <View style={styles.innerCircle2} />
                    <View style={[styles.secondGlowing, styles.glowing1]} />
                    <View style={[styles.secondGlowing, styles.glowing2]} />
                    <View style={[styles.secondGlowing, styles.glowing3]} />
                </View>

                <View style={[styles.circle3]}>
                    <View style={styles.innerCircle3} />
                    <View style={[styles.thirdGlowing, styles.glowing1]} />
                    <View style={[styles.thirdGlowing, styles.glowing2]} />
                    <View style={[styles.thirdGlowing, styles.glowing3]} />
                </View>

                <View style={styles.protonAndNeutron}>
                    <View style={styles.proton} />
                    <View style={styles.neutron} />
                </View>
            </View>

            <View style={styles.bodyText}>
                <Text style={{ color: 'black', fontSize: 70, textAlign: 'center', fontWeight: 700}}>
                    This <Text style={{ color: 'green' }}>electron</Text> has the most <Text style={{ color: 'yellow',textShadowColor: '#585858', textShadowOffset:{width: 1, height: 1},textShadowRadius:1 }}>energy.</Text>
                </Text>
            </View>
        </View>
    );
};

export default Page10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#BDC2C8',
        width: '100%',
        height: 'auto'
    },
    circleContainer: {
        width: 900,
        height: 400,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    circle: {
        width: 700,
        height: 700,
        borderRadius: 350,
        borderColor: 'black',
        borderWidth: 2,
        position: 'absolute',
        bottom: -400,
        zIndex: 2,
        opacity: 1,
    },
    innerCircle: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 50,
        position: 'absolute',
        top: -30,
        left: 325,
        zIndex: 4,
    },
    glowing: {
        width: 80,  // Increased size
        height: 80,  // Increased size
        backgroundColor: 'yellow',
        position: 'absolute',
        top: -40,  // Adjusted position
        left: 315,  // Adjusted position
        zIndex: 2,
        shadowColor: 'rgba(252, 291, 82, 1)',  // Increased opacity
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,  // Increased shadow opacity
        shadowRadius: 40,  // Increased shadow radius
        borderColor: 'null',
       
        
    },
    secondGlowing: {
        width: 55,
        height: 55,
        backgroundColor: 'yellow',
        position: 'absolute',
        top: -12,
        left: 147,
        zIndex: 2,
        shadowColor: 'rgba(252, 291, 82, 0.8)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        borderColor: 'null',
    },
    thirdGlowing: {
      width: 40, // Reduced size
      height: 40, // Reduced size
      backgroundColor: 'yellow',
      position: 'absolute',
      top: 90,
      left: 0, // Adjusted position
      zIndex: 2,
      shadowColor: 'rgba(252, 291, 82, 0.8)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 12,
      borderColor: 'null',
    },
    glowing1: {
        transform: [{ rotate: '30deg' }],
    },
    glowing2: {
        transform: [{ rotate: '60deg' }],
    },
    glowing3: {
        transform: [{ rotate: '90deg' }],
    },
    circle2: {
        width: 550,
        height: 550,
        borderRadius: 275,
        borderColor: 'black',
        borderWidth: 2,
        position: 'absolute',
        bottom: -330,
        zIndex: 4,
        opacity: 0.5,
    },
    innerCircle2: {
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 25,
        position: 'absolute',
        top: -10,
        left: 150,
        zIndex: 4,
    },
    circle3: {
        width: 400,
        height: 400,
        borderRadius: 200,
        borderColor: 'black',
        borderWidth: 2,
        position: 'absolute',
        bottom: -250,
        zIndex: 4,
        opacity: 0.5,
    },
    innerCircle3: {
      width: 30, // Reduced size
      height: 30, // Reduced size
      backgroundColor: 'green',
      borderRadius: 15,
      position: 'absolute',
      top: 95, // Adjusted position
      left: 5, // Adjusted position
      zIndex: 4,
    },
    protonAndNeutron: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        bottom: -320,
    },
    proton: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'red',
        position: 'absolute',
        left: -70,
        bottom: -80,
    },
    neutron: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'blue',
        position: 'absolute',
        right: -70,
        bottom: -80,
    },
    bodyText: {
        textAlign: 'center',
        position: 'absolute',
        zIndex: 100,
        bottom: 50,
        fontWeight: '700',
        color: 'white',
    },
});
