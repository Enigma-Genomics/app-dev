import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, handleChange, placeholder, otherStyles, ...props }) => {
  const [show, setshow] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium '>{title}</Text>
      <View className='w-full h-12 border border-black-200 px-4 focus:border-secondary items-center rounded-lg flex-row'>
        <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        secureTextEntry={!show && title === 'Password'}
        className='w-full h-full flex-1 font-psemibold text-white'
        />
        {title === 'Password' &&
        <TouchableOpacity onPress={() => setshow(!show)}>
        <Image  className='h-6 w-6' resizeMode='contain' source={ show ? icons.eye : icons.eyeHide} />
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default FormField