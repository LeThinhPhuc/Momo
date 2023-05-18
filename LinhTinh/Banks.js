import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FlatList  } from 'react-native';
import {RadioButton} from 'react-native-radio-buttons-group'

export const Bank = (props) =>{

    const {BankLogo} = props;
    const {BankName} = props;
    const {BankBalance} = props;
    const {styleBank} = props;
    return (
        <View style = {styleBank}>
            <TouchableOpacity onPress={props.onPress}>
                <View style = {styles.bank}>

                    <View style = {{marginLeft : 10}}>
                        <Image style = {{width : 40,height : 40}}
                                source={{uri : BankLogo}}>
                        </Image>
                    </View>

                    <View style ={{justifyContent : 'center',marginLeft : 10}}>
                        <Text>{BankName}</Text>
                    </View>

                    <View style = {{alignItems : 'flex-end' ,flex : 1,justifyContent : 'center' ,marginRight : 20}}>
                        <Text>{BankBalance.toLocaleString('en-US')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bank:{
        flexDirection : 'row'
    },
    radioButton:{
        width : 10,
        height : 10
    },
    Check :{
        flex : 1,
        alignItems : 'flex-end'
    },

    Selected:
    {
    }
})