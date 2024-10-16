import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Razorpay = () => {

    const payNowBtnClick = ()=>{
        let options = {
            description: 'Credits towards consultation',
            image: require('./image/u.png'), //require('../../images.png')
            currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
            key: 'rzp_test_KW4pxYgx85PfXU',
            amount: '5000',
            name: 'Acme Corp',
            order_id: 'order_P3EJexZGGo7eiv', //Replace this with an order_id(response.data.orderId) created using Orders API.
            prefill: {
              email: 'malaviyagaurav879@gmail.com',
              contact: '8200491979',
              name: 'Gaurav',
            }, //if prefill is not provided then on razorpay screen it has to be manually entered.
            theme: {color: '#53a20e'},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
    }

    return (
        <View>
            <Text>Took to rx</Text>
            <Button onPress={payNowBtnClick} title='Pay out this'></Button>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Razorpay;