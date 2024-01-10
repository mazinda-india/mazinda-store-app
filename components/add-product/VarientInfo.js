import { View, Text, Pressable } from "react-native";

const VarientInfo = ({ productData, setProductData }) => {
  return (
    <View>
      <View>
        <Text
          style={{
            fontWeight: 500,
            paddingVertical: 15,
            paddingHorizontal: 20,
            fontSize: 18,
          }}
        >
          Does your product have varients?
        </Text>
        <Pressable
          onPress={() => setProductData({ ...productData, varients: [] })}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: !productData.varients.length
                  ? "black"
                  : "white",
                borderRadius: 100,
              }}
            ></View>
          </View>

          <View>
            <Text>NO</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setProductData({ ...productData, varients: [{}] })}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: productData.varients.length
                  ? "black"
                  : "white",
                borderRadius: 100,
              }}
            ></View>
          </View>

          <View>
            <Text>YES</Text>
          </View>
        </Pressable>
      </View>

      {productData.varients.length ? (
        <View>
          <Text>Hey</Text>
        </View>
      ) : null}
    </View>
  );
};

export default VarientInfo;
