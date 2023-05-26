import { View, Text, Button, TextInput,StyleSheet,Image,TouchableOpacity, Platform } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { app, db } from '../config/firebaseconfig'
import { collection, addDoc,setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
export default function Login({ navigation }) {

    const [TenNguoiDung,setTenNguoiDung] = useState();
    const [TaiKhoan, setTaiKhoan] = useState();
    const [MatKhau, setMatKhau] = useState();
    const [TaoTaiKhoan, setTaoTaiKhoan] = useState();
    const [TaoMatKhau, setTaoMatKhau] = useState();

    const auth = getAuth(app);

    const handleLogin = () => {
        let tk = TaiKhoan + "@gmail.com";
        let mk = MatKhau;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, tk, mk)
            .then((userCredential) => {
                setTaiKhoan('')
                setMatKhau('')
                navigation.navigate('Momo', {
                    SoTaiKhoan: TaiKhoan
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }

    const handleDangki=()=>{
		navigation.navigate('Signup');
	}
    return (
        <View style={styles.container}>
            <Image style = {styles.logo}
                source={require('../src/image/logo.png')}>
            </Image>
            <View style={styles.text}>
                <Text></Text>
                <Text style = {{fontSize : 20,color:'#ffff'}}>Thiết lập mật khẩu để bảo vệ tài khoản</Text>
                <Text style = {{fontSize : 20,color:'#ffff'}}>     ví MoMo của bạn (gồm 6 chữ số)</Text>
            </View>
            <TextInput value={TaiKhoan} maxLength={11} keyboardType='numeric' style={styles.ip} placeholder='Nhập tài khoản'
                onChangeText={text => setTaiKhoan(text)} />

<TextInput
  value={MatKhau}
  secureTextEntry={true}
  style={styles.ip}
  placeholder='Nhập mật khẩu'
  onChangeText={text => setMatKhau(text)}
/>

            {/* Nút login */}
            <TouchableOpacity style = {styles.login} onPress={handleLogin}>
                        <Text style = {{fontSize : 30}}>Log in</Text>
            </TouchableOpacity>
            {/* nút tạo tài khoản  */}
            <TouchableOpacity style = {styles.CreateAccount} onPress={handleDangki}>
                    <Text style = {{textDecorationLine : 'underline', fontSize : 20, color: '#ffff'}}>Đăng kí</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        flex: 1,
        backgroundColor: '#D82D8B',
        alignItems: 'center',
        //flexDirection: Platform.OS === 'android' || Platform.OS === 'ios' ? 'row' : 'column',
        
    },
    logo: {
        width:250,
        height:250,
        position:'relative',
        top : '5%',
        //left: 175,
    },
    text: {
        position:'relative',
       // left: 130,
        
    },
    ip: {
        position:'relative',
        //left: 65,
        backgroundColor: '#ffff',
        marginTop : 30,
        width : '90%',
        height : '8%',
        textAlign : 'center',
        fontSize : 20,
        borderRadius:40 
    },
    login: {
        position:'relative',
        //left: 69,
        marginTop : 30,
        backgroundColor : 'pink',
        textAlign : 'center',
        width : '50%',
        height : '5%',
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center',
        borderRadius:30 
    },
    CreateAccount: {
        marginTop : 30,
        position:'relative',
        //left: 230,
        textAlign : 'center',
        width : 150,
        height : 50,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center',
    }

})