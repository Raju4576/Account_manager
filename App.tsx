import React from "react";
import { Text } from "react-native";
import Home from "./home";
import Perti from "./perticular";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bottomsheet from "./bottomsheet";
import Login from "./login";
import Register from "./register";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
          {/* <Stack.Screen name="register" component={Register} /> */}
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="pert" component={Perti} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Login></Login> */}
      {/* <Razorpay></Razorpay> */}
      {/* <Home></Home> */}
      {/* <Perti></Perti> */}
    

    </>
  )
}
export default App