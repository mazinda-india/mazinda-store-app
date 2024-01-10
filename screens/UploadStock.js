import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Navbar from "../components/Navbar";
// import { useState } from "react";
// import AddProduct from "../components/modals/AddProduct";

const UploadStock = () => {
  // const [addProductModalVisible, setAddProductModalVisible] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <AddProduct
        addProductModalVisible={addProductModalVisible}
        setAddProductModalVisible={setAddProductModalVisible}
      /> */}
      {/* <Navbar /> */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginVertical: 10,
          marginHorizontal: 13,
          color: "black",
        }}
      >
        Currently, products can be added only through the web.
      </Text>
      <View
        style={{
          alignItems: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => Linking.openURL("https://store.mazinda.com")}
        >
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            CLICK HERE
          </Text>
        </TouchableOpacity>
        <Text>to visit https://store.mazinda.com</Text>
      </View>

      {/* <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          gap: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => setAddProductModalVisible(true)}
          style={{
            backgroundColor: "#171717",
            borderRadius: 4,
            paddingHorizontal: 18,
            paddingVertical: 10,
            width: "80%",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Add a New Item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 18,
            paddingVertical: 10,
            width: "80%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Import and Edit from Previous Stock
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default UploadStock;
