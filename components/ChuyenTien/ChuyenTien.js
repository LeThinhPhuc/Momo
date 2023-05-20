import { Firestore, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { collection, doc, getDoc, query, where, getDocs, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';


const ChuyenTien = ({route}) => {
    const [mail,setMail]=useState();
    const [note,setNote]=useState();
    const [money, setMoney]=useState(0);
    const { SoTaiKhoan } = route?.params; 
    const [Balance, setBalance]=useState(0);
    const [Balance2, setBalance2]=useState(0);
    useEffect(() => {
        const LoadBalance = async () =>
        {
            const docRef = doc(db, SoTaiKhoan, "PersonalInformation"); //lấy doccumentID là PersonalInformation trong Collection SoTaiKhoan được lưu trong db
            const docSnap = await getDoc(docRef) // chứa thông tin cá nhân
            if (docSnap.exists()) {
                setBalance2(docSnap.data().Balance);
            }
            else console.log("KHông tìm thấy document")

    const gmailCollectionRef = doc(db, mail,"PersonalInformation");

    const docSnap2 = await getDoc(gmailCollectionRef) // chứa thông tin cá nhân
    if (docSnap2.exists()) {
        setBalance(docSnap2.data().Balance);
    }
    else console.log("KHông tìm thấy document")

        }
        LoadBalance();
    },[SoTaiKhoan,Balance, Balance2,mail])

    const handleChuyenTien = async () => {
        console.log(mail + " và " + SoTaiKhoan);
        const currentTime= new Date();
        const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentTime.getDate()).padStart(2, '0');
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');

  // Tạo chuỗi đại diện cho thời gian
  const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        const gmailCollectionRef = doc(db, mail, "PersonalInformation");
        const docRefInfo = doc(db, SoTaiKhoan, "PersonalInformation");
      
        // Lấy giá trị mới của Balance và Balance2
        const newBalance = parseFloat(Balance) + parseFloat(money);
        const newBalance2 = parseFloat(Balance2) - parseFloat(money);
      
        // Cập nhật giá trị mới vào Firestore
        await updateDoc(gmailCollectionRef, {
          Balance: newBalance
        });
        await updateDoc(docRefInfo, {
          Balance: newBalance2
        });
        const transaction = {
            noidung: "Chuyen tien vao tai khoan "+mail,
            note: note,
            chenhLech: "-"+parseFloat(money)+"đ",
            thoiGian:timestamp,
          };
        
          // Lưu giao dịch vào lịch sử trong tài liệu
          await updateDoc(docRefInfo, {
            transactionHistory: arrayUnion(transaction),
          });
          const transaction2 = {
            noidung: "Nhan tien chuyen khoan tu " +SoTaiKhoan,
            note: note,
            chenhLech: "+"+parseFloat(money)+"đ",
            thoiGian:timestamp,

          };
        
          // Lưu giao dịch vào lịch sử trong tài liệu
          await updateDoc(gmailCollectionRef, {
            transactionHistory: arrayUnion(transaction2),
          });
        // Cập nhật giá trị mới cho state
        setBalance(newBalance);
        setBalance2(newBalance2);
      
        setMail('');
        setNote('');
        setMoney('');
      };
      
    return (
        <View style={{ position: "relative", height: "100%", width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative", marginBottom: 20, marginTop: 40 }}>
                <TextInput value={mail} style={styles.input} onChangeText={(text)=>setMail(text)} />
                <Text style={{ fontSize: 15, position: "absolute", top: 1, left: "18%", backgroundColor: "#f1f5f9", fontWeight: "bold" }}>Số điện thoại người nhận</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', marginBottom: 20, marginTop: 40 }}>
                <View style={{ borderWidth: 2, borderColor: "#D82D8B", justifyContent: "center", alignItems: 'center', marginBottom: 20, marginTop: 40, width: "80%" }}>
                    <TextInput  onChangeText={(text)=>setNote(text)} style={styles.input3} />
                    <Text value={note} style={{ fontSize: 15, position: "absolute", top: 1, left: "7%", backgroundColor: "#f1f5f9", fontWeight: "bold" }}>Lời nhắn</Text>

                    <TextInput value={money} onChangeText={(text)=>setMoney(text)} style={styles.input2} />
                    <Text style={{ fontSize: 15, position: "absolute", right: 8, bottom: 15, backgroundColor: "#f1f5f9", fontWeight: "bold", fontSize: 25 }}>đ</Text>


                </View>
            </View>
            <View style={{ position: "absolute", width: "100%", bottom: 0, height: 80, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#D82D8B" }}>
                <TouchableOpacity onPress={handleChuyenTien}  style={{ borderRadius: 10, backgroundColor: "white", width: "90%" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", lineHeight: 50 }}>Chuyển tiền</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}








export default ChuyenTien;
const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: 70,
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 19,
        borderColor: "#D82D8B",
    },
    input2: {
        position: "relative",
        width: "95%",
        height: 50,
        margin: 12,
        borderBottomWidth: 3,
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#D82D8B",
        padding: 5,
        fontWeight: "bold",
        fontSize: 20,
    },
    input3: {
        position: "relative",
        width: "95%",
        height: 70,
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 19,
        borderColor: "#D82D8B",
    },

})