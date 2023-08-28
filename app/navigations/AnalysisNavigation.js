import { View, Text } from "react-native"
import React from "react"
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack"
import Analysis from "../screens/Analysis";
import MoodRecord from "../screens/MoodRecord";

export default function AnalysisNavigation() {
    const isAndroid = true;
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ 
        gestureEnabled: true,
        // headerShown:false,
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)
    }}>
        <Stack.Screen name="analysis" component={Analysis} options={{headerShown:false}} />
        <Stack.Screen name="MoodRecord" component={MoodRecord} 
            options={{
                presentation: "modal",
                headerShown: true,
                title: "紀錄"
            }} 
        />
    </Stack.Navigator>
  )
}