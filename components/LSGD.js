import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { collection, doc, getDoc, query, where, getDocs, setDoc, arrayUnion, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

export const LSGD = ({ navigation, route }) => {
  const { SoTaiKhoan } = route?.params;
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const docRef = doc(db, SoTaiKhoan, "PersonalInformation");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data && data.transactionHistory) {
        setHistoryTransactions(data.transactionHistory);
      }
      setIsLoading(false);
    };

    fetchTransactionHistory();
  }, [SoTaiKhoan]);

  console.log("historyTransactions:", historyTransactions);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleReload = async () => {
    setIsLoading(true); // Set loading state to true before fetching data

    try {
      const docRef = doc(db, SoTaiKhoan, "PersonalInformation");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data && data.transactionHistory) {
        setHistoryTransactions(data.transactionHistory);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }

    setIsLoading(false); // Set loading state to false after fetching data
  };

  return (
      <View style={styles.container}>
      <View style={{alignItems:"center", justifyContent:"center"}}>
      <View style={{ marginTop: 5,flexDirection:"row", alignItems: "center", justifyContent: "center", width:"80%" }}>
          <TextInput onChangeText={(text) => setSearch(text)} placeholder='Tìm Kiếm ...' style={{ borderRadius: 10, padding: 10, width: "80%", backgroundColor: "white" }}></TextInput>
          <TouchableOpacity style={styles.btn_reload} onPress={handleReload}>
  
          <Text style={{fontWeight:"bold"}}>Reload</Text>
        </TouchableOpacity>
        </View>
       
      </View>
    <ScrollView style={{height:"90%"}}>

        {historyTransactions
          .filter((transaction) => {
            return transaction?.note?.toLowerCase().includes(search?.toLowerCase());
          })
          .map((transaction, index) => {
            console.log(transaction?.thoiGian)
            return (
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }} key={index}>
                <Text>{transaction?.thoiGian}</Text>
                <View style={{ backgroundColor: "white", padding: 11, borderRadius: 10, width: "70%" }}>
                  <Text style={{ fontWeight: "bold" }}>Nội Dung : </Text>
                  <Text>{transaction.noidung}</Text>
                  {transaction.note == "" ? ("") : (<View>
                    <Text style={{ fontWeight: "bold" }}>Ghi Chú : </Text>
                    <Text>{transaction.note}</Text></View>)}
                  <Text style={{ fontWeight: "bold" }}>Tiền : </Text>

                  {transaction.chenhLech[0] == "+" ?
                    <Text style={{ color: "green", fontSize: 20 }}>{transaction.chenhLech}</Text>
                    :
                    <Text style={{ color: "red", fontSize: 20 }}>{transaction.chenhLech}</Text>

                  }
                </View>
              </View>
            )
          })}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  paragraph: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  wrapper: {
    paddingBottom: 10,
  },
  btn_reload :{
		width : 50,
		height : 50 ,
		backgroundColor : '#D82D8B',
		justifyContent :'center',
		alignItems : 'center',
		marginLeft : 40,
		borderRadius : 10,

	}
});
