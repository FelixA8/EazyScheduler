import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import {
  RootBottomNavBarStackParamList,
  RootStackParamList,
} from "./constants/types";
import CalendarScreen from "./screens/StatsScreen";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/colors";
import ModifyTask from "./screens/ModifyTask";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import StatsScreen from "./screens/StatsScreen";
import SummaryContextProvider from "./store/summary-store";
import DateContextProvider from "./store/date-store";
import TaskContextProvider from "./store/task-store";
import CalendarDetailScreen from "./screens/CalendarDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomNavBarStackParamList>();

export default function App() {
  const [dbInitialize, setDbInitialize] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialize(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!dbInitialize) {
    return null;
  }
  function HomeOverview() {
    return (
      <SummaryContextProvider>
        <BottomTabs.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: Colors.primary700,
              borderTopColor: Colors.primary400,
            },
            headerStyle: { backgroundColor: Colors.primary700 },
            headerTintColor: "white",
            headerShadowVisible: false,
          }}
        >
          <BottomTabs.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              tabBarIcon: ({ color: color, size: size }) => {
                return (
                  <Ionicons name="podium-outline" size={size} color={color} />
                );
              },
            }}
          />
          <BottomTabs.Screen
            name="StatsScreen"
            component={StatsScreen}
            options={{
              title: "Stats",
              tabBarIcon: ({ color: color, size: size }) => {
                return (
                  <Ionicons
                    name="stats-chart-outline"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
        </BottomTabs.Navigator>
      </SummaryContextProvider>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <DateContextProvider>
        <TaskContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.primary700 },
                }}
                name={"HomeOverview"}
                component={HomeOverview}
              />
              <Stack.Screen
                options={{
                  headerStyle: { backgroundColor: Colors.primary700 },
                  headerTintColor: "#FFF",
                  contentStyle: { backgroundColor: Colors.primary700 },
                }}
                name={"ModifyTask"}
                component={ModifyTask}
              />
              <Stack.Screen
                name="CalendarDetailScreen"
                component={CalendarDetailScreen}
                options={{
                  headerStyle: { backgroundColor: Colors.primary700 },
                  headerTintColor: "#FFF",
                  contentStyle: { backgroundColor: Colors.primary700 },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TaskContextProvider>
      </DateContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
});
