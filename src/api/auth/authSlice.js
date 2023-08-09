import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { appLoaded, asyncActionError } from "../asyncSlice";
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authenticated: false,
  currentUser: null,
  users: {},
};

export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(fetchFirestoreUserById(user.uid));
          try {
            return user;
          } catch (error) {
            reject(error);
          }
        } else {
          resolve({ user: null });
        }
      });
    });
  }
);

export const signInWithEmail = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { dispatch }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch(signInUser(user));
      dispatch(appLoaded());
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, values }, { dispatch }) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      dispatch(signInUser(user));
      dispatch(firebaseUsersCollection({ values, user }));
      dispatch(fetchUsers());
      return user; // Return the user object so that it becomes the payload
    } catch (error) {
      throw error;
    }
  }
);

export const firebaseUsersCollection = createAsyncThunk(
  "auth/firebaseUsersCollection",
  async ({ values, user }) => {
    try {
      const docId = user.uid;
      const usersDoc = doc(db, "users", docId);

      const userData = {
        displayName: values.name + " " + values.last,
        email: user.email,
        userId: user.uid,
        createdOn: user.metadata.creationTime,
        role: "guest",
      };

      if (user.providerData) {
        userData.provider = user.providerData;
      }

      await setDoc(usersDoc, userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const firebaseProviderUsersCollection = createAsyncThunk(
  "auth/firebaseProviderUsersCollection",
  async (user) => {
    try {
      const docId = user.uid;
      const usersDoc = doc(db, "users", docId);

      const userData = {
        displayName: user.displayName,
        email: user.email,
        userId: user.uid,
        createdOn: user.metadata.creationTime,
        role: "standard",
      };

      if (user.providerData) {
        userData.provider = user.providerData;
      }

      await setDoc(usersDoc, userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async (selectedProvider, { dispatch }) => {
    let provider;
    if (selectedProvider === "facebook") {
      provider = new FacebookAuthProvider();
    }
    if (selectedProvider === "google") {
      provider = new GoogleAuthProvider();
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);
      dispatch(signInUser(user));
      if (isNewUser === true) {
        dispatch(firebaseProviderUsersCollection(user));
      }
      dispatch(fetchFirestoreUserById(user.uid));
      dispatch(appLoaded());
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const signOutFirebase = createAsyncThunk(
  "auth/signOutFirebase",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_URL}/users`
    ); // Replace with your Cloud Function URL
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();

    const usersObject = users.reduce((acc, user) => {
      acc[user.uid] = user;

      return acc;
    }, {});
    return usersObject;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
});

export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (userId, { getState, dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_URL}/users/${userId}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log("Error response:", errorResponse);
        throw new Error("Failed to fetch user");
      }
      const user = await response.json();

      // Dispatch the user data to the state
      dispatch(authSlice.actions.setUser(user));
    } catch (error) {
      console.log("Failed to fetch user:", error);
      throw error;
    }
  }
);

export const fetchFirestoreUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (uid, thunkAPI) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnapshot = await getDoc(userDocRef);

      console.log(userDocSnapshot);

      return userDocSnapshot.data();
    } catch (error) {
      console.log("fetchError:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    signInUser: (state, action) => {
      const { email, photoURL, uid, displayName, providerData } =
        action.payload;
      state.authenticated = true;
      state.currentUser = {
        email,
        photoURL: photoURL || null,
        uid,
        displayName,
        providerId: providerData?.providerId,
        role: "guest",
      };
    },

    signOutUser: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
    setLocation: (state, action) => {
      state.prevLocation = state.currentLocation;
      state.currentLocation = action.payload;
    },
    setUser: (state, action) => {
      state.users[action.payload.id] = action.payload;
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      delete state.users[userId];
    },
    updateUserRole: (state, action) => {
      if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchFirestoreUserById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFirestoreUserById.fulfilled, (state, action) => {
        state.status = "succeeded";

        const user = action.payload;
        state.currentUser = {
          ...state.currentUser,

          role: user.role,
        };
      })
      .addCase(fetchFirestoreUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("Failed fetching user by ID:", action.error.message);
      })

      .addCase(verifyAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user;
        } else {
          state.user = null;
        }
        state.isLoading = false;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error fetching users:", action.error.message);
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const user = action.payload;
        console.log("User object:", user);
        state.users[user.uid] = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          metadata: user.metadata,
          role: user.role,
        };
        if (state.currentUser && state.currentUser.uid === user.uid) {
          state.currentUser.role = user.role;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("Failed to fetch user:", action.error);
      })
      // Add the following case to handle when setUser is called without fetching users first
      .addCase(authSlice.actions.setUser, (state, action) => {
        const user = action.payload;
        state.users[user.uid] = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          metadata: user.metadata,
          role: user.role,
        };
      })
      .addCase(socialLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authenticated = true;
        state.currentUser = action.payload;
      })

      .addCase(socialLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signOutFirebase.fulfilled, (state) => {
        state.authenticated = false;
        state.currentUser = null;
      })
      .addCase(signOutFirebase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(firebaseUsersCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(firebaseUsersCollection.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.users[newUser.uid] = newUser;
        state.currentUser = action.payload;
      })
      .addCase(firebaseUsersCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error(
          "Error adding document to firebase:",
          action.error.message
        );
      })

      .addCase(firebaseProviderUsersCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(firebaseProviderUsersCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(firebaseProviderUsersCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error(
          "Error adding document to firebase:",
          action.error.message
        );
      })
 
  },
});

export const { signInUser, signOutUser, setLocation, resetState } =
  authSlice.actions;
export const getAuthentication = (state) => state.auth.authenticated;
export const getCurrentUserFromState = (state) => state.auth.currentUser;
export const getUsersFromState = (state) => state.auth.users;
export const getUserById = (state, userId) => {
  if (!userId) {
    return null;
  }
  if (!state.auth || !state.auth.users) {
    return null;
  }
  const user = state.auth.users[userId];
  if (!user) {
  }
  return user;
};

export default authSlice.reducer;
