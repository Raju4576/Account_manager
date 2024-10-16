import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
const Login = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [q1, setq1] = useState('');
    const [q2, setq2] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        var valid = true;
        let errors = {};

        if (!q1) {
            errors.q1 = "*";
            valid = false
        }
        if (!q2) {
            errors.q2 = "*";
            valid = false
        }
        if (!password || password.length < 4) {
            errors.password = "Password must be at least 4 characters";
            valid = false;
        }
        setErrors(errors);
        return valid;
    }

    const loginpress = () => {
        if (validate()) {
            console.log('Success');
            setPassword('');
            setq1('');
            setq2('');
        }
    }

    return (
        <>
            <View style={styles.maincont}>
                <View style={styles.box}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.txt1}>Enter Detail</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text>Set Password</Text>
                        <TextInput
                            style={[styles.input, errors.password && { borderColor: 'red' }]}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    </View>

                    <View style={styles.row}>
                        <Image source={require('./image/cir.jpg')} style={{ height: 20, width: 20, marginRight: 5 }}></Image>
                        <Text>Enter The Answer for retriving your password when you forgot.</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text>What is your first phone.</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input, errors.q1 && { borderColor: 'red' }]}
                                placeholder="Enter Answer"
                                value={q1}
                                onChangeText={setq1}
                            />
                            {errors.q1 && <Text style={styles.errorText}>{errors.q1}</Text>}
                        </View>

                    </View>


                    <View style={styles.col1}>
                        <Text>Enter Your Country name.</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input, errors.q1 && { borderColor: 'red' }]}
                                placeholder="Enter Answer"
                                value={q2}
                                onChangeText={setq2}
                            />
                            {errors.q2 && <Text style={styles.errorText}>{errors.q2}</Text>}
                        </View>

                    </View>
                    <View style={styles.row1}>
                        <Pressable style={styles.btn1} onPress={()=>navigation.navigate('pert')}>
                            <Text style={{ color: '#6d21bf', fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Exit</Text>
                        </Pressable>
                        <Pressable style={styles.btn2} onPress={loginpress}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Set</Text>
                        </Pressable>
                    </View>

                </View>

            </View>
        </>
    )

}
export default Login;

const styles = StyleSheet.create({

    maincont: {
        flex: 1,
        // backgroundColor: '#6d21bf',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        height: '70%',
        width: "90%",
        backgroundColor: 'white',
        padding: 10,
        shadowColor: 'red',
        // shadowOffset: { width: 0, height: 2 },  
        // shadowOpacity: 1, 
        // shadowRadius: 5,  
        elevation: 20,
    },
    txt1: {
        backgroundColor: '#6d21bf',
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        margin: 10,
        width: '100%'
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
    col: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor:'grey',
        padding: 5
    },
    col1: {
        flexDirection: 'column',
        // alignItems:'center',
        // backgroundColor:'grey',
        padding: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'grey',
        padding: 5
    },
    row1: {
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between'
    },
    input: {
        color: 'black',
        width: '95%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 5,
        alignSelf: 'center'
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 5,
    },

})