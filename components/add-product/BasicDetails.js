import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

const BasicDetails = ({ productData, setProductData }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.post(
        "https://store.mazinda.com/api/category/fetch-categories"
      );
      setCategories(data.categories);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
      setLoadingCategories(false);
    }
  };

  const handleDescriptionChange = (index, fieldName, text) => {
    setProductData((prevData) => {
      const updatedDescriptions = [...prevData.description];
      updatedDescriptions[index][fieldName] = text;
      return {
        ...prevData,
        description: updatedDescriptions,
      };
    });
  };

  const handleAddDescription = () => {
    setProductData((prevData) => ({
      ...prevData,
      description: [...prevData.description, { heading: "", description: "" }],
    }));
  };

  const handleRemoveDescription = (index) => {
    setProductData((prevData) => {
      const updatedDescriptions = [...prevData.description];
      updatedDescriptions.splice(index, 1);
      return {
        ...prevData,
        description: updatedDescriptions,
      };
    });
  };

  const handleTagsChange = (text) => {
    setProductData((prevData) => ({
      ...prevData,
      tags: text.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleRemoveTag = (tag) => {
    setProductData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((t) => t !== tag),
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ScrollView
      style={{
        // flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          paddingBottom: 120,
        }}
      >
        <View
          style={{
            gap: 5,
          }}
        >
          <Text>Product Name</Text>
          <TextInput
            onChangeText={(text) =>
              setProductData({ ...productData, productName: text })
            }
            style={{
              borderColor: "lightgray",
              borderWidth: 1,
              paddingHorizontal: 8,
              paddingVertical: 12,
              borderRadius: 4,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 12,
            gap: 5,
          }}
        >
          <Text>Select Product Category</Text>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Entypo name="chevron-small-down" size={24} color="black" />
            )}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 5,
              width: "100%",
            }}
            data={categories.map((category) => category.categoryName)}
            onSelect={(selectedItem, index) => {
              setProductData({ ...productData, category: selectedItem });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 12,
            gap: 5,
          }}
        >
          <Text>Select Sub-Category</Text>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Entypo name="chevron-small-down" size={24} color="black" />
            )}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 5,
              width: "100%",
            }}
            data={
              productData.category === ""
                ? []
                : categories.find(
                    (category) => category.categoryName === productData.category
                  ).subcategories
            }
            onSelect={(selectedItem, index) => {
              setProductData({
                ...productData,
                subcategory: selectedItem,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 12,
            gap: 5,
          }}
        >
          <Text>Product Description</Text>
          {productData.description.map((desc, index) => (
            <View
              key={index}
              style={{
                gap: 10,
              }}
            >
              {
                <TouchableOpacity
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "#ffc8c9",
                    paddingVertical: 2,
                    paddingHorizontal: 7,
                    borderRadius: 8,
                  }}
                  onPress={() => handleRemoveDescription(index)}
                >
                  <Text style={{ color: "red", fontSize: 10 }}>
                    <Entypo name="cross" size={10} color="red" />
                    Remove
                  </Text>
                </TouchableOpacity>
              }
              <TextInput
                placeholder={`Heading ${index + 1}`}
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  borderRadius: 4,
                }}
                value={desc.heading}
                onChangeText={(text) =>
                  handleDescriptionChange(index, "heading", text)
                }
              />
              <TextInput
                placeholder={`Description ${index + 1}`}
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  borderRadius: 4,
                  minHeight: 100,
                }}
                value={desc.description}
                onChangeText={(text) =>
                  handleDescriptionChange(index, "description", text)
                }
                multiline
              />
            </View>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: "#0095f6",
              padding: 12,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={handleAddDescription}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Add Another Heading - Description
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 12,
            gap: 5,
          }}
        >
          <Text>Tags</Text>
          <TextInput
            placeholder="Enter tags (comma separated)"
            style={{
              borderColor: "lightgray",
              borderWidth: 1,
              paddingHorizontal: 8,
              paddingVertical: 12,
              borderRadius: 4,
            }}
            value={productData.tags.join(", ")}
            onChangeText={handleTagsChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {productData.tags.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {productData.tags.map((tag, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Text>{tag}</Text>
                    <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                      <Entypo name="cross" size={16} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default BasicDetails;
