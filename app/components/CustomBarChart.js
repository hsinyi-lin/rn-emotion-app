import React from "react";
import {Text,StyleSheet,Dimensions} from "react-native";

import { BarChart } from "react-native-chart-kit";


export default function CustomBarChart({dataForSelectedDate}) {

    return (
          <>
            <Text style={styles.header}>各項情緒天數</Text>
            <BarChart
              data={{
                labels: ["正向", "普通", "負向"],
                datasets: [
                  {
                    data: [
                      dataForSelectedDate.positive.data.length, 
                      dataForSelectedDate.neutral.data.length, 
                      dataForSelectedDate.negative.data.length
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 16}
              height={220}
              yAxisLabel={""}
              yAxisSuffix={""}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              yAxisInterval={10}
              fromZero={true}
              yMin={0}
              yValues={[0, 5, 10, 15, 20, 25, 30]}
            />
          </>
      );
  };

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: 10,
  },
  header: {
      textAlign: "center",
      fontSize: 18,
      padding: 16,
      marginTop: 16,
  },
});