import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getAllSavedPosts, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

import { usePathname } from "expo-router";

const Bookmark = () => {
  const path = usePathname()
  const osName = Platform.OS;

  const { user, bookmarkItems } = useGlobalContext();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getAllSavedPosts(user?.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const savedPosts = posts.filter((e) =>
    bookmarkItems.some((item) => item.documentId === e.$id)
  );

  useEffect(() => {
    onRefresh()
  }, [path]);

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={savedPosts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <Text className="text-2xl font-psemibold text-white">
                Saved Videos
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={""}
                  placeholder={"Search for a video topic"}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <>
              {isLoading && (
                <ActivityIndicator
                  animating={isLoading}
                  color="#fff"
                  size={osName === "ios" ? "large" : 50}
                />
              )}
              {!isLoading && (
                <EmptyState
                  title="No Videos Found"
                  subTitle="You havn't save any video yet"
                  buttonTitle="Browse Videos"
                  redirectTo="/"
                />
              )}
            </>
          )}
          
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Bookmark;
