module.exports = {
  presets: ['module:@react-native/babel-preset'],
  //necessary for .env
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    
    //react-native-reanimated/plugin has to be listed last.
    'react-native-reanimated/plugin'
  ],
  
};
