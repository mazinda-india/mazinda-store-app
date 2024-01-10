import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    const storeToken = await AsyncStorage.getItem("store_token");
    const { data } = await axios.post(
      "https://store.mazinda.com/api/order/fetch-store-orders",
      {
        storeToken,
      }
    );
    setCurrentOrders(data.currentOrders.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Current Orders
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            margin: 8,
          }}
        >
          Date
        </Text>
        <Text
          style={{
            margin: 8,
            width: 120,
            textAlign: "center",
          }}
        >
          Product
        </Text>
        <Text
          style={{
            margin: 8,
          }}
        >
          Qty.
        </Text>
        <Text
          style={{
            margin: 8,
          }}
        >
          Status
        </Text>
      </View>
      <FlatList
        data={currentOrders}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await fetchOrders();
          setRefreshing(false);
        }}
        renderItem={({ item: order }) => {
          const orderDate = new Date(order.createdAt);
          const formattedDate = orderDate.toLocaleDateString();
          const formattedTime = orderDate.toLocaleTimeString();
          return (
            <View
              style={{
                padding: 8,
                flexDirection: "row",
                borderBottomColor: "lightgray",
                borderBottomWidth: 1,
                margin: 8,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Date time container */}
              <View
                style={{
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {formattedDate}
                </Text>
                <Text>{formattedTime}</Text>
              </View>

              {/* Product container  */}
              <View
                style={{
                  width: 120,
                  gap: 8,
                }}
              >
                {order.cart.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `https://mazinda.com/product/view-product?id=${item._id}`
                        )
                      }
                      key={index}
                      style={{
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <Text>•</Text>
                      <Text numberOfLines={3}>{item.productName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Quantity container  */}
              <View
                style={{
                  gap: 8,
                }}
              >
                {order.cart.map((item, index) => {
                  return <Text key={index}>{item.quantity}</Text>;
                })}
              </View>

              {/* Status container  */}
              <View
                style={{
                  backgroundColor:
                    order.status === "Confirmed" ? "#daa52020" : "lightgray",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: order.status === "Confirmed" ? "goldenrod" : "black",
                  }}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(order) => order?._id}
      />
    </>
  );
};

export default CurrentOrders;
