import { SafeAreaView, Text, View } from "react-native";
import { fetchStoreData } from "../redux/StoreReducer";
import { fetchStoriesData } from "../redux/StoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import CurrentOrders from "../components/CurrentOrders";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const store = useSelector((state) => state.store.store);
  const productsLength = useSelector((state) => state.store.products.length);

  useEffect(() => {
    dispatch(fetchStoreData());
    dispatch(fetchStoriesData());
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Navbar />
      <View
        style={{
          marginTop: 15,
          paddingHorizontal: 20,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {store.followers ? store?.storeName?.toUpperCase() : "Loading..."}
        </Text>

        <View
          style={{
            marginVertical: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              gap: 20,
            }}
          >
            {/* <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 500,
                }}
              >
                4.5/5
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#525254",
                }}
              >
                Rating
              </Text>
            </View> */}
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 500,
                }}
              >
                {store.followers ? store?.followers?.length : 0}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#525254",
                }}
              >
                Followers
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 500,
                }}
              >
                {productsLength}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#525254",
                }}
              >
                Products
              </Text>
            </View>
          </View>
        </View>
      </View>

      <CurrentOrders />
    </SafeAreaView>
  );
};

export default HomeScreen;
