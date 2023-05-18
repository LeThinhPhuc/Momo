import { View, Text, Button, TextInput } from 'react-native'
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

    const handleTaoTaiKhoan = () => {
        let tk = TaoTaiKhoan + "@gmail.com";
        createUserWithEmailAndPassword(auth, tk, TaoMatKhau)
            .then(async (userCredential) => {

                const user = userCredential.user;
                try {
                    const docRef = await setDoc(doc(db,TaoTaiKhoan,'PersonalInformation'),{
                        FullName : TenNguoiDung,
                        PhoneNumber : TaoTaiKhoan,
                        Balance : 0
                    })
                    console.log("Thêm dữ liệu vào firebase thành công")
                } 
                catch (e) {
                    console.error("Error adding document: ", e);
                }
                console.log("Tạo tài khoản thành công");

            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })



    }
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text >Tài khoản</Text>
            <TextInput maxLength={11} keyboardType='numeric' style={{ backgroundColor: 'pink' }} onChangeText={text => setTaiKhoan(text)} />

            <Text>Mât khẩu</Text>
            <TextInput style={{ backgroundColor: 'pink' }} onChangeText={text => setMatKhau(text)} ></TextInput>
            <Button onPress={handleLogin} title='Đăng nhập'></Button>


            <View>
                <Text>Tao tk</Text>
                <Text>Tên người dùng</Text>
                <TextInput style = {{backgroundColor : 'pink'}} onChangeText={text => setTenNguoiDung(text)}></TextInput>
                <Text>tk</Text>
                <TextInput maxLength={11} keyboardType='numeric' style={{ backgroundColor: 'pink' }} onChangeText={text => setTaoTaiKhoan(text)}></TextInput>
                <Text>mk</Text>
                <TextInput style={{ backgroundColor: 'pink' }} onChangeText={text => setTaoMatKhau(text)}></TextInput>
                <Button onPress={handleTaoTaiKhoan} title='tao tk'></Button>
            </View>
        </View>
    )
}