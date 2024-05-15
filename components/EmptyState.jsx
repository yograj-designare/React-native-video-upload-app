import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subTitle, buttonTitle = 'Create Video', redirectTo = '/create' }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-semibold mt-2 text-white">{title }</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
        <CustomButton title={buttonTitle} handlePress={() => router.push(redirectTo)} containerStyles={'w-full my-7'}/>
    </View>
  );
};

export default EmptyState;
