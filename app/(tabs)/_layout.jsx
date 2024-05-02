import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const tabOptions = [
  {
    name: 'home',
    title: 'Home',
    icon: icons.home,
  },
  {
    name: 'create',
    title: 'Create',
    icon: icons.plus,
  },
  {
    name: 'bookmark',
    title: 'Bookmark',
    icon: icons.bookmark,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: icons.profile,
  }
]
const TabIcon = ({icon, color, name, focused}) => {
  return <View className=' justify-center items-center'>
    <Image
    source={icon}
    resizeMode='contain'
    tintColor={color}
    className='w-6 h-4'
    />
    <Text className={`${focused} ? 'font-psemibold': 'font-pregular' text-xs`} style={{ color: color }}>{name}</Text>
  </View>
}
const TabsLayout = () => {
  return (
    <>
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FF9001',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle:{
        backgroundColor: '#161622'
      }
    }}
    >
      {tabOptions.map((option) => (
        <Tabs.Screen key={option.name} name={option.name}
        options={{
          title: option.name,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
            icon={option.icon}
            color={color}
            focused={focused}
            name={option.title}
            />
          )
        }}
         />
      ))}
    </Tabs>
    </>
  )
}

export default TabsLayout