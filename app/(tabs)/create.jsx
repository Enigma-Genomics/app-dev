import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType) => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail: result.assets[0]});
      }
      if(selectType === 'video'){
        setForm({...form, video: result.assets[0]});
      }
    }
  }

  const submit = async () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail){
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true);

    try {
      await createVideo({
        ...form, userId: user.$id,
      });
      Alert.alert('Success', 'Post uploaded!')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  }
  return (
    <SafeAreaView className='h-full bg-primary w-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-white text-xl font-psemibold'>
          Upload Video
        </Text>
        <FormField
        title='Video Title'
        value={form.title}
        handleChange={(e) => setForm({ ...form, title: e })}
        placeholder='A catchy title for your video'
        otherStyles='mt-8'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-gray-100 font-pregular text-base'>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
              source={{uri: form.video.uri}}
              resizeMode={ResizeMode.COVER}
              isLooping
              useNativeControls
              className='h-64 w-full rounded-2xl'
              shouldPlay
              />
            ) : (
              <View className=' justify-center items-center w-full px-4 h-40 bg-black-100 rounded-2xl'>
                <Image source={icons.upload} className='h-8 w-8' resizeMode='contain' />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-gray-100 font-pregular text-base'>Upload Thumbnail</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
              source={{uri: form.thumbnail.uri}}
              className='w-full h-64 rounded-xl'
              resizeMode='cover'
              />
            ) : (
              <View className='justify-center flex-row items-center w-full space-x-2 h-16 bg-black-100 rounded-2xl'>
                <Image source={icons.upload} className='h-8 w-8' resizeMode='contain' />
                <Text className='text-gray-200 text-sm'>Select a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
        title='Video Prompt'
        value={form.prompt}
        handleChange={(e) => setForm({ ...form, prompt: e })}
        placeholder='The prompt you used to create this video'
        otherStyles='mt-8'
        />
        <CustomButton
        title='Submit & Publish'
        handlePress={submit}
        containerStyles='mt-7'
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create