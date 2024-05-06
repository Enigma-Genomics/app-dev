import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="h-[215px] w-[270px]"
        resizeMode="contain"
      />
      <Text className="text-white text-center text-xl font-psemibold">
        {title}
      </Text>
      <Text className="text-gray-300 text-sm mt-2 mb-2 font-pmedium">
        {subtitle}
      </Text>
      <CustomButton containerStyles='w-full my-2' handlePress={() => router.push('/create')} title='Upload Video' />
    </View>
  );
};

export default EmptyState;
