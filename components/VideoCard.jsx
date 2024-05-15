import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import { updateLikesInPost } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    $id,
    creator: { username, avatar },
  },
}) => {
  const { user,  bookmarkItems, setBookmarkItems } = useGlobalContext();

  const [play, setPlay] = useState(false);

  const updateVideo = async (documentId, type) => {
    if(bookmarkItems.length > 0 && bookmarkItems.find((e) => e.documentId.includes(documentId))){
      const unlikeVideo = bookmarkItems.filter((e) => e.documentId !== documentId)
      setBookmarkItems(unlikeVideo)
    }else{
      setBookmarkItems([...bookmarkItems, {documentId: documentId, likes: [user?.$id]}])
    }
    await updateLikesInPost(documentId, user.$id);
  }

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
            <Image
              source={{ uri: avatar }}
              resizeMode="contain"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username ?? "fsd"}
            </Text>
          </View>
        </View>
        <View className="">
          <TouchableOpacity
            className="w-6 h-12 items-center justify-center "
          >
            {bookmarkItems.find((e) => e.documentId === $id && e.likes.includes(user.$id)) ? (
              <Text
                onPress={() => updateVideo($id, "unlike")}
                className="text-lg"
              >
                ❤️
              </Text>
            ) : (
              <Text
                className="text-white text-2xl"
                onPress={() => updateVideo($id, "like")}
              >
                ♡
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={({ status }) => {
            if (status?.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
