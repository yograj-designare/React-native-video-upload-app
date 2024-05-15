import { useRouter, useFocusEffect, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import Loader from "../components/Loader";
import "react-native-reanimated";

const Welcome = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoggedIn) return <Redirect href="/home" />;

  return (
    <>
      {isLoading && !isLoggedIn && <Loader isLoading={isLoading} />}
      {!isLoading && !isLoggedIn && (
        <SafeAreaView className="bg-primary h-full">
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full items-center min-h-[85vh] justify-center px-4">
              <Image
                source={images.logo}
                className="w-[130px] h-[84px]"
                resizeMode="contain"
              />
              <Image
                source={images.cards}
                className="max-w-[380px] w-full h-[300px]"
                resizeMode="contain"
              />

              <View className="relative mt-5">
                <Text className="text-3xl text-white text-center font-bold">
                  Discover Endles Possibilities with{" "}
                  <Text className="text-secondary-200">Aora</Text>
                </Text>
                <Image
                  source={images.path}
                  resizeMode="contain"
                  className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                />
              </View>
              <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                Where creativity meets innovation: embark on a journey of
                limitles exploration with Aora
              </Text>
              <CustomButton
                title="Continue with Email"
                handlePress={() => {
                  router.push("/sign-in");
                }}
                containerStyles="w-full mt-7"
              />
            </View>
          </ScrollView>
          <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
      )}
    </>
  );
};

export default Welcome;
