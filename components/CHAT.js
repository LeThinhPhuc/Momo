import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
export const CHAT = ({navigation}) =>{
  
  return(
    <View style={{justifyContent:"center",alignItems:"center", height:"100%"}}>
      <Text style={{ fontWeight:"bold", fontSize:40, color:"green"}}>
        UPDATE IN THE FUTURE
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  wrapper: {
    paddingBottom: 10,
  }
});