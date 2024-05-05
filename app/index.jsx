import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {
  const { isSignedIn, isLoading } = useGlobalContext();
  if(!isLoading && isSignedIn) return <Redirect href='/home' />;
  return (
    <SafeAreaView className=' bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className=' w-full items-center min-h-[85vh] mt-4 justify-center px-4'>
          <View className=' flex flex-row gap-2 items-center justify-center'>
            <Image source={images.logoSmall} className=' w-[35px] h-[40px]' resizeMode='contain' />
            <Text className=' font-pbold text-white text-4xl'>Vide</Text>
          </View>
          <Image source={images.cards} className=' h-[300px] w-[300px]' resizeMode='contain' />
          <View className='mt-5 relative'>
            <Text className='text-3xl font-psemibold text-center text-white'>Unleash Your Creativity with
            <Text className=' text-secondary'> Vide</Text>
            </Text>
            <Image source={images.path} className='w-[135px] h-[10px] absolute -bottom-1 -right-8' resizeMode='contain' />
          </View>
          <CustomButton
          title='Continue with Email'
          handlePress={() => router.push('/sign-in')}
          containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}