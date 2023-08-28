import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomPieChart from "../components/CustomPieChat";
import CustomBarChart from "../components/CustomBarChart";

import DatePicker from "react-native-modern-datepicker";
import { Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MoodButton from "../components/MoodButton";
import { useFocusEffect } from "@react-navigation/native";

import { API_BASE_URL } from './../../apiConfig';

export default function Analysis() {

  const [dataForSelectedDate, setDataForSelectedDate] = useState({});

  useFocusEffect(() => {
    console.log("Analysis screen focused, refreshing...");
  });
  
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    getInitialData(currentYear, currentMonth);
  }, []);

  const getInitialData = async (selectedYear, selectedMonth) => {
    try {
      const urls = [
        `${API_BASE_URL}/mood/${0}/${selectedYear}/${selectedMonth}`,
        `${API_BASE_URL}/mood/${1}/${selectedYear}/${selectedMonth}`,
        `${API_BASE_URL}/mood/${2}/${selectedYear}/${selectedMonth}`,
      ];

      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: token,
      };

      const responses = await Promise.all(urls.map(url => fetch(url, { headers })));
      const responseDataArray = await Promise.all(responses.map(response => response.json()));

      const combinedData = {
        positive: responseDataArray[0],
        neutral: responseDataArray[1],
        negative: responseDataArray[2],
      };
      // console.log(combinedData)
      // console.log(combinedData.positive)
      setDataForSelectedDate(combinedData);

    } catch (error) {
      console.error("API Error", error);
    }
  };
  

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  

    const startDate = `${currentYear}/${currentMonth}`;

    const [selectedStartDate, setSelectedStartDate] = useState(startDate);


    const handlePressConfirm = () => {
      if (selectedStartDate !== "") {
        const [year, month, day] = selectedStartDate.split("/");

        const selectedYear = parseInt(year);
        const selectedMonth = parseInt(month);
        getInitialData(selectedYear, selectedMonth);
      }
    };
    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker);
    };

    const handleChangeStartDate = newDate => {
      const year = newDate.year;
      const month = newDate.month.toString().padStart(2, "0");
  
      setSelectedStartDate(`${year}/${month}`);
      setStartedDate(newDate);
      setOpenStartDatePicker(false);
    }

  return (
    <SafeAreaView style={{ paddingHorizontal: 25, paddingTop: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 }}>
        <View>
          <Text style={{ fontSize: 20 }}>當月情緒</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" ,  alignItems: "center" }}>
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressStartDate}
          >
            <Text>{selectedStartDate.substring(0, 7)}</Text>
          </TouchableOpacity>


          <Button variant="outlined" title="確定" onPress={handlePressConfirm} style={{marginLeft:10}}/>
        </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      
      {dataForSelectedDate?.positive?.data !== undefined && 
        (dataForSelectedDate?.positive?.data.length + dataForSelectedDate?.neutral?.data.length + dataForSelectedDate?.negative?.data.length !== 0) && 
        (
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <MoodButton moodId={0} moodData={dataForSelectedDate?.positive.data} />
              <MoodButton moodId={1} moodData={dataForSelectedDate?.neutral.data} />
              <MoodButton moodId={2} moodData={dataForSelectedDate?.negative.data} />
            </View>
            <CustomPieChart dataForSelectedDate={dataForSelectedDate}/>
            <CustomBarChart dataForSelectedDate={dataForSelectedDate}/>
          </>
        )
      }

      </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
    marginVertical:"5%"
  },
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#cccccc",
    height: 36,
    width: 90,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
