import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductDisplay from "../components/modals/ProductDisplay";
import AddStory from "../components/modals/AddStory";
import axios from "axios";

const StockScreen = () => {
  const products = useSelector((state) => state.store.products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [addStoryModalVisible, setAddStoryModalVisible] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const queryWords = lowerCaseQuery.split(" ").filter(Boolean); // Split on spaces and remove empty strings

    const filtered = products.filter(({ productName }) =>
      queryWords.every((word) => productName.toLowerCase().includes(word))
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const toggleProductAvailability = async (id) => {
    setToggleLoading(true);
    try {
      const { data } = await axios.post(
        "https://store.mazinda.com/api/product/toggle-availability",
        { id }
      );

      if (data.success) {
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id
              ? { ...product, isAvailable: !product.isAvailable }
              : product
          )
        );
      }
    } catch (error) {
      console.error("Error toggling product availability: ", error);
    }
    setToggleLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <AddStory
        product={selectedProduct}
        addStoryModalVisible={addStoryModalVisible}
        setAddStoryModalVisible={setAddStoryModalVisible}
      />

      <ProductDisplay
        product={selectedProduct}
        productModalVisible={productModalVisible}
        setProductModalVisible={setProductModalVisible}
      />
      <Navbar />

      <View
        style={{
          margin: 10,
          borderColor: "lightgray",
          borderWidth: 1,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <TextInput
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder="Search for a product"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{
            margin: 8,
            width: 110,
          }}
        >
          Product
        </Text>
        <Text
          style={{
            margin: 8,
            textAlign: "center",
          }}
        >
          Availability
        </Text>
        <Text
          style={{
            margin: 8,
          }}
        >
          Options
        </Text>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item: product }) => {
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
              {/* Product container  */}
              <View
                style={{
                  width: 120,
                  gap: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: product.imagePaths[0] }}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct(product);
                    setProductModalVisible(true);
                  }}
                >
                  <Text numberOfLines={2}>{product.productName}</Text>
                </TouchableOpacity>
              </View>

              {/* Status container  */}
              <TouchableOpacity
                onPress={() => {
                  toggleProductAvailability(product._id);
                }}
                style={{
                  backgroundColor: product.isAvailable
                    ? "#16762520"
                    : "#76161620",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: product.isAvailable ? "#167625" : "#761616",
                  }}
                >
                  {toggleLoading ? (
                    <ActivityIndicator />
                  ) : product.isAvailable ? (
                    "Available"
                  ) : (
                    "Not Available"
                  )}
                </Text>
              </TouchableOpacity>

              {/* Options container  */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct(product);
                    setAddStoryModalVisible(true);
                  }}
                  style={{
                    backgroundColor: "#134272",
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                    }}
                  >
                    Put status
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={{
                    backgroundColor: "gold",
                    padding: 6,
                    marginLeft: 3,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          );
        }}
        keyExtractor={(product) => product?._id}
      />
    </SafeAreaView>
  );
};

export default StockScreen;
