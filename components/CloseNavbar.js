//This is to add close Navigation bar icon so it can close the Navigation 
//drawer onclick of close icon. . . . . . . . . . . . . . . . . . . . . .
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CloseNavbar = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom content */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, color: 'grey' }}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
      </View>

      {/* Default drawer items */}
      {/*This indicates the lists in the Navbar Drawer*/}
      <DrawerItemList {...props} /> 
    </DrawerContentScrollView>
  );
};


export default CloseNavbar;