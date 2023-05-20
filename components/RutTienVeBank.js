import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import {  ScrollView } from 'react-native';
import { collection, doc, getDoc, query, where, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { Bank } from '../LinhTinh/Banks';
export function RutTienVeBank({ route, navigation }) {

    const { SoTaiKhoan } = route.params; 

    //load tiền 
    const [Balance, setBalance] = useState(0);//tiền trong momo
    const [listBanks, setlistBanks] = useState([]);//list bank dùng để load bank
    const [selectBank,setselectBank] = useState(); //chọn ngân hàng để nạp lúc select
    const [WithDraw,setWithDraw] = useState();//tiền cần nạp vào momo
    const [BalanceOfBank,setBalanceOfBank] = useState();
    useEffect(() => {
        const LoadBankAndBalance = async () =>
        {
            const docRef = doc(db, SoTaiKhoan, "PersonalInformation"); //lấy doccumentID là PersonalInformation trong Collection SoTaiKhoan được lưu trong db
            const docSnap = await getDoc(docRef) // chứa thông tin cá nhân
            if (docSnap.exists()) {
                setBalance(docSnap.data().Balance);
            }
            else console.log("KHông tìm thấy document")

            //truy vấn lấy các ngân hàng
            const q = query(collection(db, SoTaiKhoan), where("Type", "==", "Bank"));
            const querySnapshot = await getDocs(q);
            let banks = []
            querySnapshot.forEach((doc) => {
                banks.push({
                    BankCode: doc.data().BankCode,
                    BankName: doc.data().BankName,
                    BankNumber: doc.data().BankNumber,
                    BankBalance: doc.data().BankBalance,
                    BankLogo: doc.data().BankLogo,
                    Type: "Bank"
                });
            });
            setlistBanks(banks);
        }
        LoadBankAndBalance();
    },[SoTaiKhoan,Balance])


    const [selectedBankIndex, setSelectedBankIndex] = useState(-1);//lưu vị trí index của bank trong list 
    //set index mỗi khi click vào bank
    const handleBankPress = async (index, BankCode,BankBalance) => {
        setSelectedBankIndex(index);
        setselectBank(BankCode);
        setBalanceOfBank(BankBalance);
    };

    const handleThemNganHang = () => {
        navigation.navigate('VCT', { SoTaiKhoan: SoTaiKhoan })
    }
    
    const handleNapTien = async () =>{
        if(WithDraw === '' || selectedBankIndex === -1) 
        {
            window.alert("Bạn chưa nhập số tiền hoặc chọn ngân hàng");
        }
        else{
            
            const BankAdd =  parseFloat(BalanceOfBank) + parseFloat(WithDraw);//tiền thêm vào bank
            if(WithDraw > Balance) window.alert("Bạn không đủ tiền"); //nếu mà tiền rút lớn hơn tiền trong momo
            else{
                const docRefBank = doc(db,SoTaiKhoan,selectBank) 
                await updateDoc(docRefBank,{
                    BankBalance : parseFloat(BankAdd)
                })
                setBalanceOfBank(BankAdd);
                setBalance(parseFloat(Balance) - parseFloat(WithDraw));
                const docRefInfo = doc(db,SoTaiKhoan,"PersonalInformation")
                await updateDoc(docRefInfo,{
                    Balance : parseFloat(Balance) - parseFloat(WithDraw)
                })
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>

           
            {/* phần chọn ngân hàng */}
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: '5%', marginTop: '5%' }}>Tài khoản / Thẻ</Text>
                <View style={styles.ChonNganHang}>
                    <ScrollView>
                        <View>
                            {
                                //mỗi lần click vào thì sẽ render lại và nó so sánh nếu index của cái nào === selectedBankIndex thì nó sẽ set style cho bank đó
                                listBanks.map((value, index) => {
                                    return (
                                        <Bank
                                            key={index}
                                            styleBank={[selectedBankIndex === index && styles.bankSelected,]}
                                            BankLogo={value.BankLogo}
                                            BankName={value.BankName}
                                            BankNumber={value.BankNumber}
                                            BankBalance = {value.BankBalance}
                                            onPress={() => handleBankPress(index, value.BankCode,value.BankBalance)}>
                                        </Bank>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.NapTien}>
                <Text style={styles.txt_NapTien}>Rút tiền</Text>
                <View style={styles.Vi}>
                    <Text style={{ textAlign: 'center' }}>Ví của tôi</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{parseFloat(Balance)?.toLocaleString('en-US') + 'đ'}</Text>
                </View>
                <View>
                    <TextInput keyboardType = 'numeric' placeholder='Nhập số tiền' style={styles.Ip_NhapTien} onChangeText={text => setWithDraw(text)}></TextInput>
                </View>
            </View>
            </View>

            {/* nút nạp tiền */}
            <View style={{ backgroundColor: '#cfcfcf' ,height : 70}}>
                <TouchableOpacity style={styles.btn_NapTien} onPress={handleNapTien}>
                    <Text style={styles.txt_btn_NapTien}>Rút tiền</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NapTien: {
        marginTop: '5%',
        height: 200,
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 20
    },

    txt_NapTien: {
        color: 'black',
        fontWeight: 'bold',
        margin: 20,
        fontSize: 15
    },

    Vi:
    {
        backgroundColor: 'pink',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        height: '30%',
        justifyContent: 'center'
    },

    Ip_NhapTien: {
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 10,
        marginHorizontal: 20,
        height: 50,
        corlor: 'white',
        fontSize: 20
    },

    btn_NapTien: {
        alignItems: 'center',
        height: 50,
        marginHorizontal: '2%',
        marginVertical: '2%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        justifyContent: 'center'
    },

    txt_btn_NapTien:
    {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'pink'
    },

    ChonNganHang:
    {
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: '5%',
        marginVertical: '5%',
        height: 80
    },

    btn_AddBank:
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 10,
        height: '40%'
    },

    bank: {
        borderColor: 'none',
    },
    bankSelected: {
        borderColor: 'pink',
        borderRadius: 10,
        borderWidth: 4
    },
});
