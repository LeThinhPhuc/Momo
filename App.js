import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MOMO } from './components/MOMO';
import { CHAT } from './components/CHAT';
import { LSGD } from './components/LSGD';
import { VCT } from './components/VCT';
import ChuyenTien from './components/ChuyenTien/ChuyenTien';
import MyWallet from './components/MyWallet/MyWallet';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';
import { NapTien } from './components/NapTien';
import Login from './components/Login';
import { DangKi } from './components/DangKi';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function StackMomoAndNapTien()
// {
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen name='Momo' component={MOMO}/>
// 			<Stack.Screen name='NapTien' component={NapTien} options={{title : 'Nạp tiền'}} />
// 		</Stack.Navigator>
// 	)
// }

function TabMainInterface({route})
{
	
	return (
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

					} else if (rn === "Momo") {
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
			<Tab.Screen name = 'Momo' initialParams={route.params} component={MOMO} options={{ tabBarLabel: "MOMO"}}/>
			<Tab.Screen name="LSGD" initialParams={route.params} component={LSGD} options={{ tabBarLabel: "LỊCH SỬ GD" }} />
			<Tab.Screen name="CHAT" initialParams={route.params} component={CHAT} options={{ tabBarLabel: "CHAT" }} />
			<Tab.Screen name="VCT" initialParams={route.params} component={MyWallet} options={{ tabBarLabel: "VÍ CỦA TÔI" }} />

		</Tab.Navigator>
	)
}

export default function App() {

	return (
		<View style={styles.container}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={Login}>
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Signin' component={DangKi}/>
					<Stack.Screen name='Momo' component={TabMainInterface} options={{headerShown : false}}/>
					<Stack.Screen name='NapTien' component={NapTien} options={{title : 'Nạp tiền',headerTitleAlign : 'center',
						headerStyle: {
							backgroundColor: '#da4891',
						  },
						  headerTintColor: 'white',
						  headerTitleStyle: {
							fontWeight: 'bold',
						  },
					}} />
					<Stack.Screen name='ChuyenTien' component={ChuyenTien} options={{title : 'Chuyển tiền',headerTitleAlign : 'center',
						headerStyle: {
							backgroundColor: '#da4891',
						  },
						  headerTintColor: 'white',
						  headerTitleStyle: {
							fontWeight: 'bold',
						  },
					}} />
					<Stack.Screen name="VCT" component={MyWallet} options={{ tabBarLabel: "VÍ CỦA TÔI" }} />
				</Stack.Navigator>
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
		flexDirection: Platform.OS === 'android' || Platform.OS === 'ios' ? 'row' : 'column',

	},
	bottomTab: {
		padding: 20,
	},
});