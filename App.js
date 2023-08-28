import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./app/navigations/TabNavigation";
import Login from "./app/screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Registration from "./app/screens/Registration";
import { useEffect, useState } from "react";


const Stack = createStackNavigator();

export default function App() {

  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      console.log(storedToken)
      if (storedToken) {
        setInitialRoute("Main");
      } else {
        console.log("Setting initial route to Login");
        setInitialRoute("Login");
      }
    } catch (error) {
      console.error("Error checking user logged in:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {/* <Stack.Screen name="MoodRecord" component={MoodRecord} options={{ title: ""}}/> */}
        <Stack.Screen name="Login" component={Login} options={{ title: ""}}/>
        <Stack.Screen name="Registration" component={Registration} options={{ title: ""}}/>
        <Stack.Screen name="Main" component={TabNavigation}  options={{ title: "主頁" , headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

