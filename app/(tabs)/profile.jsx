import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../../components/VideoCard';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import useAppWrite from '../../lib/useAppwrite';
import { getUserPosts, searchPosts, signout } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons, images } from '../../constants';
import InfoBox from '../../components/Infobox';

const Profile = () => {
  const { user, setUser, setIsSignedIn } = useGlobalContext();
  const { data: posts } = useAppWrite( () => getUserPosts(user.$id));

  const logout = async () => {
    await signout();
    setUser(null);
    setIsSignedIn(false);
    router.replace('/sign-in');
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='items-center justify-center mt-6 w-full mb-16 px-4'>
            <TouchableOpacity
            className='w-full items-end mb-8'
            onPress={logout}
            >
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg items-center justify-center'>
              <Image
              source={{
                uri: user?.avatar
              }}
              className=' w-[90%] h-[90%] rounded-lg'
              resizeMode='contain'
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles='text-lg'
            />
            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1M"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No videos found' subtitle='Search for some other words' />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile