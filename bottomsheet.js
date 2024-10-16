import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ipaddress } from './ipaddress';


const Bottomsheet = ({ onCancel, id }) => {
  // console.log(id)


  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [amt, setAmt] = useState('');
  const [pert, setPert] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!amt) {
      errors.amt = "*";
      valid = false;
    }
    if (!pert) {
      errors.pert = "*";
      valid = false;
    }

    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!date || !date.match(datePattern)) {
      errors.date = "*";
      valid = false;
    }

    const arr = ['Credit', 'credit', 'CREDIT', 'Debit', 'DEBIT', 'debit'];
    if (!type || !arr.includes(type)) {
      errors.type = "*";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const Add = async () => {
    if (validate()) {
      const response = await fetch(`${ipaddress}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          t_date: date,
          t_type: type,
          t_amt: amt,
          t_particular: pert,
          name_id: id
        }),
      });
      if (response.ok) {
        console.log('Name insert success');
        setAmt('')
        setPert('')
        setDate('')
        setType('')
        onCancel();

      } else {
        console.error('Failed to update cart:', response.statusText);
      }
    } else {
      Alert.alert('Validation Error', 'Please fill all fields correctly.');
    }
  };

  return (
    <View style={styles.maincont}>
      <View style={styles.dialog}>
        <View style={styles.text}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Add Transaction</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ marginLeft: 10, marginTop: 5, color: 'black', fontWeight: 'bold' }}>Transaction date:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, errors.date && { borderColor: 'red' }]}
              placeholder="DD/MM/YYYY"
              value={date}
              onChangeText={setDate}
              keyboardType="default"
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          </View>

          <Text style={{ marginLeft: 10, marginTop: 5, color: 'black', fontWeight: 'bold' }}>Transaction type:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, errors.type && { borderColor: 'red' }]}
              placeholder="Enter Credit or Debit"
              value={type}
              onChangeText={setType}
              keyboardType="default"
            />
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, errors.amt && { borderColor: 'red' }]}
              placeholder="Enter Amount"
              value={amt}
              onChangeText={setAmt}
              keyboardType="numeric"
            />
            {errors.amt && <Text style={styles.errorText}>{errors.amt}</Text>}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, errors.pert && { borderColor: 'red' }]}
              placeholder="Enter Particular"
              value={pert}
              onChangeText={setPert}
              keyboardType="default"
            />
            {errors.pert && <Text style={styles.errorText}>{errors.pert}</Text>}
          </View>

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

export default Bottomsheet;

const styles = StyleSheet.create({
  maincont: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  dialog: {
    height: '60%',
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
    marginTop: 7,
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
