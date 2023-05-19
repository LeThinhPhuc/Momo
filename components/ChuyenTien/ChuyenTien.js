import { updateDoc } from 'firebase/firestore';
import React,{useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { collection, doc, getDoc, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';


const ChuyenTien = (route) => {
    const [mail,setMail]=useState();
    const [note,setNote]=useState();
    const [money, setMoney]=useState();
    const { SoTaiKhoan } = route?.params; 


    const handleChuyenTien= async ()=>{
       // window.alert("Bạn chưa nhập số tiền hoặc chọn ngân hàng");
       const gmailCollectionRef = collection(db, mail);
       const q = query(gmailCollectionRef, where('email', '==', mail));
        await updateDoc(q,{
            Balance: parseFloat(Balance)+parseFloat(money)
        })
       const docRefInfo = doc(db,SoTaiKhoan,"PersonalInformation")
       await updateDoc(docRefInfo,{
           Balance : parseFloat(Balance) - parseFloat(money)
       })
       setMail("")
       setNote("")
       setMoney("") 

    //    const transactionData = {
    //     // email: mail,
    //     // note: note,
    //     note :"Chuyen Tien",
    //     amount: parseFloat(money),
    //   };
    //   const docRefNote = doc(db,SoTaiKhoan,"transactions")
    //   try {
    //     const transactionDocRef = doc(db, 'transactions');
    //     await setDoc(transactionDocRef, transactionData);
    //     console.log('Transaction data saved successfully.');
    //     // Thực hiện các hành động khác sau khi lưu dữ liệu thành công
    //   } catch (error) {
    //     console.error('Error saving transaction data:', error);
    //   }
    //   const transactionData2 = {
    //     // email: mail,
    //     // note: note,
    //     note :"Cong vao tai khoan",
    //     amount: parseFloat(money),
    //   };
    //   const docRefNote2 = doc(db,SoTaiKhoan,"transactions")
  
    
    }
    return (
        <View style={{ position: "relative", height: "100%", width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative", marginBottom: 20, marginTop: 40 }}>
                <TextInput style={styles.input} onChangeText={(text)=>setMail(text)} />
                <Text style={{ fontSize: 15, position: "absolute", top: 1, left: "18%", backgroundColor: "#f1f5f9", fontWeight: "bold" }}>Email người nhận</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', marginBottom: 20, marginTop: 40 }}>
                <View style={{ borderWidth: 2, borderColor: "#D82D8B", justifyContent: "center", alignItems: 'center', marginBottom: 20, marginTop: 40, width: "80%" }}>
                    <TextInput  onChangeText={(text)=>setNote(text)} style={styles.input3} />
                    <Text style={{ fontSize: 15, position: "absolute", top: 1, left: "7%", backgroundColor: "#f1f5f9", fontWeight: "bold" }}>Lời nhắn</Text>

                    <TextInput onChangeText={(text)=>setMoney(text)} style={styles.input2} />
                    <Text style={{ fontSize: 15, position: "absolute", right: 8, bottom: 15, backgroundColor: "#f1f5f9", fontWeight: "bold", fontSize: 25 }}>đ</Text>


                </View>
            </View>
            <View style={{ position: "absolute", width: "100%", bottom: 0, height: 80, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#D82D8B" }}>
                <TouchableOpacity onPress={handleChuyenTien} style={{ borderRadius: 10, backgroundColor: "white", width: "90%" }}>
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