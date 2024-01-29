//This page is the App Opening Page. It's the first
//page that shows when the app is opened.
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


function AnimatedBall ({ navigation }) {

  const scaleAnimation = new Animated.Value(0);

  useEffect(() => {

    const sequence = Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }),

      Animated.timing(scaleAnimation, {
        toValue: 0,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }),

    ]);

    Animated.loop(sequence).start();

  }, [scaleAnimation]);


  const scale = scaleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2], // Adjust the output range based on the desired maximum size
  });



  return (
    <View style={styles.container}>

      <Animated.View style={[styles.ball, { transform: [{ scale }] }]}>

        <LinearGradient
          key="uniqueKey1"
          style={styles.gradient}
          colors={['blue', 'red', 'yellow', 'green']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />

      </Animated.View>

      
    </View>

  );

};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },

  ball: {
    width: 30,
    height: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },

  gradient: {
    flex: 1,
    transform: [{ rotate: '45deg' }], // Rotate the gradient to mimic the effect
  },

});


export default AnimatedBall;


