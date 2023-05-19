import { useState, useEffect } from "react";
import React from "react";
import { doc, getDoc, query, collection, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from "../../config/firebaseconfig";
import { Modal, ScrollView, Text, View, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Button } from "react-native";
import { Bank } from "../../LinhTinh/Banks";
const MyWallet = ({ route }) => {
    const { SoTaiKhoan } = route.params;
    const [counter, setCounter] = useState(0);
    const [listBanks, setlistBanks] = useState([]);//list bank dùng để load bank
    const [TenKhachhang, setTenKhachHang] = useState();
    const [BankNumber, setBankNumber] = useState();
    const [BankCode, setBankCode] = useState('VCB');
    const [BankLogo, setBankLogo] = useState('https://atc-edge32.mservice.com.vn/momo_app_v2/img/VCB.png');
    const [BankName, setBankName] = useState('Vietcombank');
    console.log(BankCode + " " + BankLogo + " " + BankName + " " + BankNumber); 
    const handleAddBank = async () => {
        if (BankNumber == undefined) window.alert("Bạn chưa nhập số tài khoản");
        else {
            try {
                const checkExist = doc(db, SoTaiKhoan, BankCode);
                const docSnapshot = await getDoc(checkExist);
                if (docSnapshot.exists()) {
                    window.alert("Ngân hàng đã thêm trước đó")
                }
                else {
                    const  listtemp = listBanks;
                    let addBank = {
                        BankBalance: 1000000,
                        BankCode: BankCode,
                        BankLogo: BankLogo,
                        BankName: BankName,
                        BankNumber: BankNumber,
                        Type: "Bank"
                    };
                    listtemp.push(addBank);
                    const docRef = await setDoc(doc(db, SoTaiKhoan, BankCode), addBank);
                    window.alert("Thêm ngân hàng thành công");
                    setlistBanks(listtemp);
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        setCounter(counter + 1); 
    }
    useEffect(async () => {
        const docRef = doc(db, SoTaiKhoan, "PersonalInformation"); //lấy doccumentID là PersonalInformation trong Collection SoTaiKhoan được lưu trong db
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setTenKhachHang(docSnap.data().FullName);
        }
        else console.log("KHông tìm thấy document")

        //load ngân hàng
        const LoadBankAndBalance = async () => {
            //truy vấn lấy các ngân hàng
            const q = query(collection(db, SoTaiKhoan), where("Type", "==", "Bank"));
            const querySnapshot = await getDocs(q);
            let banks = []
            querySnapshot.forEach((doc) => {
                banks.push({
                    BankName: doc.data().BankName,
                    BankLogo: doc.data().BankLogo,
                    BankBlance: doc.data().BankBlance,
                    BankNumber: doc.data().BankNumber,
                    Type: "Bank"
                });
            });
            setlistBanks(banks);
        }
        LoadBankAndBalance();

    }, [SoTaiKhoan])
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        { id: 0, Code: "VCB", key: 'Vietcombank', photo: "https://atc-edge32.mservice.com.vn/momo_app_v2/img/VCB.png" },
        { id: 1, Code: "BIDV", key: 'BIDV', photo: "https://atc-edge09.mservice.com.vn/momo_app_v2/img/BIDV.png" },
        { id: 2, Code: "VARB", key: 'AgriBank', photo: "https://atc-edge14.mservice.com.vn/momo_app_v2/img/VARB.png" },
        { id: 3, Code: "STB", key: 'Sacombank', photo: "https://atc-edge18.mservice.com.vn/momo_app_v2/img/STB.png" },
        { id: 4, Code: "TPB", key: 'TPBank', photo: "https://atc-edge23.mservice.com.vn/momo_app_v2/img/TPB.png" },
        { id: 5, Code: "CTG", key: 'Vietinbank', photo: "https://atc-edge19.mservice.com.vn/momo_app_v2/img/CTG.png" },
        { id: 6, Code: "TCB", key: 'Techcombank', photo: "https://atc-edge02.mservice.com.vn/momo_app_v2/img/TCB.png" },
        { id: 7, Code: "SCB", key: 'SCB', photo: "https://atc-edge29.mservice.com.vn/momo_app_v2/img/SCB.png" },
        { id: 8, Code: "HDB", key: 'HDBank', photo: "https://atc-edge34.mservice.com.vn/momo_app_v2/img/HDB.png" },
        { id: 9, Code: "ACB", key: 'ACB', photo: "https://atc-edge22.mservice.com.vn/momo_app_v2/img/ACB.png" },
    ];
    const [bank, setBank] = useState(data[0].key);
    const [pho, setPho] = useState(data[0].photo);
    //   const onHandleItemClick = (val) => {
    //     setModalVisible(false);
    //     setBank(data[val].key);
    //     setPho(data[val].photo);
    //   };
    const renderItem = ({ item }) => {
        const handleItemClick = () => {
            setModalVisible(false);
            setBank(item.key);
            setPho(item.photo);
            setBankCode(item.Code),
                setBankLogo(item.photo),
                setBankName(item.key),
                setBankNumber(BankNumber);

        };

        return (
            <TouchableOpacity onPress={handleItemClick} style={styles.itemContainer}>
                <Image source={{ uri: item.photo }} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.key}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ height: "100%", position: "relative" }}>
            {/* <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#D82D8B", marginBottom: 20 }}>
                <Text style={{ height: 70, fontWeight: "bold", fontSize: 18, color: "white", paddingTop: 35 }}>Ví của tôi</Text>
            </View> */}
            <View style={{ flexDirection: "row", alignItems: "center", height: 90, padding: 20, backgroundColor: "#e8ebeb", marginLeft: 30, marginRight: 30, marginBottom: 20, borderRadius: 10, marginTop: 20 }}>
                <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: "#FFD6E7",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {/* <Text style={{ fontSize: 18 }}>{TenKhachhang.split(" ").reduce((acc, cur) => {
                        // console.log("cur", cur);
                        if (cur == "") return acc;
                        else return (acc += cur[0]);
                    }, "")}</Text> */}
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{TenKhachhang}</Text>
                    <Text>{SoTaiKhoan}</Text>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative", marginBottom: 10 }}>
                <TextInput style={styles.input} />
                <Text style={{ fontSize: 15, position: "absolute", top: 1, left: "18%", backgroundColor: "#f1f5f9", fontWeight: "bold" }}>Họ và tên</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative" }}>
                <TextInput keyboardType='numeric' style={styles.input} onChangeText={text => setBankNumber(text)} />
                <Text style={{ fontSize: 15, position: "absolute", top: 1, left: "18%", backgroundColor: "white", fontWeight: "bold" }}>Số tài khoản</Text>
            </View>
            <View style={{ bottom: 10, width: "100%", position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <View style={{ width: "35%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#D82D8B", borderRadius: 10 }} onPress={handleAddBank}>
                        <Text style={{ color: "white", textAlign: "center", lineHeight: 50, fontSize: 18, fontWeight: "bold" }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 20, width: "35%", backgroundColor: "#e8ebeb", borderRadius: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", lineHeight: 50 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={{ color: "#D82D8B", fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 5, marginLeft: 50 }}>Ngân Hàng</Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "70%", flexDirection: "row", alignItems: "center", height: 70, padding: 20, marginBottom: 20, borderRadius: 10, borderWidth: 2, borderColor: "#FFD6E7" }}>
                    <Image source={{ uri: `${pho}` }} style={{ width: 50, height: 50 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text onPress={() => setModalVisible(true)} style={{ color: "#D82D8B", fontSize: 18, fontWeight: "bold" }}>{bank}</Text>
                    </View>
                </View>
            </View>
            {/* các ngân hàng đã liên kết  */}
            <Text style={{ color: "#D82D8B", fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 5, marginLeft: 50 }}>Các ngân hàng đã liên kết</Text>
            <View >
                <View style={styles.ChonNganHang}>
                    <ScrollView>
                        <View>
                            {
                                listBanks.map((value) => {
                                    return (
                                        <Bank
                                            BankLogo={value.BankLogo}
                                            BankName={value.BankName}>
                                        </Bank>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select Bank</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.flatlistContainer}
                    />
                </View>
                <Button title="Close Modal" onPress={() => setModalVisible(false)} />
            </Modal>
        </View>
    );
};
export default MyWallet;
const styles = StyleSheet.create({
    contain: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginLeft: "30%",
        marginRight: "30%",
    }
    ,
    select: {
        width: "70%",
        height: 40,
    },
    input: {
        width: "70%",
        height: 50,
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 19,
        borderColor: "#FFD6E7",
    },

    image: {
        width: 3,
        height: 3,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // borderBottomColor: "black",
        // borderBottomWidth:1,
        backgroundColor: "#e8ebeb",
        // borderTopRightRadius:10,
        // borderTopLeftRadius:10,
        borderRadius: 10,
        marginBottom: 20
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    flatlistContainer: {
        flexGrow: 1,
    },
    ChonNganHang:
    {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: '15%',
        height: 80
    }
});