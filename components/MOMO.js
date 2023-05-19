import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity ,Button } from 'react-native';
import ChuyenTien from './ChuyenTien/ChuyenTien';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc ,getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
export const MOMO = ({ navigation,route }) => {
	const { SoTaiKhoan } = route.params;
	const [TenKhachhang,setTenKhachHang] = useState();
	const [amount,setamount] = useState(); // Số tiền hiển thị
	const [isAmountVisible, setIsAmountVisible] = useState(false);
	const toggleAmountVisibility = () => {
		setIsAmountVisible(!isAmountVisible);
	};
	const handleNapTien = () =>{
		navigation.navigate('NapTien',{SoTaiKhoan : SoTaiKhoan});
	}
	const handleChuyenTien=()=>{
		navigation.navigate('ChuyenTien',{SoTaiKhoan : SoTaiKhoan});
	}
	//load dữ liệu PersonalInformation từ database lên 
	useEffect(() => {
		const LoadBalanceAndFullName = async () =>
		{
			const docRef = doc(db,SoTaiKhoan,"PersonalInformation"); //lấy doccumentID là PersonalInformation trong Collection SoTaiKhoan được lưu trong db
			const docSnap = await getDoc(docRef) 
			if(docSnap.exists())
			{
				setamount(docSnap.data().Balance);
				setTenKhachHang(docSnap.data().FullName);
			}
			else console.log("KHông tìm thấy document")
		}
		LoadBalanceAndFullName();
	},[SoTaiKhoan])
	
	const handleReload = async () =>{
		const docRef = doc(db,SoTaiKhoan,"PersonalInformation"); //lấy doccumentID là PersonalInformation trong Collection SoTaiKhoan được lưu trong db
			const docSnap = await getDoc(docRef) 
			if(docSnap.exists())
			{
				setamount(docSnap.data().Balance);
				setTenKhachHang(docSnap.data().FullName);
			}
	}
	return (
		<View style={styles.container}>

			<View style={styles.header}>
				<View style={styles.header_email}>
					<Text style={styles.email}>{TenKhachhang}</Text>

				</View>
				<TouchableOpacity>
					<Image style={styles.bell} source={require('../src/image/bell.png')} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={styles.b_account} source={require('../src/image/basic_account.png')} />
				</TouchableOpacity>

			</View>
			<View style={styles.body}>
				<View style={styles.features}>
					<TouchableOpacity onPress={handleNapTien}>
						<Image source={require('../src/image/24_navigation_cash_in.png')} style={{ tintColor: '#D82D8B', height: 100, width: 100, }} />
						<Text style={styles.font_feature}>{'Nạp tiền\nvào ví'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleChuyenTien}>
						<Image source={require('../src/image/bank.png')} style={styles.features_icon} />
						<Text style={styles.font_feature}>{'Chuyển tiền\nngân hàng'}</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image source={require('../src/image/smartphone.png')} style={styles.features_icon} />
						<Text style={styles.font_feature}>{'Nạp tiền\nđiện thoại'}</Text>
					</TouchableOpacity>

				</View>
				<View style={styles.amount_money}>

					<TouchableOpacity onPress={toggleAmountVisibility}>
						<Ionicons style={styles.eye} name={isAmountVisible ? 'eye' : 'eye-off'} size={40} />
					</TouchableOpacity>

					<Text style={styles.amount}>{isAmountVisible ? amount.toLocaleString('en-US') + 'đ' : '*********'}</Text>
					
					<View >
						<TouchableOpacity style = {styles.btn_reload} onPress={handleReload}>
							<Text>Reload</Text>
						</TouchableOpacity>
					</View>
				</View>

			</View> 
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		//paddingTop: Constants.statusBarHeight,
		backgroundColor: '#3c5b49',
		padding: 8,
	},
	header_email: {
		width: '70%',
		padding: 8,
		borderRadius: 15,
		backgroundColor: 'rgba(0,0,0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center',

	},
	email: {
		color: 'white',
		fontSize : 20
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bell: {
		height: 34,
		width: 34,
		padding: 8,
		backgroundColor: 'rgba(0,0,0, 0.6)',
		borderRadius: 13,
		left: 20,

	},
	b_account: {
		height: 34,
		width: 34,
		padding: 8,
		backgroundColor: 'rgba(0,0,0, 0.6)',
		borderRadius: 13,
	},
	amount_money: {
		flexDirection: 'row',
		top: 60,
	},
	amount: {
		fontSize: 40,
		left: 20,
	},
	eye: {
		top: 5,
		left: 10,
	},
	body: {
		top: 20,
		backgroundColor: '#e0e0e1',
		borderRadius: 15,
		paddingBottom: '20%',
		flexDirection: 'column',
	},
	features: {
		flexDirection: 'row',
		top: 20,
		left: 5,
		justifyContent: 'space-around',
	},
	features_icon: {
		height: 100,
		width: 100,
	},
	font_feature: {
		fontSize: 20,
	},

	btn_reload :{
		width : 50,
		height : 50 ,
		backgroundColor : 'pink',
		justifyContent :'center',
		alignItems : 'center',
		marginLeft : 40,
		borderRadius : 20
	}
});