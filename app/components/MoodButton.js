import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import Colors from "./../constants/Colors"
import { useNavigation } from "@react-navigation/native";

export default function MoodButton({ moodId, moodData }) {
    const navigation = useNavigation(); 

    const onPressMoodItem = () => {
        navigation.navigate("MoodRecord", { moodData: moodData });
    };

    const moodDetailList=[
        {
            id:0,
            name:"正向",
            value:"positive",
            icon:require("./../../assets/images/positive.png"),
            content: "分析為正向！繼續保持！",
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
            content: "心情很差！！",
            color: "blue"
        },
      ]

      
  return (
    <TouchableOpacity onPress={onPressMoodItem}>
      <View style={{ 
          alignItems: "center", 
          justifyContent: "center", 
          margin: 10, 
          width: 100, 
          height: 100, 
          backgroundColor: Colors.white, 
          borderRadius: 15 
        }}>
        <Image source={moodDetailList[moodId].icon} style={{ width: 50, height: 50 }} />
        <Text style={{ fontSize: 13 }}>{moodData.length}天{moodDetailList[moodId].name}</Text>
      </View>
    </TouchableOpacity>
  );
}
