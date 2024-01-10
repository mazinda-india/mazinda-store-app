import { Image, Text, View, Platform } from "react-native";
import MazindaLogo from "../assets/logo/logo_mazinda.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const store_name = useSelector((state) => state.store.store.storeName);

  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 8 : 45,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingBottom: 5,
        }}
      >
        <Image
          source={MazindaLogo}
          style={{
            width: 100,
            height: undefined,
            aspectRatio: 3 / 1,
          }}
          resizeMode="contain"
        />

        <View>
          <Text style={{ fontSize: 12, color: "#4b5563" }}>Welcome</Text>
          <Text style={{ fontSize: 16 }}>{store_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
