import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";


export default function MoodRecord() {

  const param = useRoute().params;
  const [place, setPlace] = useState([]);

  useEffect(()=>{
      console.log(param)
      setPlace(param)
  }, [param]);

  return (
    <SafeAreaView style={{paddingHorizontal: 25}}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{}}>
          <Text style={{
            fontSize: 20 ,
            marginLeft: 13, 
            marginBottom: 10 
          }}>共{param.moodData.length}天的資料</Text>
        </View>
        {param.moodData.map((item, index) => {
          const itemDate = new Date(item.createTime);
          const formattedItemDate = `${itemDate.getFullYear()}/${(itemDate.getMonth() + 1).toString().padStart(2, "0")}/${itemDate.getDate().toString().padStart(2, "0")}`;

          return (
          <View key={index}
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
                padding: 25, 
                margin: 10, 
                width: "92%", 
                height: "auto", 
                backgroundColor: Colors.white, 
                borderRadius: 15
              }}>
              <Text>{formattedItemDate}</Text>
              <View style={{ marginTop: 5 }} />
              <Text>{item.content}</Text>
              <View style={{
                borderBottomWidth: 1,
                borderColor: "gray",
                width: "100%",
                marginVertical:"5%"}} />
              <Text style={{fontSize: 20, color: "green"}}>AI 回覆</Text>
              <View style={{ marginTop: 10 }} />
              <Text>{item.reply}</Text>
          </View>
          )
      })}
      </ScrollView>
      
    </SafeAreaView>
  )
}