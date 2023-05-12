import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MOMO} from './components/MOMO';
import {CHAT} from './components/CHAT';
import {LSGD} from './components/LSGD';
import {VCT} from './components/VCT';



const Tab = createBottomTabNavigator();
export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer style={styles.bottomTab}>
        <Tab.Navigator >
          <Tab.Screen name="MOMO" component={MOMO} options={{title:"MOMO"}}/>
          <Tab.Screen name="LSGD" component={LSGD} options={{title:"LỊCH SỬ GD"}}/>
          <Tab.Screen name="CHAT" component={CHAT} options={{title:"CHAT"}}/>
          <Tab.Screen name="VCT" component={VCT} options={{title:"VÍ CỦA TÔI"}}/>
          
        </Tab.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomTab : {
    padding: 20,
  },
});



