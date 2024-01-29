//This is the Help page.
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HelpPage ({ navigation }) {

    const handleEmailIconPress = () => {
        //This is for redirecting user to their emailing app so tey can
        //send an email message to you when they click on it.
        const emailAddress = process.env.ADMIN_EMAIL_ADDRESS;
        const url = `mailto:${emailAddress}`;
    
        Linking.openURL(url).catch((err) => console.error('Error opening email app:', err));
      };


    return(
        <ScrollView style={styles.container}>
            
            <View style={styles.header}>

                <View style={styles.items}>
                    <Icon name="arrow-back" color="grey" size={40} onPress={() => navigation.goBack('MainPage')}/>
                </View>

                <View style={styles.items} >

                    <Text style={styles.headerText}>Help</Text>

                </View>

                 <View style={styles.items}>

                </View>

            </View>
 
            <View style={styles.ballContainer}>

                <View style={styles.firstBall}>

                </View >

                <View style={styles.secondBall}>
                    
                </View>

                <View style={styles.thirdBall}>
                    
                </View>

                <View style={styles.fourthBall}>
                    
                </View>

            </View>

            <View style={styles.bodyHead}>

                <Text style={styles.bodyHeadText}>How it works</Text>

            </View>


          
                <View style={styles.bodyContentText}>

                    <Text style={styles.writeUp}>
                    {'\u{1F449}'} Click on ball at the top screen to start game, the colored 
                        ball will begin to fall to the Big circle position at the 
                        bottom of the screen. 
                    </Text>

                    <Text style={styles.writeUp}>
                    {'\u{1F449}'} While the ball is falling, tap the big 
                        circle to spin till the color of the top side of the 
                        big circle matches the color of the falling ball.
                    </Text>

                    <Text style={styles.writeUp}>
                    {'\u{1F449}'} Do this before the falling ball gets to the big circle.
                    </Text>

                    <Text style={styles.writeUp}>
                    {'\u{1F449}'} When the ball and the big circle collide, the game engine 
                        checks if the colour of the top side of the big circle matches with 
                        the color of the moving ball. if they match, you'd earn a point and 
                        if they don't, you've failed the game. Ouch!
                    </Text>

                    <Text style={styles.writeUp}>
                        {'\uD83D\uDE0A'} I hope you get it now.
                    </Text>

                    <Text style={styles.writeUp}>
                    {'\u2728'}Happy playing!
                    </Text>

                    <Text style={styles.writeUp}>
                        For any feedback or suggestion, feel free to
                        reach out directly to us with a click of the email
                        icon below.

                    </Text>

               
                    <Icon name="email" size={30} color="black" onPress={handleEmailIconPress} style={styles.emailIcon}/>
                   
                </View>



            
        </ScrollView>
    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        
    },

    
    header: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',
        //paddingHorizontal: 10, // Adjust as needed
        
       
    },

    items: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        //padding: 10
        margin: 10

    },

    headerText: {
        fontFamily: 'georgia',
        fontSize: 25,
        color: 'black',
        marginLeft: 'auto', // Push the text to the middle
        marginRight: 'auto', // Push the text to the middle
        
    },


    ballContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        marginBottom: 10

    },

    firstBall: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'red'
    },

    secondBall: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'blue'
    },

    thirdBall: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'yellow',
        backgroundColor: 'yellow'
    },

    fourthBall: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'green',
        backgroundColor: 'green'
    },


    bodyHead: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30

    },

    bodyHeadText: {
        color: 'red',
        fontFamily: 'consolas',
        fontSize: 27,
        
       
    },

    bodyContent: {
        

    },

    bodyContentText: {
        fontSize: 16,
        width: '90%',
        marginLeft: 'auto',
        marginRight:'auto',
        
    },


    writeUp: {
        marginBottom: 30,
        fontSize: 15,
        color: 'grey'

    },



    emailIcon: {
        marginBottom: 20,
        alignSelf: 'center'
    }

});




export default HelpPage;


/*

    Now, with the ScrollView wrapping your content, 
    if the content extends beyond the screen height, 
    it should become scrollable. Ensure that the ScrollView 
    has a style that includes flex: 1 to make it take up 
    the available space.

*/