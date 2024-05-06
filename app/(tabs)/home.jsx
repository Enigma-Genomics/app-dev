import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-gray-300 font-pbold">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 space-y-6 my-6">
            <View className="justify-between items-start flex-row mb-4">
              <View>
                <Text className="text-gray-300 text-sm font-psemibold">
                  Welcome back
                </Text>
                <Text className="text-white text-xl font-psemibold">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="h-9 w-9"
                resizeMode="contain"
              />
            </View>
            <SearchInput placeholder='Search for a video topic' />
            <View className='w-full flex-1 pt-5 pb-8 '>
              <Text className='text-gray-100 text-lg font-regular mb-3'>Latest Videos</Text>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No videos found' subtitle='Be a sport and upload the first video' />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
