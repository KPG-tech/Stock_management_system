import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StockListScreen from '../screens/StockListScreen';
import AddStockScreen from '../screens/AddStockScreen';
import EditStockScreen from '../screens/EditStockScreen';
import StockDetailScreen from '../screens/StockDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // Screens for logged in users
          <>
            <Stack.Screen name="StockList" component={StockListScreen} options={{ title: 'My Stocks' }} />
            <Stack.Screen name="AddStock" component={AddStockScreen} options={{ title: 'Add Stock Item' }} />
            <Stack.Screen name="EditStock" component={EditStockScreen} options={{ title: 'Edit Stock Item' }} />
            <Stack.Screen name="StockDetail" component={StockDetailScreen} options={{ title: 'Stock Details' }} />
          </>
        ) : (
          // Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
