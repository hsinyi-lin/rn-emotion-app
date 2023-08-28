import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListItem } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Setting() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <SafeAreaView style={{padding: 20}}>
      <ListItem title="登出" onPress={logout}/>
    </SafeAreaView>
  )
}