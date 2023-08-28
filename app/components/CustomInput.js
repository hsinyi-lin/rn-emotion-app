import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import Colors from "./../constants/Colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function CustomInput({label, iconName, error, password, onFocus = () => {}, ...props}) {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? Colors.red
              : isFocused
              ? Colors.darkBlue
              : Colors.light,
            alignItems: "center",
          },
        ]}>
        <Icon name={iconName} style={{color: Colors.darkBlue, fontSize: 22, marginRight: 10}} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: Colors.darkBlue, flex: 1}}
          {...props}
        />
        {password && (
          <Icon 
            onPress={() => setHidePassword(!hidePassword)} 
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{color: Colors.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: Colors.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: Colors.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: Colors.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});