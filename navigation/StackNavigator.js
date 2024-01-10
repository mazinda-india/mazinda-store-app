import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

import { Entypo, FontAwesome5, AntDesign } from "@expo/vector-icons";
import StockScreen from "../screens/StockScreen";
import UploadStock from "../screens/UploadStock";
import AccountScreen from "../screens/account/AccountScreen";
import SettingsScreen from "../screens/account/SettingsScreen";
import BankDetailsScreen from "../screens/account/BankDetailsScreen";
import StoryManagement from "../screens/StoryManagement";
import ProductEditScreen from "../screens/ProductEditScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fbe4d0",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={26} color="#676161" />
              ) : (
                <Entypo name="home" size={26} color="#676161" />
              ),
          }}
        />
        <Tab.Screen
          name="Stock"
          component={StockScreen}
          options={{
            tabBarLabel: "Stock",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="database" size={24} color="black" />
              ) : (
                <AntDesign name="database" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Upload Stock"
          component={UploadStock}
          options={{
            tabBarLabel: "Upload",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="upload" size={24} color="black" />
              ) : (
                <AntDesign name="upload" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Manage Stories"
          component={StoryManagement}
          options={{
            tabBarLabel: "Story Management",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="eyeo" size={24} color="black" />
              ) : (
                <AntDesign name="eyeo" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStackNavigator}
          options={{
            tabBarLabel: "Account",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="user-circle" size={24} color="black" />
              ) : (
                <FontAwesome5 name="user-circle" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function AccountStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Bank Details" component={BankDetailsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit Product"
          component={ProductEditScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
