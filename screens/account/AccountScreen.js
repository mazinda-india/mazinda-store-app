import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const AccountScreen = () => {
  const navigation = useNavigation();

  // Helper function to create individual option components
  const OptionItem = ({ icon, text, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: "gray",
        borderWidth: 1,
        flexDirection: "row",
        width: "100%",
        padding: 10,
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
      }}
    >
      {icon}
      <Text style={{ fontSize: 18 }}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View>
          <Text style={{ textAlign: "center", fontSize: 26, marginTop: 30 }}>
            My Account
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 18,
            marginTop: 18,
          }}
        >
          <View style={{ gap: 12 }}>
            {/* <OptionItem
              icon={
                <MaterialCommunityIcons
                  name="bank-outline"
                  size={24}
                  color="black"
                />
              }
              text="Bank Details"
              onPress={() => navigation.navigate("Bank Details")}
            /> */}
            <OptionItem
              icon={
                <Ionicons name="settings-outline" size={24} color="black" />
              }
              text="Settings"
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
