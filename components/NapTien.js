import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FlatList ,ScrollView} from 'react-native';
import {Bank} from '../component/Banks'
import {RadioButton,RadioGroup} from 'react-native-radio-buttons-group'

export function NapTien({ route, navigation }) {

    const [selectedBankIndex, setSelectedBankIndex] = useState(-1);//lưu vị trí index của bank trong list 
    //set index mỗi khi click vào bank
    const handleBankPress = (index,ac) => {
        setSelectedBankIndex(index);
      };

    const listBanks = [
        {
            ac : '11223344556',
            name: "VietcomBank",
            bankLogoUrl: "https://img.mservice.com.vn/momo_app_v2/img/VCB.png"
        },


        {
            ac : '798987987987',
            name: "VietinBank",
            bankLogoUrl: "https://img.mservice.com.vn/momo_app_v2/img/CTG.png"
        },

        {
            ac : '897997997979',
            name: "Techcombank",
            bankLogoUrl: "https://img.mservice.com.vn/momo_app_v2/img/TCB.png"
        },

        {
            ac : '433551998889',
            name: "BIDV",
            bankLogoUrl: "https://img.mservice.com.vn/momo_app_v2/img/BIDV.png"
        },
        
        {
            ac : '56565656565656',
            name: "AgriBank",
            bankLogoUrl: "https://img.mservice.com.vn/momo_app_v2/img/VARB.png"
        }
    ]

    const [ListBanks,setListBanks] = useState([]);

    return (
        <View style = {{flex : 1 }}>
        
            {/* phần nạp tiền */}
            <View  style = {styles.NapTien}>
                <Text style = {styles.txt_NapTien}>Nạp tiền vào</Text>
                <View style = {styles.Vi}>
                    <Text style = {{textAlign : 'center'}}>Ví của tôi</Text>
                    <Text style = {{fontSize : 20 ,fontWeight : 'bold',textAlign : 'center'}}>đ</Text>
                </View>
                <View>
                <TextInput placeholder='Nhập số tiền' style = {styles.Ip_NhapTien}></TextInput>
                </View>
            </View>

            {/* phần chọn ngân hàng */}
            <View style = {{flex : 1}}>
                <Text style = {{fontWeight : 'bold',fontSize : 20,marginLeft : '5%',marginTop : '5%'}}>Tài khoản / Thẻ</Text>
                <View style = {styles.ChonNganHang}>
                    <ScrollView>
                        <View>
                        {
                            //mỗi lần click vào thì sẽ render lại và nó so sánh nếu index của cái nào === selectedBankIndex thì nó sẽ set style cho bank đó
                            listBanks.map((value,index) =>{
                                return (
                                    <Bank 
                                        key = {index}
                                        styleBank = {[selectedBankIndex === index && styles.bankSelected,]}
                                        icon = {value.bankLogoUrl}
                                        name = {value.name}
                                        accountnumber ={value.ac}
                                        onPress={() => handleBankPress(index,value.ac)}>    
                                    </Bank>
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                </View>

                <View >
                    <TouchableOpacity style = {styles.btn_AddBank}>
                        <Image style = {{width : 40,height : 40,borderRadius : 10}}
                                source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUMxquZnCX0lloZnf_aiWIKd_plg0KcOtrnQ&usqp=CAU"}}>
                        </Image>
                        <View>
                            <Text style = {{fontWeight : 'bold',fontSize : 15}}>Thêm ngân hàng</Text>
                            <Text>Miễn phí nạp,rút tiền</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* nút nạp tiền */}
            <View style = {{backgroundColor : '#cfcfcf'}}>
                <TouchableOpacity style = {styles.btn_NapTien}>
                    <Text style = {styles.txt_btn_NapTien} >Nạp tiền</Text>
                </TouchableOpacity>
            </View>
    
        </View>
    );
}

const styles = StyleSheet.create({
    NapTien:{
        marginTop : '5%',
        height : 200,
        marginHorizontal : '5%',
        backgroundColor : 'white',
        borderRadius : 20
    },

    txt_NapTien :{
        color : 'black',
        fontWeight : 'bold',
        margin : 20,
        fontSize : 15
    },

    Vi : 
    {
        backgroundColor : 'pink',
        marginHorizontal : 20,
        marginBottom : 20,
        borderRadius : 20,
        height : '30%',
        justifyContent : 'center'
    },

    Ip_NhapTien:{
        borderWidth : 1,
        borderColor : 'pink',
        borderRadius : 10,
        marginHorizontal : 20,
        height : 50,
        corlor : 'white',
        fontSize : 20
    },

    btn_NapTien:{
        alignItems :'center',
        height : 50,
        marginHorizontal : '2%',
        marginVertical : '2%',
        backgroundColor : '#f9f9f9',
        borderRadius : 10,
        justifyContent : 'center'
    },

    txt_btn_NapTien :
    {
        fontWeight : 'bold',
        fontSize : 20,
        color : 'pink'
    },

    ChonNganHang :
    {
        backgroundColor : 'white',
        borderRadius : 20,
        marginHorizontal : '5%',
        marginVertical : '5%',
        height : '42%'
    },

    btn_AddBank :
    {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        marginHorizontal : '5%',
        borderRadius : 10,
        height : '40%'
    },

    bank: {
        borderColor: 'none',
      },
    bankSelected: {
        borderColor: 'pink',
        borderRadius : 10,
        borderWidth : 4
      },
    
});
