import { Stack, Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


    export default function RootLayout() {
    return (
        <Tabs   screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
              backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
            backgroundColor: '#25292e',
            },
          }}>
            <Tabs.Screen name='index' options={{ title: 'Home', 
                tabBarIcon: ({ color, focused }) => 
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} /> }} />
            <Tabs.Screen name='camera' options={{ title: 'TakePicture',
                tabBarIcon: ({ color, focused }) => 
                <Ionicons name={focused ? 'camera-sharp' : 'camera-outline'} color={color} size={24} /> }} />

        </Tabs>
    );
  }
//   <Stack>
//   <Stack.Screen name="home" options={{ title: 'Home'}}/>
//   <Stack.Screen name="camera" options={{ title: 'Camera'}}/>
//   <Stack.Screen name="map" options={{ title: 'Map'}}/>
// </Stack>