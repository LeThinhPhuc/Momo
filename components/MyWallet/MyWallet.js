import { useState } from "react";
import React from "react";
import {Modal,ScrollView, Text, View, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Button } from "react-native";
const MyWallet = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        {id:0, key: 'Vietcombank', photo: "https://atc-edge32.mservice.com.vn/momo_app_v2/img/VCB.png" },
        {id:1, key: 'BIDV', photo: "https://atc-edge09.mservice.com.vn/momo_app_v2/img/BIDV.png" },
        {id:2, key: 'AgriBank', photo: "https://atc-edge14.mservice.com.vn/momo_app_v2/img/VARB.png" },
        {id:3, key:'Sacombank', photo: "https://atc-edge18.mservice.com.vn/momo_app_v2/img/STB.png"},
        {id:4, key: 'TPBank', photo: "https://atc-edge23.mservice.com.vn/momo_app_v2/img/TPB.png" },
        {id:5, key:'Vietinbank', photo: "https://atc-edge19.mservice.com.vn/momo_app_v2/img/CTG.png"},
        {id:6, key:'Techcombank', photo: "https://atc-edge02.mservice.com.vn/momo_app_v2/img/TCB.png"},
        {id:7, key:'SCB', photo: "https://atc-edge29.mservice.com.vn/momo_app_v2/img/SCB.png"},
        {id:8, key:'HDBank', photo: "https://atc-edge34.mservice.com.vn/momo_app_v2/img/HDB.png"},
        {id:9, key: 'ACB', photo: "https://atc-edge22.mservice.com.vn/momo_app_v2/img/ACB.png" },
    ];
      const [bank,setBank]=useState(data[0].key);
      const [pho,setPho]=useState(data[0].photo);
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
            <View style={{ flexDirection: "row", alignItems: "center", height: 90, padding: 20, backgroundColor: "#e8ebeb", marginLeft: 30, marginRight: 30, marginBottom: 35, borderRadius: 10, marginTop:20 }}>
                <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: "#FFD6E7",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Text style={{ fontSize: 18 }}>{"Le Thinh Phuc".split(" ").reduce((acc, cur) => {
                // console.log("cur", cur);
                if (cur == "") return acc;
                else return (acc += cur[0]);
              }, "")}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Lê Thịnh Phúc</Text>
                    <Text >0812739563</Text>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative" , marginBottom:20}}>
                <TextInput style={styles.input} />
                <Text style={{fontSize:15, position: "absolute", top: 1, left: "18%", backgroundColor: "white", fontWeight:"bold" }}>Họ và tên</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', position: "relative" }}>
                <TextInput style={styles.input} />
                <Text style={{fontSize:15, position: "absolute", top: 1, left: "18%", backgroundColor: "white", fontWeight:"bold" }}>Số tài khoản</Text>
            </View>
            <View style={{ bottom: 35, width: "100%", position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <View style={{ width: "35%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#D82D8B", borderRadius: 10 }}>
                        <Text style={{ color: "white", textAlign: "center", lineHeight: 70, fontSize: 18, fontWeight: "bold" }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 20, width: "35%", backgroundColor: "#e8ebeb", borderRadius: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", lineHeight: 70 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{color:"#D82D8B", fontSize: 18, fontWeight: "bold", marginBottom:10,marginTop:25, marginLeft:50 }}>Ngân Hàng</Text>
            <View   style={{alignItems:"center", justifyContent:"center"}}>
            <View   style={{width:"70%", flexDirection: "row", alignItems: "center", height: 70, padding: 20, marginBottom: 20, borderRadius: 10,borderWidth: 2,borderColor: "#FFD6E7"  }}>
                <Image  source={{ uri: `${pho}` }} style={{ width: 50, height: 50 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text onPress={() => setModalVisible(true)}  style={{color:"#D82D8B", fontSize: 18, fontWeight: "bold" }}>{bank}</Text>
                </View>
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
        height: 70,
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
        backgroundColor:"#e8ebeb",
        // borderTopRightRadius:10,
        // borderTopLeftRadius:10,
        borderRadius:10,
        marginBottom:20
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
    
});