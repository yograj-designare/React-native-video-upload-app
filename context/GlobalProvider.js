import React, { createContext, useContext, useEffect, useState } from "react";

import { getAllSavedPosts, getCurrentUser } from "../lib/appwrite";
import { getAllPosts } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [bookmarkItems, setBookmarkItems] = useState([]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setIsLoggedIn(true);
          setUser(userData);
          // Fetching the Saved videos data for the current user
          const allPosts = await getAllSavedPosts(userData?.$id);
          if (allPosts) {
            const getLikedPostsByCurrentUser = allPosts.map((e) => {
              return {
                documentId: e.$id,
                likes: e.likes,
                data: e 
              };
            });
            setBookmarkItems(getLikedPostsByCurrentUser);
          } else {
            setBookmarkItems([]);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error, "errors");
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    currentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        bookmarkItems,
        setBookmarkItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
