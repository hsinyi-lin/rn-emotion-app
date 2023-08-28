import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import AnalysisNavigation from "./AnalysisNavigation";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
      <Tab.Screen name="Home" component={Home} 
        options={{
            tabBarLabel: "主頁",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
            )
        }}
      />
      <Tab.Screen name="Analysis" component={AnalysisNavigation} 
        options={{
            tabBarLabel: "歷史分析",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
            )
        }}
      />
      <Tab.Screen name="Setting" component={Setting} 
        options={{
            tabBarLabel: "設定",
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle" color={color} size={size} />
            )
        }}
      />
    </Tab.Navigator>
  )
}