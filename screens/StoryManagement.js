import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";

const StoryManagement = () => {
  const store = useSelector((state) => state.store.store);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStories = async () => {
    try {
      const { data } = await axios.post(
        "https://mazinda.com/api/story/fetch-stories"
      );
      if (data.success) {
        setStories(
          data.stories.filter((story) => story.storeDetails._id === store._id)
        );
      } else {
        Alert.alert(
          "Failed to load stories",
          "A network error occurred. Please try again later."
        );
      }
    } catch (err) {
      Alert.alert(
        ("Failed to load stories",
        "A network error occurred. Please try again later.")
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async (story_id) => {
    setLoading(true);
    const { data } = await axios.put(
      "https://mazinda.com/api/story/delete-story",
      {
        story_id,
      }
    );
    if (data.success) {
      const updated_stories = stories.filter((story) => story._id !== story_id);
      setStories(updated_stories);
    } else {
      Alert.alert("Failed", "Failed to delete story. Please try again later");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (!Object.keys(store).length || loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Navbar />
        <Text
          style={{
            textAlign: "center",
            fontSize: 23,
            fontWeight: 500,
          }}
        >
          Manage Your Stories
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"small"} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Navbar />

      <ScrollView
        refreshControl={
          <RefreshControl
            size={0.5}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchStories();
              setRefreshing(false);
            }}
          />
        }
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 23,
            fontWeight: 500,
          }}
        >
          Manage Your Stories
        </Text>

        {stories.length ? (
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: 120,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Product
              </Text>

              <Text
                style={{
                  width: 80,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Cost Price
              </Text>

              <Text style={{ width: 90, fontSize: 14, fontWeight: 600 }}>
                Special Price
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Options
              </Text>
            </View>
            <FlatList
              data={stories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                    alignItems: "center",
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      width: 100,
                    }}
                  >
                    {item.product.productName.slice(0, 18)}...
                  </Text>

                  <Text
                    style={{
                      width: 60,
                      fontSize: 16,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    ₹{item.product.pricing.costPrice}
                  </Text>

                  <Text
                    style={{
                      width: 60,
                      fontSize: 16,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    ₹{item.specialPrice}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Delete Story",
                        "Are you sure you want to delete this story?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Delete",
                            onPress: () => {
                              deleteStory(item._id);
                            },
                          },
                        ]
                      );
                    }}
                    style={{
                      backgroundColor: "red",
                      padding: 2,
                      borderRadius: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{
                marginVertical: 10,
                textAlign: "center",
                color: "gray",
                fontSize: 15,
              }}
            >
              No stories set currently
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoryManagement;
