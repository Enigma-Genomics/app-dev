import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
const SignIn = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] my-6 px-4'>
          <View className=' flex flex-row gap-2'>
            <Image source={images.logoSmall} className=' w-[35px] h-[40px]' resizeMode='contain' />
            <Text className=' font-pbold text-white text-4xl'>Vide</Text>
          </View>
          <Text className='text-white text-2xl mt-4 font-psemibold'>Login to Vide</Text>
        </View>
        <FormField />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn