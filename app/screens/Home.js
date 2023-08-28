import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "@react-native-material/core";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { API_BASE_URL } from './../../apiConfig';

export default function Home() {

  const moodDetailList=[
    {
        id:0,
        name:"正向",
        value:"positive",
        icon:require("./../../assets/images/positive.png"),
        content: "正向！繼續保持！",
        color: "green"
    },
    {
        id:1,
        name:"普通",
        value:"neutral",
        icon:require("./../../assets/images/neutral.png"),
        content: "心情看起來還OK！！",
        color: "gray"
    },
    {
        id:2,
        name:"負向",
        value:"negative",
        icon:require("./../../assets/images/negative.png"),
        content: "分析為負向情緒！",
        color: "blue"
    },
  ]

  const [todayMood, setTodayMood] = useState("");
  const [inputText, setInputText] = useState("");
  const [flag, setFlag] = useState(true);

  useFocusEffect(() => {
    console.log("Home screen focused, refreshing...");
  });

  useEffect(() => {
    getTodayMood();
  }, []);

  useEffect(() => {
    console.log(flag)
  }, [flag]);

  const getTodayMood = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const headers = {
        Authorization: token,
      };

      const response = await fetch(`${API_BASE_URL}/mood/today`, { headers });
      const responseData = await response.json();
      
      if (responseData.success) {
        const responseDate = responseData.data.createTime;
        const dateObject = new Date(responseDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = dateObject.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}/${month}/${day}`;

        setTodayMood({
          ...responseData.data,
          formattedDate: formattedDate,
        });
      }
      else{
        setFlag(false)
      }

    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleTextInputSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log(token)
      const response = await fetch(`${API_BASE_URL}/mood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          content: inputText
        }),
      });
  
      const data = await response.json();
      console.log(data)
      console.log("test")

      if (data.success) {
        getTodayMood();
      } else {
        Alert.alert("Error", "An error occurred!!");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred!!");
    }

    setInputText("");
    Keyboard.dismiss();
    
  };

  return (
    <SafeAreaView style={{padding: 20}}>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 15, paddingLeft: 12}}>
        <Text style={{fontSize: 20 }}>本日情緒狀態</Text>
      </View>
      <View style={{ 
          alignItems: "center", 
          margin: 5, 
          padding: 15, 
          borderRadius: 15 
        }}>
      {todayMood.mood_id !== undefined && (
          <>
            <Image 
              source={moodDetailList[todayMood.mood_id].icon} 
              style={{ width: 90, height: 90 }} 
            />
            <View style={{ 
                marginHorizontal: 30, 
                marginVertical: 15, 
                justifyContent: "center", 
                alignContent: "center" 
              }}>
              <Text style={{ color: moodDetailList[todayMood.mood_id].color, fontSize: 20 }}>
                {moodDetailList[todayMood.mood_id].content}
              </Text>
            </View>
          </>
        )}
      </View>

      <TextInput 
        label="輸入一句話" 
        value={inputText} 
        onChangeText={setInputText} 
        onSubmitEditing={handleTextInputSubmit} 
        style={{ margin: 16, width: "89%" }} 
      />

      {flag === true && (
        <View style={{padding: 25, shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            margin: 10, 
            width: "92%", 
            height: "auto", 
            backgroundColor: Colors.white, 
            borderRadius: 15
          }}>
          <Text>{todayMood.formattedDate}</Text>
          <View style={{ marginTop: 5 }} />
          <Text>{todayMood.content}</Text>
          <View style={{
            borderBottomWidth: 1, 
            borderColor: "gray", 
            width: "100%", 
            marginVertical:"5%"
          }} />
          <Text style={{fontSize: 20, color: "green"}}>AI回覆</Text>
          <View style={{ marginTop: 10 }} />
          <Text>{todayMood.reply}</Text>
        </View>
      )}
      
      </ScrollView>
    </SafeAreaView>
  )
}
