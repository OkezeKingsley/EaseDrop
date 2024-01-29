//This is the Highscore Page
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect from React Navigation
import Icon from 'react-native-vector-icons/MaterialIcons';

function HighScorePage ({ navigation }) {

    const [highScoreCount, setHighScoreCount] = useState(0);

     //function for retrieving high score

     const retrieveHighScoreFromStorage = async () => {


        try {

            const data = await AsyncStorage.getItem('high')

                
                if (data == null)  {

                    console.log('high score dislplay data not found')
                }
            

                //if there is high score present in local
                if (data !== null) {

                    let convertedStringToNumber = parseInt(data, 10);

                    setHighScoreCount(convertedStringToNumber)
               
                } 

            } catch (error) {

                console.log('Error retrieving high score data', error)
            }
            
    }



    //useFocusEffect for resetting count to zero when the screen is focused
    useFocusEffect(
       
        useCallback(() => {

         //let give highScoreCount value initials of zero on page load
        setHighScoreCount(0);
   
         //Then let call the high score from storage before counting
         retrieveHighScoreFromStorage()    
        //setHighScoreCount(0) // Reset highScoreCount to zero when the screen is focused

        return () => {
            // Cleanup logic, if any
        };

        }, [])

    );



    return(
        <View style={styles.container}>

            <View style={styles.goBackIcon}>
                <Icon name="arrow-back" color="grey" size={40} onPress={() => navigation.goBack('MainPage')}/>
            </View>

            <View style={styles.centerContent}>
                <Text style={styles.currentText}>Current</Text>
                <Text style={styles.HsText}>High Score:</Text>
                <Text style={styles.highScoreCountText}>{highScoreCount}</Text>
                <Text style={styles.pointText}>Points</Text>
            </View>

        </View>
    );
    

}





const styles = StyleSheet.create({

    container: {
        flex: 1,
       
        backgroundColor: '#FFFFFF'
    },

    goBackIcon: {
        position: 'absolute',
        top: 15,
        paddingLeft: 5
    },

    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },

    currentText: {
        fontSize: 18,
        color: 'grey'
    },

    HsText: {
        fontSize: 28,
        color: 'grey'
        
    },

    highScoreCountText: {
        fontSize: 65,
        fontWeight: 'bold',
        color: 'grey'
    },

    pointText: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 10,
        borderColor: 'red',
        backgroundColor: 'red',
        color: 'white',
        fontSize: 16,
        marginTop: 5
    }

});

export default HighScorePage;