import React from "react";
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert } from "react-native";

import Colors from "../constants/Colors"
import CustomButton from "./../components/CustomButton";
import CustomInput from "./../components/CustomInput";
import { useNavigation } from "@react-navigation/native";

import { API_BASE_URL } from './../../apiConfig';


export default function Registration() {
  const navigation = useNavigation();

  const [inputs, setInputs] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("請填寫完整", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("請填寫完整", "email");
      isValid = false;
    }

    if (!inputs.username) {
      handleError("請填寫完整", "username");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("請填寫完整", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          username: inputs.username,
          password: inputs.password,
        }),
      });
  
      const data = await response.json();
      console.log(data)

      if (data.success) {
        navigation.replace("Login");
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
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
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: Colors.black, fontSize: 40, fontWeight: "bold"}}>
          註冊
        </Text>
        <View style={{marginVertical: 20}}>
          <CustomInput
            onChangeText={text => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="帳號"
            error={errors.email}
          />

          <CustomInput
            onChangeText={text => handleOnchange(text, "username")}
            onFocus={() => handleError(null, "username")}
            iconName="account-outline"
            label="名稱"
            error={errors.username}
          />

          <CustomInput
            onChangeText={text => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="密碼"
            error={errors.password}
            password
          />
          <CustomButton title="確認" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{color: Colors.black, fontWeight: "bold", textAlign: "center", fontSize: 16}}>
            已經有帳號了嗎？ 登入
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
