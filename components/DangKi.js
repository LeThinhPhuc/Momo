import { View, Text, Button, TextInput,StyleSheet,Image,TouchableOpacity, Platform } from 'react-native'
import React, {useState, useEffect} from 'react';
import { app, db } from '../config/firebaseconfig'
import { collection, addDoc,setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import Constants from 'expo-constants';
export const DangKi = ({navigation}) =>{

    const [TenNguoiDung,setTenNguoiDung] = useState();
    const [TaiKhoan, setTaiKhoan] = useState();
    const [MatKhau, setMatKhau] = useState();
    const [TaoTaiKhoan, setTaoTaiKhoan] = useState();
    const [TaoMatKhau, setTaoMatKhau] = useState();

    const auth = getAuth(app);

<<<<<<< HEAD
   
=======
    
>>>>>>> 589d6e8 (rut tien ve bank)

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
        <View style={styles.container}>

            <View style={styles.text}>
                <Text style={{fontSize:35,color : '#ffff'}}>     Nhập thông tin</Text>
                <Text></Text>
                <Text style={{fontSize:20,color : '#ffff'}}>  Thông tin này dùng để xác thực và</Text>
                <Text style={{fontSize:20,color : '#ffff'}}>bảo vệ tài khoản cua của bạn tốt hơn.</Text>
            </View>



                <TextInput style = {styles.ip} placeholder='Nhập tên người dùng'
                onChangeText={text => setTenNguoiDung(text)}>
                    
                </TextInput>

                <TextInput maxLength={11} keyboardType='numeric' style = {styles.ip} placeholder='Nhập tài khoản'
                onChangeText={text => setTaoTaiKhoan(text)}></TextInput>
                
                <TextInput style={styles.ip} placeholder='Nhập mật khẩu' 
                onChangeText={text => setTaoMatKhau(text)}></TextInput>
                {/* Nút sign up */}
                <TouchableOpacity style = {styles.dangki} 
                            onPress={handleTaoTaiKhoan}>
                            <Text style = {{fontSize : 30}}>Tạo tài khoản</Text>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#D82D8B',
            
        },
        text: {
            position : 'relative',
            top :'5%',
            left:'25%',
        },
        ip: {
            position:'relative',
            top: '7%',
            left:'5%',
            backgroundColor: '#ffff',
            marginTop : 30,
            width : '90%',
            height : '8%',
            textAlign : 'center',
            fontSize : 20,
            borderRadius:40 
        },
        dangki: {
            position:'relative',
            top :'13%',
            left : '27%',
            backgroundColor : 'pink',
            textAlign : 'center',
            width : '50%',
            height : '7%',
            alignItems : 'center',
            textAlign: 'center',
            justifyContent : 'center',
            borderRadius:30 
        }
    })
