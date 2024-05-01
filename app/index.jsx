import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className=' text-red-600 text-2xl'>Vide!</Text>
      <StatusBar style="auto" />
    </View>
  );
}