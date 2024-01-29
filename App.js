import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FailedContext } from './contextApiFolder/FailedContext';
import { RetryContext } from './contextApiFolder/RetryContext';
import MainPage from './pages/MainPage';
import HelpPage from './pages/HelpPage';
import HighScorePage from './pages/HighScorePage';
import CloseNavbar from './components/CloseNavbar';//This is to close Navigation bar onclick of close icon.
import AppOpeningPage from './pages/AppOpeningPage';


const Drawer = createDrawerNavigator();

function App() {

  const [failedContextValue, setFailedContextValue] = useState(false);
  const [retryContextValue, setRetryContextValue] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);


  //This effect is to show app loading screen (which is AppOpeningPage)
  //when the user open the app and they would be redirected 
  //to the app main page ater 4 seconds. . . . . . . . . . . . . . . 
  useEffect(() => {

    // Simulating a delay before navigating to MainPage
    const delay = setTimeout(() => {

      setShowMainPage(true);

    }, 4000); // Adjust the delay time (in milliseconds) as needed

    // Clear the timeout on component unmount (cleanup)
    return () => clearTimeout(delay);

  }, []);


  return (
    <View style={styles.container}>
      <FailedContext.Provider value={{failedContextValue, setFailedContextValue}}> 
        <RetryContext.Provider value={{retryContextValue, setRetryContextValue}}>
          <NavigationContainer>
            {showMainPage ? (
              <Drawer.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false}}
              drawerContent={(props) => <CloseNavbar {...props} />}>
                <Drawer.Screen name="MainPage" component={MainPage} />
                <Drawer.Screen name="HighScorePage" component={HighScorePage} />
                <Drawer.Screen name="HelpPage" component={HelpPage} />
              </Drawer.Navigator>
              ) : (
                <AppOpeningPage />
            )}
          </NavigationContainer>
          </RetryContext.Provider>
      </FailedContext.Provider>  
    </View>
  );
}





const styles = StyleSheet.create({

  container: {
      flex:1//This is to makes sure the parent app containertakes
            //the full screenof the user mobile device
  }
 
});


export default App;
