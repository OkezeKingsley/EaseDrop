//This component is for the instruction that shows below the ball
//to indicate how to start game . . . . . . . . . . . . . . . . .
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function StartInstruction () {

  const bounceValue = new Animated.Value(0);


  const startBounceAnimation = () => {

    Animated.sequence([

      Animated.timing(bounceValue, {

        toValue: 1,

        duration: 1000,

        easing: Easing.ease,

        useNativeDriver: true,

      }),


    Animated.timing(bounceValue, {

      toValue: 0, // Bounces to the original position

      duration: 1000, // Duration of the animation

      easing: Easing.in(Easing.ease), 

      useNativeDriver: true, // Enable native driver for better performance

    }),

  ]).start(() => {
      // Reset the bounce value to 0 after each bounce
      bounceValue.setValue(0);

      // Start the next bounce
      startBounceAnimation();

    });



   }
 

 //Call startBounceAnimaton function
 startBounceAnimation();



  const bounceHeight = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10], // Adjust the bounce height as needed
  });


  return (

    <Animated.View
      style={[
        styles.bouncingView,
        {
          transform: [{ translateY: bounceHeight }],
        },
      ]}
    >

      {/* Your content goes here */}
      <View style={styles.bouncingInstruction}>

          <Icon name="keyboard-arrow-up" size={30} color="black" />

          <Text style={styles.instructionText}>Click Ball To Start</Text>

      </View>

   
    </Animated.View>


  );


}



const styles = StyleSheet.create({

  bouncingView: {
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15
  },

  

  bouncingInstruction: {
    height: 50,
    flexDirection: 'column', 
    alignItems: 'center'
  },

  instructionText: {
    color: 'grey'
  }


});



export default StartInstruction;