import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipaddress } from './ipaddress';


const Bottomsheet1 = ({onCancel}) => {
  

  
  const [name, setname] = useState('');
  const [errors, setErrors] = useState({});
  const [uid, setUid] = useState(null);

  const getid = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            setUid(value);
            console.log("UID retrieved and set:", value);
        } else {
            console.log('ID not found');
        }
    } catch (error) {
        console.log("Error retrieving UID:", error);
    }
};
useEffect(()=>{
    getid();
},[])
useEffect(() => {
    if (uid !== null) {
        console.log("add name page UID updated:", uid);
    }
}, [uid]);


  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      errors.name = "Please Enter Valid name !!!";
      valid = false;
    }
    // if (!pert) {
    //   errors.pert = "*";
    //   valid = false;
    // }

    // const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    // if (!date || !date.match(datePattern)) {
    //   errors.date = "*";
    //   valid = false;
    // }

    // const arr = ['Credit', 'credit', 'CREDIT', 'Debit', 'DEBIT', 'debit'];
    // if (!type || !arr.includes(type)) {
    //   errors.type = "*";
    //   valid = false;
    // }

    setErrors(errors);
    return valid;
  };

  const Add = async () => {
    // console.log('add')
    if (validate()) {
    const response = await fetch(`${ipaddress}/insert`, {

        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           name:name,
           u_id:uid
        }),
    });
    if (response.ok) {
        console.log('Name insert success');
        onCancel();
        
    } else {
        console.error('Failed to update cart:', response.statusText);
    }   
    }else {
        Alert.alert('Validation Error', 'Please fill all fields correctly.');
    }
  };

  return (
    <View style={styles.maincont}>
      <View style={styles.dialog}>
        <View style={styles.text}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Add Name</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ marginLeft: 10, marginTop: 5, color: 'black', fontWeight: 'bold' }}>Transaction date:</Text>
          
            <TextInput
              style={[styles.input, errors.name && { borderColor: 'red' }]}
              placeholder="Enter Name"
              value={name}
              onChangeText={setname}
              keyboardType="default"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%' }}>
            <Pressable style={styles.btn1} onPress={onCancel}>
              <Text style={{ color: '#6d21bf', fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.btn2} onPress={Add}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Bottomsheet1;

const styles = StyleSheet.create({
  maincont: {
    position: 'absolute',
    flex: 1,
    top:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  dialog: {
    height: '30%',
    width: '80%',
    backgroundColor: 'white'
  },
  text: {
    backgroundColor: '#6d21bf',
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    margin: 10,
    width: '90%'
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
   
    // margin:5,
    marginLeft:20,
    marginBottom:3
  },
  btn1: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    width: '40%',
    padding: 5,
    borderColor: '#6d21bf'
  },
  btn2: {
    borderRadius: 20,
    backgroundColor: '#6d21bf',
    borderWidth: 1,
    width: '40%',
    padding: 5
  },
});
