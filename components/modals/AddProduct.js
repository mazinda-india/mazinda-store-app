import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BasicDetails from "../add-product/BasicDetails";
import VarientInfo from "../add-product/VarientInfo";
import ImagePrice from "../add-product/ImagePrice";

const AddProduct = ({ addProductModalVisible, setAddProductModalVisible }) => {
  const steps = [
    {
      title: "Basic Details",
      heading: "Basic Product Details",
      buttonText: "Continue",
    },
    {
      title: "Variants Info",
      heading: "Choose Whether Product has Variants",
      buttonText: "Continue",
    },
    {
      title: "Product Images",
      heading: "Enter Variants Details",
      buttonText: "Continue",
    },
    {
      title: "Final Details",
      heading: "Image and Pricing Details",
      buttonText: "Add Product",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const [productData, setProductData] = useState({
    productName: "",
    storeToken: "",
    category: "",
    subcategory: "",
    imagePaths: [],
    pricing: {
      mrp: "",
      costPrice: "",
    },
    description: [{ heading: "", description: "" }],
    tags: [],
    varients: [],
  });

  // Setting the store token
  useEffect(() => {
    (async () => {
      const storeToken = await AsyncStorage.getItem("store_token");
      setProductData({ ...productData, storeToken });
    })();
  }, []);

  return (
    <Modal
      visible={addProductModalVisible}
      animationType="slide"
      onRequestClose={() => setAddProductModalVisible(false)}
    >
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: "white",
          position: "relative",
        }}
      >
        {/* Header of the page */}
        <View
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          {currentStep === 0 ? (
            <TouchableOpacity
              onPress={() => setAddProductModalVisible(false)}
              style={{
                position: "absolute",
                left: 5,
              }}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setCurrentStep((prev) => prev - 1)}
              style={{
                position: "absolute",
                left: 5,
              }}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontSize: 15,
            }}
          >
            {steps[currentStep].title.toUpperCase()}
          </Text>
        </View>

        {/* Steps Box */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
        >
          {steps.map((step, index) => (
            <View
              key={index}
              style={{
                alignItems: "center",
              }}
            >
              {currentStep > index ? (
                <View
                  style={{
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <FontAwesome name="check-circle" size={24} color="#09ff00" />
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {step.title}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#dadada",
                      paddingHorizontal: 3,
                      paddingVertical: 4,
                      width: 25,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                    }}
                  >
                    {step.title}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 100,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            borderTopColor: "lightgray",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              marginBottom: 10,
              backgroundColor: "black",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              width: "90%",
            }}
            onPress={() => setCurrentStep(currentStep + 1)}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {steps[currentStep].buttonText}
            </Text>
          </TouchableOpacity>
        </View>

        {currentStep === 0 ? (
          <BasicDetails
            productData={productData}
            setProductData={setProductData}
          />
        ) : currentStep === 1 ? (
          <VarientInfo
            productData={productData}
            setProductData={setProductData}
          />
        ) : currentStep === 2 ? (
          <ImagePrice
            productData={productData}
            setProductData={setProductData}
          />
        ) : currentStep === 3 ? (
          <View>
            <Text>4</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

export default AddProduct;
