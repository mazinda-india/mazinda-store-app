import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductDisplay = ({
  product,
  productModalVisible,
  setProductModalVisible,
}) => {
  if (!Object.keys(product).length) {
    return null;
  }
  const navigation = useNavigation();
  return (
    <Modal
      visible={productModalVisible}
      onRequestClose={() => setProductModalVisible(false)}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <SafeAreaView
        style={{
          position: "relative",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: product.imagePaths[0] }}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productName}>{product.productName}</Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>MRP:</Text>
            <Text style={styles.value}>₹{product.pricing.mrp}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cost Price:</Text>
            <Text style={styles.value}>₹{product.pricing.costPrice}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{product.category}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Subcategory:</Text>
            <Text style={styles.value}>{product.subcategory}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <View
              style={{
                backgroundColor: "#16762540",
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  ...styles.value,
                  color: "#167625",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {product.approvalStatus ? "Approved" : "Pending"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            flexDirection: "row",
            borderTopColor: "lightgray",
            borderTopWidth: 1,
            paddingBottom: 24,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 30,
            }}
            onPress={() => setProductModalVisible(false)}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              CLOSE
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{
              width: "50%",
              paddingVertical: 30,
              borderLeftColor: "lightgray",
              borderLeftWidth: 1,
            }}
            onPress={() => {
              setProductModalVisible(false);
              navigation.navigate("Edit Product", { productId: product._id });
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              EDIT
            </Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 50,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
  tableContainer: {
    margin: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});

export default ProductDisplay;
