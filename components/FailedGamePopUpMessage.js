//This component is for our modal pop up. It is responsble for showing
//failed game pop up when player loose a game or a high score congratulation
//pop up when a player los and the point they got beat what they have in
//highscore . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

import { useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Animated} from 'react-native';
import { FailedContext } from '../contextApiFolder/FailedContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RetryContext } from '../contextApiFolder/RetryContext';

//Rememeber, the Modal we import from react native will be used
//to make a pop up display like message...........

function FailedGamePopUpMessage () {
    //A state variable to control the visibility of custom popup failed popup alert
    const [isModalVisible, setModalVsibale] = useState(false);

    //This state holds the new point value when ever a user fail a game.
    const [newPointNumber, setNewPointNumber] = useState();

    //This holds the value for high score
    const [highScore, setHighScore] = useState();

    // State variable to track if the user has a new high score
    const [isNewHighScore, setIsNewHighScore] = useState(false);

    

    //This context variable hold the boolean value to know if the modal pop
    //up alert dialogue box to show. It carries the value of true or false
    //and this values can be toggles around our application as long as the
    //context is imported into the componet. . . . . .  . .
    const {failedContextValue, setFailedContextValue} = useContext(FailedContext)
   
    //This context value hold the boolean value to tell the moving ball to
    //return to the top of the page or initial position of zero when a user 
    //clicks on the retry game after they failed on a play. . . . . . . . 
    //a true value tell the ball to go back to initial postion of zero while
    //a false value will do nothing.....
    const {retryContextValue, setRetryContextValue} = useContext(RetryContext);
    


    
    //This function set scores in local storage of user to zero when user
    //close he modal pop up. (It is better we do this because when the user
    //close the modal pop up and they retry playing game again, their new 
    //point is actually are starting from point zero) . . . . . . . . . .
    const storeNewPointNumberToZero = async (point) => {

        try {

            await AsyncStorage.setItem("newPoint", JSON.stringify(point))



        } catch (error) {

            console.log('Error saving new point', error)

        }


    }



    //This function stores player high score to high score local storage
    const storeHighScoreToStorage = async (point) => {

        try {

            await AsyncStorage.setItem("high", JSON.stringify(point));

            console.log('high score data save succefully', point);
            setHighScore('high score state set', point);



        } catch (error) {

            console.log('Error saving high score', error)

        }

    }



    
    //Function to show/hide the pop up alert
    const toggleModal = () => {

        setModalVsibale(!isModalVisible);

        //Setting the value for failed context to false 
        //on call of this function.....>>>>
        setFailedContextValue(false);


    }




    useEffect(() => {

        //Let check if the value for failedValue context
        //is true and if yes, let call the togle modal
        //function so that it can display the fail game
        //message . . . . . . . . . . . . . . . . . . 
        if (failedContextValue == true) {

            toggleModal();

        }

    }, [failedContextValue]);




    useEffect(() => {

        //Change the value of new point in local storage to zero
        //when the modal dialogue box is close. (in this case if
        //it set to false. . . . . ). .  . . . . . . . . . .  .
        //Also let set retryContextValue to true when modal is 
        //closed so that the ball can return to top (initial
        //positio of zero)
        if (isModalVisible == false) {

            console.log('him him')
            storeNewPointNumberToZero(0)


            //let set retryContextValue to true when modal is 
            //closed so that the ball can return to top (initial
            //positio of zero)
            setRetryContextValue(true)

            //let set notUpToHighScore to the initial value of false
            //when usr close the modal
            //setNotUpToHighScore(true)
            
                        
        }

    }, [isModalVisible])




    useEffect(() => {
        //Let confirm if the modal pop up is displayed or
        //true in this useEffect then let retrieve the value 
        //of high score stored in storage to then compare it to 
        //the new point number to see which is greater. if new
        //point number is greater, let change the value of
        //the user high score to the value of new point number

        if (isModalVisible == true) {   

            //Let retrieve the new point from local storage 
            //so it can be displays when a user fail a game.
            const retrieveNewPointNumberFromStorage = async () => {

                try {

                    const data = await AsyncStorage.getItem('newPoint')

                    if (data !== null) {

                        console.log('Retrieved new point data:', data)

                        //Let convert the data value gotten from local storage
                        //number data type. Why because retrieving data from
                        //react native local storeHighScoreToStorage, the stored 
                        //value is typically a string, even if it original represent
                        //a number
                        const convertToNumber = parseInt(data, 10);
                        console.log('new point string to number', typeof convertToNumber, convertToNumber);

                        setNewPointNumber(convertToNumber)

                    } else {

                        console.log('data not found')
                    }

                } catch (error) {

                    console.log('Error retrieving new point number data', error)
                }

            }


            retrieveNewPointNumberFromStorage()
          

            //retrieve high score function

            const retrieveHighScoreFromStorage = async () => {

                try {

                    const data = await AsyncStorage.getItem('high')

                        
                        if (data == null)  {

                            console.log('high score data not found');

                            storeHighScoreToStorage(newPointNumber);

                        }
                    

                        //if there is high score present in local
                        if (data !== null) {

                            console.log('Retrieved high score data:', data)

                            //Let convert the data value gotten from local storage
                            //number data type. Why because retrieving data from
                            //react native local storage, the stored value is typically 
                            //a string, even if it original represent a number. . . .
                            const convertToNumber = parseInt(data, 10);
                            console.log('high score string to number', typeof convertToNumber, convertToNumber);


                                if (convertToNumber > newPointNumber) {

                                    console.log('not pass high score')
                                    console.log('greate great', convertToNumber)

                                    // Set isNewHighScore to false when not achieving a new high score
                                    setIsNewHighScore(false);

                                } 
                                
                                if (newPointNumber > convertToNumber) {

                                    console.log('youve a new high score', newPointNumber);

                                    //now let set the high score in local storage to the
                                    //new point number . . . . . . . . . . . . .  .  . .
                                    storeHighScoreToStorage(newPointNumber);

                            
                                    // Set isNewHighScore to true when achieving a new high score
                                    setIsNewHighScore(true);

                                }

                        } 

                    } catch (error) {

                        console.log('Error retrieving high score data', error)
                    }
                
            }

        
            retrieveHighScoreFromStorage('highscore');


        }

    }, [ isModalVisible, newPointNumber, highScore ]);




    return(

        <View>

            {/*custom modal pop up box*/}

            <Modal 
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    toggleModal();
                        
                }}
                    
                >


                <View style={styles.modalPopUpContainer}>                        
                    
                    <View style={styles.modalPopUp}>

                        <Text style={styles.modalHeading}>

                            {isNewHighScore ? 'Hurray!\u{1F389}' : 'Oops!\u{1F622}'}

                        </Text>

                        <View style={styles.modalMessage}>

                            <Text style={{textAlign: 'center', fontSize: 16, color: 'grey'}}>
                            {

                                isNewHighScore ? "Congratulation, you've won a new highscore!\n \n Your new Highscore is..." : 

                                'Your score is:'

                            }
                            </Text>


                            {/*This shows the dynamic point value*/}
                            <Text style={styles.newScore}>{newPointNumber}</Text>

                            <Text style={styles.point}>points</Text>

                        </View>

                        <TouchableOpacity onPress={toggleModal} style={styles.retryBtn} >
                                
                            <Text style={{color: 'white', fontSize: 15}}>

                                {isNewHighScore ? 'Play again' : 'Retry'}

                            </Text>
                            
                        </TouchableOpacity>

                    </View>

                </View>              
                    
            </Modal> 

        </View>
    );

}





const styles = StyleSheet.create({

        modalPopUpContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center', 
           

        },

        modalPopUp: {
        border: 1,
        borderColor: 'lightgrey',
        borderWidth: 0.55,
        backgroundColor: 'white',
        textAlign: 'center', 
        alignItems: 'center',
        width: 300,

        //Adding box shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3
        
        },

        modalHeading: {
            fontSize: 25,
            marginTop: 20,
            color: 'grey'
                    
            },

        modalMessage: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,

        },

        newScore: {
            fontSize: 60,
            marginTop: 20,
            color: 'grey'
        }, 
        
        point: {
            marginTop: 20,
            marginBottom: 25,
            fontSize: 17,
            color: 'grey'
           
        },

        retryBtn: {
        color: 'white',
        width: 120,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 30,
        borderRadius: 30,
     
        }



});






export default FailedGamePopUpMessage;



/*
//This state hold a boolean value to know if the modal pop up should show (OOPS! 
    //failed game modal popup) or a (HURRAY! Congratulations new high score gotten)
    //modal pop up pending on the comparism of the new point of the user with what
    //they have in their high score in local storage. . . . . . . . . . . . . . . .
    const [notUpToHighScore, setNotUpToHighScore] = useState(true);


*/