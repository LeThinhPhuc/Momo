import { View, Text, Button, TextInput,StyleSheet,Image,TouchableOpacity } from 'react-native'
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
        const auth = getAuth();
        signInWithEmailAndPassword(auth, tk, MatKhau)
            .then((userCredential) => {
                navigation.navigate('Momo', {
                    SoTaiKhoan: TaiKhoan
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
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
            <TextInput maxLength={11} keyboardType='numeric' style={styles.ip} placeholder='Nhập tài khoản'
                onChangeText={text => setTaiKhoan(text)} />

            <TextInput style={styles.ip} placeholder='Nhập mật khẩu'
                onChangeText={text => setMatKhau(text)}/>
            {/* Nút login */}
            <TouchableOpacity style = {styles.login} onPress={handleLogin}>
                        <Text style = {{fontSize : 30}}>Log in</Text>
            </TouchableOpacity>
            {/* nút tạo tài khoản  */}


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        flex: 1,
        backgroundColor: '#D82D8B',
        
    },
    logo: {
        width:250,
        height:250,
        position:'relative',
        top : 50,
        left: 175,
    },
    text: {
        position:'relative',
        left: 130,
        
    },
    ip: {
        position:'relative',
        left: 65,
        backgroundColor: '#ffff',
        marginTop : 30,
        width : 470,
        height : 70,
        textAlign : 'center',
        fontSize : 20,
        borderRadius:40 
    },
    login: {
        position:'relative',
        left: 69,
        marginTop : 30,
        backgroundColor : 'pink',
        textAlign : 'center',
        width : 460,
        height : 50,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center',
        borderRadius:30 
    }
})