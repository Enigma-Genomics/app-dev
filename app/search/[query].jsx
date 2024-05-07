import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../../components/VideoCard';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import useAppWrite from '../../lib/useAppwrite';
import { searchPosts } from '../../lib/appwrite';

const Query = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite( () => searchPosts(query))
  useEffect(() => {
    refetch();
  }, [query])
  console.log(query, posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 space-y-6 my-6">
            <View className="justify-between items-start flex-row mb-4">
              <View>
                <Text className="text-gray-300 text-sm font-psemibold">
                  Search Results
                </Text>
                <Text className="text-white text-xl font-psemibold">
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput initialQuery={query} placeholder='Search for a video topic' />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No videos found' subtitle='Search for some other words' />
        )}
      />
    </SafeAreaView>
  )
}

export default Query