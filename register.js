import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ipaddress } from "./ipaddress";

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = "Username is required";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Enter a valid email address";
            valid = false;
        }

        if (!password || password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobile || !mobileRegex.test(mobile)) {
            errors.mobile = "Enter a valid 10-digit mobile number";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleRegister = () => {
        if (validate()) {
            // Perform the registration logic
            console.log('Registration Successful');
            // Reset form and navigate to login
            setUsername('');
            setEmail('');
            setPassword('');
            setMobile('');

            fetch(ipaddress+'/register', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "name":username ,
                  "email": email,
                  "password":password.toString()
                }),
              });

            navigation.navigate('login');

        }
    };

    return (
        <>
            <View style={styles.maincont}>
                <View style={styles.minicont}>
                    <Text style={styles.logintxt}>Register</Text>

                    <TextInput
                        style={[styles.input, errors.username && { borderColor: 'red' }]}
                        placeholder="Enter Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                    <TextInput
                        style={[styles.input, errors.email && { borderColor: 'red' }]}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TextInput
                        style={[styles.input, errors.password && { borderColor: 'red' }]}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TextInput
                        style={[styles.input, errors.mobile && { borderColor: 'red' }]}
                        placeholder="Enter Mobile"
                        keyboardType="numeric"
                        value={mobile}
                        onChangeText={setMobile}
                    />
                    {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

                    <Pressable style={styles.loginbtn} onPress={handleRegister}>
                        <Text style={styles.txtloginbtn}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('login')} style={styles.btncont}>
                        <Text style={styles.signuptxt}>Already have an account? Login</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Register;

const styles = StyleSheet.create({
    maincont: {
        flex: 1,
        backgroundColor: '#4d6285',
        justifyContent: 'center',
        alignItems: 'center',
    },
    minicont: {
        backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    logintxt: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50
    },
    input: {
        borderWidth: 1,
        padding: 10,
        width: '100%',
        marginTop: 20,
        borderColor: '#ccc',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 5,
    },
    loginbtn: {
        width: '100%',
        backgroundColor: 'orange',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    txtloginbtn: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    signuptxt: {
        marginTop: 10,
        color: 'blue',
        marginBottom: 70
    },
    btncont: {
        marginTop: 10
    },
});
