import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router';

const SearchInput = ({title, value, handleChange, initialQuery, placeholder, otherStyles, ...props }) => {
  const [query, setQuery] = useState( initialQuery || '');
  const pathName = usePathname();
  return (
      <View className='w-full h-12 space-x-4 border border-black-200 px-4 focus:border-secondary items-center rounded-lg flex-row'>
        <TextInput
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        className='text-base placeholder:text-white w-full flex-1 h-full text-white mt-0.5'
        />
        <TouchableOpacity
        onPress={() => {
          if(!query){
            return Alert.alert('Missing Queries', 'Please input something to search across database!')
          }
          if(pathName.startsWith('/search')) router.setParams({query})
          else router.push(`/search/${query}`)
        }}
        >
        <Image  className='h-5 w-5' resizeMode='contain' source={icons.search} />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput