import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({title, value, handleChange, placeholder, otherStyles, ...props }) => {
  const [show, setshow] = useState(false);
  return (
      <View className='w-full h-12 space-x-4 border border-black-200 px-4 focus:border-secondary items-center rounded-lg flex-row'>
        <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        className='text-base placeholder:text-white w-full flex-1 h-full text-white mt-0.5'
        />
        <TouchableOpacity>
        <Image  className='h-5 w-5' resizeMode='contain' source={icons.search} />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput