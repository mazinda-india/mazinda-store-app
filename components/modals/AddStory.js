import { useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomModal, SlideAnimation } from "react-native-modals";
import { useSelector } from "react-redux";

const AddStory = ({
  product,
  addStoryModalVisible,
  setAddStoryModalVisible,
}) => {
  const { width } = useWindowDimensions();

  const store = useSelector((state) => state.store.store);

  const [addStoryLoading, setAddStoryLoading] = useState(false);
  const [storyAdded, setStoryAdded] = useState(false);
  const [specialPrice, setSpecialPrice] = useState(null);

  const addToStory = async () => {
    setAddStoryLoading(true);
    try {
      const { data } = await axios.post(
        "https://store.mazinda.com/api/story/add-story",
        {
          product,
          storeDetails: {
            _id: store._id,
            imageURI:
              "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png",
            storeName: store.storeName,
            city: store.storeAddress.city,
          },
          specialPrice,
          isSponsored: true,
        }
      );

      if (data.success) {
        setAddStoryLoading(false);
        setStoryAdded(true);
        setTimeout(() => {
          setAddStoryModalVisible(false);
          setStoryAdded(false);
        }, 800);
      }
    } catch (e) {
      console.log(e);
    }

    setAddStoryLoading(false);
  };

  if (!Object.keys(product).length) {
    return null;
  }
  return (
    <BottomModal
      visible={addStoryModalVisible}
      onBackDropPress={() => setAddStoryModalVisible(!addStoryModalVisible)}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onHardwareBackPress={() => setAddStoryModalVisible(!addStoryModalVisible)}
      onTouchOutside={() => setAddStoryModalVisible(!addStoryModalVisible)}
    >
      <SafeAreaView>
        {!storyAdded ? (
          <View>
            <View
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: 17,
                  paddingVertical: 5,
                }}
              >
                {product.productName}
              </Text>

              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 30,
                  gap: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    Cost Price:{" "}
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    ₹{product.pricing.costPrice}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    Enter Special Price: ₹{" "}
                  </Text>
                  <TextInput
                    value={specialPrice}
                    onChangeText={(text) => setSpecialPrice(text)}
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 5,
                      fontSize: 20,
                    }}
                    placeholder="Enter here ..."
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => setAddStoryModalVisible(false)}
                style={{
                  borderTopColor: "lightgray",
                  borderTopWidth: 1,
                  borderBottomColor: "lightgray",
                  borderBottomWidth: 1,
                  width: width / 2,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addToStory()}
                style={{
                  width: width / 2,
                  paddingVertical: 15,
                  backgroundColor:
                    parseFloat(product?.pricing?.costPrice) >
                    parseFloat(specialPrice)
                      ? "#000000"
                      : "#00000030",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {addStoryLoading ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    "PUT STATUS"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: 250,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={80} color="lightgreen" />
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
              }}
            >
              Story Added Successfully
            </Text>
          </View>
        )}
      </SafeAreaView>
    </BottomModal>
  );
};

export default AddStory;
