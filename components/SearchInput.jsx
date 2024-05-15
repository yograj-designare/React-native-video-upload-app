import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  initialQuery,
  ...props
}) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="mt-0.5 flex-1 text-white font-pregular text-base"
        placeholder={placeholder}
        value={query}
        placeholderTextColor={"#cdcde0"}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
