import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Colors from "../constants/Colors";

export default function MoodItem({dataForSelectedDate}) {
  console.log(dataForSelectedDate)

  const moodDetailList=[
    {
        id:0,
        name:"正向",
        icon:require("./../../assets/images/positive.png"),
    },
    {
        id:1,
        name:"普通",
        icon:require("./../../assets/images/neutral.png"),
    },
    {
        id:2,
        name:"負向",
        icon:require("./../../assets/images/negative.png"),
    },
  ]

  return (
    <TouchableOpacity onPress={onPressMoodItem}>
      <View style={{
          padding: 10, 
          alignItems: "center", 
          justifyContent: "center", 
          margin: 10, 
          width: 100, 
          height: 100, 
          backgroundColor: Colors.white, 
          borderRadius: 15
        }}>
          <Image source={moodDetailList[0].icon} style={{width: 50, height: 50}} />
        <Text style={{fontSize: 13}}>{dataForSelectedDate?.positive.data.length}天{moodDetailList[0].name}</Text>
      </View>
    </TouchableOpacity>
  )
}
