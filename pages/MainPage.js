//This is the Main page.
import { View, Text, StyleSheet, Animated, Modal, TouchableOpacity, Button, Easing, Dimensions, Alert} from 'react-native';
import { useState, useRef, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FailedContext } from '../contextApiFolder/FailedContext';
import FailedGamePopUpMessage from '../components/FailedGamePopUpMessage';
import { RetryContext } from '../contextApiFolder/RetryContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import StartInstruction from '../components/StartInstruction';


function Main () {

    //USESTATE SECTION
    const [distanceOfScreenTopToBigCircle, setDistanceOfScreenTopToBigCircle] = useState(null);
  
    //Checking moving ball background color
    const [bigCircleBackgroundColor, setBigCircleBackgroundColor] = useState('grey');

    //This state helps in holding the random color given to moving ball
    const [movingBallColor, setMovingBallColor] = useState();

    //This state is responsible for giving dynamic color values to the bigCircle borders 
    const [borderOrder, setBorderOrder] = useState(['red', 'blue', 'green', 'yellow']);

    //This state hold the value points scored
    const [points, setPoints] = useState(0);

    //This states hold time duration for the rate at which he ball
    //moves. It changes at different conditions.
    const [movingBallTimeDuration, setMovingBallTimeDuration] = useState(2500);

  

    //CONTEXT API...
    //This context variable hold the boolean value to know if the modal pop
    //up alert dialogue box to show. It carries the value of true or false
    //and this values can be toggles around our application as long as the
    //context is imported into the componet. . . . . .  . .
    const {failedContextValue, setFailedContextValue} = useContext(FailedContext);


    //This context value hold the boolean value to tell the moving ball to
    //return to the top of the page or initial position of zero when a user 
    //clicks on the retry game after they failed on a play. . . . . . . . 
    //a true value tell the ball to go back to initial postion of zero while
    //a false value will do nothing.....
    const {retryContextValue, setRetryContextValue} = useContext(RetryContext);
    
    //This state holds the boolean value for whether to show how to start game instruction or not
    const [showHowToStartGameInstruction, setShowHowToStartGameInstruction] = useState(true)

    //USEREF SECTION
    const bigCicleRef = useRef(null);
    const movingBallRef = useRef();


   //Setting a random color to ball on page load
   useEffect(( ) => {

    //Let give random colors to the movinging ball onload of page
    const colors = ['blue', 'green', 'red', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setMovingBallColor(randomColor)


    //Also let show the instruction on how to start game when user 
    //get to this page.. . . . .  . . . . 
    setShowHowToStartGameInstruction(true);

    
    }, []);





    //This effect is for setting time duration on each stage

    useEffect(() => {

        if (points === 0) {

            setMovingBallTimeDuration(2500)
        }
 
        if (points > 5) {

            setMovingBallTimeDuration(2100)
        }


        if (points > 15){

            setMovingBallTimeDuration(1700)
        }


        if (points > 25) {

            setMovingBallTimeDuration(1300)
        }


        if (points > 40) {

            setMovingBallTimeDuration(1090)

        }
     
    }, [points])


    //USEEFFECT SECTION
    //On page load and on layout of the bigCircle view, let's   
    //get the distance between the top of the screen and the  
    //bigCircle that receive the falling ball. . . . . . 
    const calculateDistanceFromTop = () => {

        if (bigCicleRef.current) { 

            bigCicleRef.current.measure((x, y, width, height, pageX, pageY) => {

                if (pageY) {

                    setDistanceOfScreenTopToBigCircle(pageY)

                    console.log('the distance of big circle to top screen is', pageY)
                }
               
                
            });

        }
        

    }


    
    //MOVING BALL ANIMATION PART
    const [ballY] = useState(new Animated.Value(0));
   
    function movingBallFunction () {

        if (distanceOfScreenTopToBigCircle) { //checks if distanceOfScreenTopToBigCircle isn't null

            //This is linear animation
            Animated.timing(ballY, {
                toValue: distanceOfScreenTopToBigCircle,//This the distance the ball should fall to
                duration: movingBallTimeDuration,//This is for the time the ball should reach the bigCircle
                easing: Easing.linear,
                useNativeDriver: true,

            }).start()//This start() method starts our animation
        
        } 

        //This is to not show the instruction on how to start game when user 
        //have started playing the game, or when the ball is moving already. .
        setShowHowToStartGameInstruction(false)
    
    }  

    //This function is to return the ball to the top when it color
    //matches with borderTop color of the bigCircle at that moment.
    const returnToTop = () => {

        Animated.timing(ballY, {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();


        //Let give random colors to the moving ball onload of page
        const colors = ['blue', 'green', 'yellow', 'red'];
       
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setMovingBallColor(randomColor);


        //let call the moving ball function after 2 sec
        setTimeout(() => {

            movingBallFunction();

        }, 150)
        

    };    


    //Function to store scores to local storage of user
    const storeNewPointNumberToStorage = async (point) => {

        try {

            await AsyncStorage.setItem("newPoint", JSON.stringify(point));

            console.log('main new point data save succefully');

            //Then let's set the setPoint state variable to 0
            setTimeout(() => {
    
                setPoints(0);
    
            }, 1000);

            
           

        } catch (error) {

            console.log('Error saving new point', error);

        }

    }

    

    const [countedPoint, setCountedPoint] = useState(false);

    //This effect listens for onchange of postion of the ball
    useEffect(() => {

        //The listener listens for when the ball get to the 
        //big circle position from the top of the mobile screen
        const animationListener = ballY.addListener(({ value }) => {

            //if the ball has gotten to the big cicle position,
            //let check if the background color of the ball is
            //the same as the borderTopColor of the big circle

            if (value - distanceOfScreenTopToBigCircle === 0 && countedPoint === false) {

                console.log('movingBallColor:', movingBallColor);
                console.log('borderOrder[0]:', borderOrder[0]);
                    
                //if the movingBallColor is same as borderTop of
                //bigCircle, let add a point
                if (movingBallColor === borderOrder[0]) {

                    setPoints(points + 1) 
                  
                    //Let return the ball to the top
                    returnToTop();

                    setCountedPoint(true);

                    //Also let set the big circle background of bigCircle
                    //to whatever is the color is the moving ball.
                    setBigCircleBackgroundColor(movingBallColor);  

                } else {
    

                    //If falied, let call the store to local storage function
                    storeNewPointNumberToStorage(points); 

                    //If failed, let pop a failed game message (from the modal component).
                    setFailedContextValue(true);

                }
                    
                
            }

        });

        //This serves a clean up mehanism.
        return () => {
            
            ballY.removeListener(animationListener);

        };
        
  
    }, [ballY, distanceOfScreenTopToBigCircle, movingBallColor, borderOrder, bigCircleBackgroundColor, countedPoint]);

        

    // Reset the counted point flag when necessary
    
    useEffect(() => {

        if (countedPoint === true) {

           setCountedPoint(false);

        }

    }, [countedPoint]);


    

    //This useEffect is to detect when the retryContextValue to true
    //as the user click the retry button so that we can bring the moving 
    //ball to the top of the app (or initial position to zero)
    useEffect(() => {

        if (retryContextValue == true) {

            Animated.timing(ballY, {
                toValue: 0,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start()

            //Also below the ball let's show the instruction text 
            //on how to start the game when user click retry game  
            setShowHowToStartGameInstruction(true)


            //plus also let set the background color of bigCircle
            //to grey. . . . . . . . . . . . . . . . . . . . . . 
            setBigCircleBackgroundColor('grey')
        }

        //Lets then set retryContext alue to false
        //setTimeout(() => {
            setRetryContextValue(false)
        //}, 0.5)
        


    }, [retryContextValue])








    //THIS FUNCTION STARTS THE GAME...
    const startGame = () => {  

        console.log('ran');

        //let start the faling ball function
        movingBallFunction();

    }



    //This function rotates the colors in big circle borders
    //so each time it's clicked on, the circle ill have a 
    //90 deg rotate like view
    const spinBigCircleBordersFunction = () => {

        //Rotate the colors
        //We'd be rotating the colors in the borderOrder state
        //first we'd be figuring out which color is in the first index 
        //of the borderOrder array and then cutting that color away and
        //then putting it at the last position in the array of colors
        
        setBorderOrder((prevOrder) => {
            const newArr = prevOrder.slice(1).concat(prevOrder[0]);
            return newArr;
        });
       
        console.log("Clicked on big circle");
    };
    
  


    //This variable handles the bigCircle border. it's dynamic.
    //as each position of the colors changes so does the border colors
    //of the big circle thus making it look like it's spinning 90 deg
    const bigCircleBordersStyles = {
        borderTopColor: borderOrder[0],
        borderLeftColor: borderOrder[1],
        borderBottomColor: borderOrder[2],
        borderRightColor: borderOrder[3],

        backgroundColor: bigCircleBackgroundColor,
       
    };


    const navigation = useNavigation();

    const openDrawer = () => {

        navigation.openDrawer()
    }




    return(
       
        <View style={styles.container}>


            {/* moving ball containter*/}

            <View style={styles.movingBallContainer}>


                {/* Navbar Menu Icon*/}
            
                <View style={styles.navbarIconContainer}>

                    <Icon name="menu" color="grey" size={45}  onPress={openDrawer}/>

                </View>



                {/* The actual moving ball*/}

                <TouchableOpacity onPress={startGame} style={styles.ballPosition} activeOpacity={1}>
               
                    <Animated.View ref={movingBallRef}

                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: movingBallColor,
                            borderRadius: 100,

                            transform:[{translateY: ballY}],     
                        
                        }}                    
                        
                    > 

                    </Animated.View>

                </TouchableOpacity>  
  


                {/*This is to display instruction to user to click the 
                 ball so they can start game . . . . . . . . . . .*/}
                <View>
                    { showHowToStartGameInstruction === true ? (  <StartInstruction /> ) : "" } 
                </View>



                {/* This is for showing the point user has accumulated */}
                <Text style={styles.points}> Points: {points} </Text>

 

                
            </View> 


 

            {/*This below component is for custom Modal dialogue box that
            displays when user fails a game . . . . . . . . . . . . . .*/}
            <FailedGamePopUpMessage />




            {/* Big Circle container */}
            
             <View style={styles.bigCircleContainer} >

                <TouchableOpacity ref={bigCicleRef}
                
                    style={[styles.bigCircle, bigCircleBordersStyles]} 

                    onLayout={calculateDistanceFromTop}

                    onPress={spinBigCircleBordersFunction}

                    activeOpacity={1}//prevents the fade like feel of box
             
                >
                  
                </TouchableOpacity>



             </View> 
                




        </View>
    


    );


}



const styles = StyleSheet.create({

        container: {
         
            flex:1, //This make sure the container 
                   //takes the fill mobile view

            backgroundColor: '#FFFFFF'
           
        },

        navbarIconContainer: {
            alignItems: 'flex-start',
            marginRight: 'auto',
            paddingTop: 5,
            paddingLeft: 5
        },

        movingBallContainer: {   
            flex: 2,
            alignItems: 'center'      
        },
        
        ballPosition: {
            position: 'absolute', 
            top: 0
        },

        points: {
            fontSize: 40,
            marginTop: 30,
            color: 'grey'
        },

        bigCircleContainer: {
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop:0,
            paddingBottom:60,
           
        },

        bigCircle: {
            width: 200,
            height: 200,
            borderWidth: 20,
            textAlign: 'center',
            alignItems: 'center',
            borderRadius: 100,
            position: 'absolute',
            top:0,
                
        },


});




export default Main;