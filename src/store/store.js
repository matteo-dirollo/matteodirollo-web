import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import { combineReducers } from "redux";

import modalReducer from "@/components/ui/modals/modalSlice";
import asyncReducer from "../api/asyncSlice";
import authReducer from "../api/auth/authSlice";
import postsReducer from "../pages/Blog/postsSlice";
import storageReducer from "../api/firestore/storageSlice";

const rootReducer = combineReducers({
  async: asyncReducer,
  modals: modalReducer,
  auth: authReducer,
  posts: postsReducer,
  storage: storageReducer,
});

const combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["posts","async", "storage"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const makeStore = (context) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

  store.__persistor = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
export const persistor = wrapper.__persistor;


