import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export const MOMO = ({navigation}) =>{
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const amount = '100,000'; // Số tiền hiển thị
  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_email}>
          <Text style={styles.email}>
            account_name@gmail.com
          </Text>
          
        </View>
        <TouchableOpacity>
          <Image style={styles.bell} source={require('../src/image/bell.png')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.b_account} source={require('../src/image/basic_account.png')}/>
        </TouchableOpacity>
        
      </View>
      <View style={styles.body}>
        <View style={styles.features}>
          <TouchableOpacity>
            <Image source={require('../src/image/24_navigation_cash_in.png')} style={{tintColor: '#D82D8B', height: 100, width: 100, }}/>
            <Text style={styles.font_feature}>{'Nạp tiền\nvào ví'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../src/image/bank.png')} style={styles.features_icon}/>
            <Text style={styles.font_feature}>{'Chuyển tiền\nngân hàng'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../src/image/smartphone.png')} style={styles.features_icon}/>
            <Text style={styles.font_feature}>{'Nạp tiền\nđiện thoại'}</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.amount_money}>

          <TouchableOpacity onPress={toggleAmountVisibility}>
            <Ionicons style={styles.eye} name={isAmountVisible ? 'eye' : 'eye-off'} size={40}/>
          </TouchableOpacity>
          <Text style={styles.amount}>{isAmountVisible ? amount +'đ' : '*********'}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#3c5b49',
    padding: 8,
  },
  header_email: {
    width: '70%',
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  email: {
    color: 'white',
  },
  header: {  
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bell: {
    height: 34,
    width: 34,
    padding: 8, 
    backgroundColor: 'rgba(0,0,0, 0.6)',
    borderRadius: 13,
    left: 20,
    
  },
  b_account: {
    height: 34,
    width: 34,
    padding: 8, 
    backgroundColor: 'rgba(0,0,0, 0.6)',
    borderRadius: 13,
  },
  amount_money: {
    flexDirection: 'row',
    top: 60,
  },
  amount: {
    fontSize: 40,
    left: 20,
  },
  eye:{
    top: 5,
    left: 10,
  },
  body: {
    top: 20,
    backgroundColor: '#e0e0e1',
    borderRadius: 15,
    paddingBottom: '20%',
    flexDirection: 'column',
  },
  features: {
    flexDirection: 'row',
    top: 20,
    left: 5,
    justifyContent: 'space-around',
  },
  features_icon: {
    height: 100,
    width: 100,
  },
  font_feature: {
    fontSize: 20,
  }
});