import React from "react";
import {View, Text, SafeAreaView,  Alert} from "react-native";
import Colors from "../constants/Colors"
import CustomButton from "./../components/CustomButton";
import CustomInput from "./../components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { API_BASE_URL } from './../../apiConfig';

export default function Login() {
  const navigation = useNavigation();

  const [inputs, setInputs] = React.useState({email: "", password: ""});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    setLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });
  
      const data = await response.json();
      console.log(data)
      setLoading(false);

      if (data.success) {
        const token = data.data.token;
        console.log(token);

        await AsyncStorage.setItem("token", token);
        const storedToken = await AsyncStorage.getItem("token");

        navigation.replace("Main");

      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "An error occurred!!");
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: Colors.black, fontSize: 40, fontWeight: "bold"}}>
          登入
        </Text>
        <View style={{marginVertical: 20}}>
          <CustomInput 
            onChangeText={text => handleOnchange(text, "email")} 
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="帳號"
            placeholder="..."
            error={errors.email}
          />
          <CustomInput
            onChangeText={text => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="密碼"
            placeholder="..."
            error={errors.password}
            password
          />
          <CustomButton title="確認" onPress={login} />
          <Text
            onPress={() => navigation.navigate("Registration")}
            style={{
              color: Colors.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}>
            還沒有帳號嗎？ 註冊
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
