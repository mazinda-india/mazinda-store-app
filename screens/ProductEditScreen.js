// EditProductScreen.js

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const EditProductScreen = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params;

  // Initial product details (fetch from API or use state management library)
  const [productData, setProductData] = useState({});

  const handleSave = () => {
    // Perform API call to save the updated product details
    // You may use a state management library or a context to manage the product data
    // For simplicity, we'll just log the updated product details for now
    console.log("Updated Product:", productData);

    // Navigate back to the product display screen
    navigation.goBack();
  };

  const fetchProductData = async () => {
    try {
      const { data } = await axios.post("/api/product/fetch-product-by-id", {
        id,
      });
      if (data.success) {
        setProductData(data.product);
        setEditedDescription(data.product.description);
        setLoading(false);
      } else {
        console.error("Error while fetching the product");
      }
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.header}>Edit Product</Text>

      {/* Product Name */}
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={product.productName}
        onChangeText={(text) => setProduct({ ...product, productName: text })}
      />

      {/* MRP */}
      <Text style={styles.label}>MRP</Text>
      <TextInput
        style={styles.input}
        value={product.pricing.mrp}
        onChangeText={(text) =>
          setProduct({
            ...product,
            pricing: { ...product.pricing, mrp: text },
          })
        }
      />

      {/* Cost Price */}
      <Text style={styles.label}>Cost Price</Text>
      <TextInput
        style={styles.input}
        value={product.pricing.costPrice}
        onChangeText={(text) =>
          setProduct({
            ...product,
            pricing: { ...product.pricing, costPrice: text },
          })
        }
      />

      {/* Add other product details here as needed */}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProductScreen;
