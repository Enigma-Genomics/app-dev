import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signup = async () => {
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      // set global state
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Errors', error.message);
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
            Sign up to Vide
          </Text>
          <FormField
            title="Full Name"
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign up"
            handlePress={signup}
            containerStyles="w-full mt-7"
          />
          <View className="justify-center w-full flex-row gap-2 pt-5">
            <Text className="text-gray-200">Already have an account?</Text>
            <Link className="text-secondary font-psemibold" href={"/sign-in"}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
