import { Link, Stack } from 'expo-router';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react-native';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <View style={tw`flex-1 bg-black`}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        
        <View style={tw`flex-1 items-center justify-center px-6`}>
          {/* Error Icon */}
          <View style={tw`w-24 h-24 bg-gray-800 rounded-full items-center justify-center mb-8`}>
            <AlertCircle size={48} color="#ef4444" />
          </View>

          {/* Error Code */}
          <Text style={tw`text-gray-500 text-6xl font-bold mb-4`}>404</Text>

          {/* Error Title */}
          <Text style={tw`text-white text-2xl font-bold mb-4 text-center`}>
            This screen does not exist.
          </Text>

          {/* Error Description */}
          <Text style={tw`text-gray-400 text-base text-center mb-8 leading-6`}>
            The page you're looking for might have been moved, deleted, or doesn't exist.
          </Text>

          {/* Action Buttons */}
          <View style={tw`w-full max-w-sm`}>
            <Link href="/" asChild>
              <TouchableOpacity style={tw`bg-green-500 rounded-2xl py-4 px-6 flex-row items-center justify-center mb-4`}>
                <Home size={20} color="#ffffff" style={tw`mr-3`} />
                <Text style={tw`text-white text-lg font-semibold`}>Go to Home</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity 
              style={tw`bg-gray-800 rounded-2xl py-4 px-6 flex-row items-center justify-center`}
              onPress={() => {
                // This would typically use navigation.goBack() in a real app
                console.log('Go back pressed');
              }}
            >
              <ArrowLeft size={20} color="#ffffff" style={tw`mr-3`} />
              <Text style={tw`text-white text-lg font-semibold`}>Go Back</Text>
            </TouchableOpacity>
          </View>

          {/* Help Text */}
          <Text style={tw`text-gray-500 text-sm text-center mt-8`}>
            If you think this is a mistake, please contact support.
          </Text>
        </View>
      </View>
    </>
  );
}