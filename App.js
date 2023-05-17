import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MOMO} from './components/MOMO';
import {CHAT} from './components/CHAT';
import {LSGD} from './components/LSGD';
import {VCT} from './components/VCT';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator
        initialRouteName={MOMO}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "LSGD") {
              iconName = focused ? 'time' : 'time';

            } else if (rn === "CHAT") {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';

            } else if (rn === "VCT") {
              iconName = focused ? 'person' : 'person';

            } else if (rn === "MOMO") {
              iconName = focused ? 'home' : 'home';
            }

            return <Ionicons name={iconName} size={size} color={color} />;                
          },
          "tabBarActiveTintColor": "#D82D8B",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
          "paddingBottom": 10,
          "fontSize": 10
          },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
          
        })}>
          <Tab.Screen name="MOMO" component={MOMO} options={{tabBarLabel: "MOMO"}}/>
          <Tab.Screen name="LSGD" component={LSGD} options={{tabBarLabel: "LỊCH SỬ GD"}}/>
          <Tab.Screen name="CHAT" component={CHAT} options={{tabBarLabel: "CHAT"}}/>
          <Tab.Screen name="VCT" component={VCT} options={{tabBarLabel: "VÍ CỦA TÔI"}}/>
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
    flexDirection: Platform.OS === 'android' || Platform.OS ==='ios' ? 'row': 'column',

  },
  bottomTab : {
    padding: 20,
  },
});