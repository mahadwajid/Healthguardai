import React from 'react';
import { Image } from 'react-native'; // Import Image for logo
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import Main from '../Pages/Main';
import Form from '../Pages/Form';
import BMI from '../Pages/Bmi';
import Chatbot from '../Pages/Chatbot';

// Custom component for the header logo
function HeaderLogo() {
  return (
    <Image
      source={require('../assets/Logo.png')} // replace with your logo's path
      style={{ width: 240, height: 120, marginLeft: -80, marginBottom: -10 , transform: [{ scale: 1.7 }] }} // adjust size as needed
      resizeMode="contain"
    />
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#006D77' },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HealthGuard') {
              iconName = 'home'; // Home icon
            } else if (route.name === 'Form') {
              iconName = 'assignment'; // Form icon
            } else if (route.name === 'Bmi-Calculator') {
              iconName = 'fitness-center'; // BMI Calculator icon
            } else if (route.name === 'Chatbot') {
              iconName = 'chat'; // Chatbot icon
            }

            // Return the icon with the proper name
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HealthGuard"
          component={Main}
          options={{
            headerShown: true,
            headerTitle: () => <HeaderLogo />, // Show custom header logo
            headerTitleAlign: 'start', // Align the header title to the start (left)
          }}
        />
        <Tab.Screen name="Form" component={Form} options={{ headerShown: false }} />
        <Tab.Screen name="Bmi-Calculator" component={BMI} options={{ headerShown: false }} />
        <Tab.Screen name="Chatbot" component={Chatbot} options={{ headerShown: true }} />
      </Tab.Navigator>
  
  );
};

export default App;
