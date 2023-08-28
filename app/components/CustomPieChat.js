import React from "react";
import { Dimensions } from "react-native";

import { PieChart } from "react-native-chart-kit";

export default function CustomPieChart({dataForSelectedDate}) {

  return (
      <>
        <PieChart
          data={[
            {
              name: "正向",
              population: dataForSelectedDate.positive.data.length,
              color: "#3C3C3C",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "普通",
              population: dataForSelectedDate.neutral.data.length,
              color: "#9D9D9D",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "負向",
              population: dataForSelectedDate.negative.data.length,
              color: "#E0E0E0",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            }
          ]}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </>
    );
};
