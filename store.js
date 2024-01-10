import { configureStore } from "@reduxjs/toolkit";
import StoreReducer from "./redux/StoreReducer";
import StoryReducer from "./redux/StoryReducer";

export default configureStore({
  reducer: {
    store: StoreReducer,
    stories: StoryReducer,
  },
});
