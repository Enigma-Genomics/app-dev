import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn } from '../../lib/appwrite'
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signin = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      // set global state
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4">
          <View className=" flex flex-row gap-2">
            <Image
              source={images.logoSmall}
              className=" w-[35px] h-[40px]"
              resizeMode="contain"
            />
            <Text className=" font-pbold text-white text-4xl">Vide</Text>
          </View>
          <Text className="text-white text-2xl mt-4 font-psemibold">
            Login to Vide
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={signin}
            containerStyles="w-full mt-7"
          />
          <View className="justify-center w-full flex-row gap-2 pt-5">
            <Text className="text-gray-200">Don't have an account?</Text>
            <Link className="text-secondary font-psemibold" href={"/sign-up"}>
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
