import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const IntroScreen = ({ onGetStarted }) => {
  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Top Section with App Icons */}
      <View style={tw`flex-1 items-center justify-center px-6`}>
        {/* Floating App Icons */}
        <View style={tw`absolute top-20 left-8`}>
          <View style={tw`w-12 h-12 bg-blue-600 rounded-xl items-center justify-center mb-4`}>
            <Text style={tw`text-white font-bold text-lg`}>PS</Text>
          </View>
          <View style={tw`w-10 h-10 bg-green-600 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>LE</Text>
          </View>
        </View>

        <View style={tw`absolute top-16 right-8`}>
          <View style={tw`w-12 h-12 bg-red-600 rounded-xl items-center justify-center mb-4`}>
            <Text style={tw`text-white font-bold text-sm`}>NETFLIX</Text>
          </View>
        </View>

        <View style={tw`absolute top-40 left-12`}>
          <View style={tw`w-10 h-10 bg-green-500 rounded-full items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>♫</Text>
          </View>
        </View>

        <View style={tw`absolute top-32 right-16`}>
          <View style={tw`w-10 h-10 bg-blue-400 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>ZOOM</Text>
          </View>
        </View>

        <View style={tw`absolute bottom-60 left-4`}>
          <View style={tw`w-10 h-10 bg-yellow-500 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>MTN</Text>
          </View>
        </View>

        {/* Central Phone Mockup */}
        <View style={tw`items-center mt-20`}>
          {/* Phone Frame */}
          <View style={tw`w-48 h-80 bg-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-700`}>
            <View style={tw`flex-1 bg-black rounded-2xl items-center justify-center relative overflow-hidden`}>
              {/* Phone Screen Content */}
              <View style={tw`items-center`}>
                {/* Hoabill Logo/Wave */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-green-400 text-3xl font-bold`}>∽</Text>
                </View>
                <Text style={tw`text-green-400 text-lg font-semibold`}>Hoabill</Text>
              </View>
              
              {/* Decorative wave elements */}
              <View style={tw`absolute top-8 left-4`}>
                <Text style={tw`text-green-400 text-lg`}>∽</Text>
              </View>
              <View style={tw`absolute bottom-12 right-6`}>
                <Text style={tw`text-green-400 text-lg`}>∽</Text>
              </View>
            </View>
          </View>
          
          {/* Hand holding phone effect */}
          <View style={tw`absolute -bottom-8 w-56 h-16 bg-amber-100 rounded-t-full opacity-80`} />
          <View style={tw`absolute -bottom-4 left-8 w-8 h-8 bg-amber-200 rounded-full`} />
          <View style={tw`absolute -bottom-2 right-12 w-6 h-6 bg-amber-200 rounded-full`} />
        </View>
      </View>

      {/* Bottom Section with Text and Button */}
      <View style={tw`px-8 pb-12`}>
        <View style={tw`mb-8`}>
          <Text style={tw`text-white text-3xl font-bold text-center mb-4`}>
            Welcome to Hoabill
          </Text>
          <Text style={tw`text-gray-400 text-base text-center leading-6`}>
            Stay on top of your bills, with a seamless{'\n'}
            bill payment experience right at your fingertips.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={tw`bg-green-500 py-4 rounded-2xl shadow-lg`}
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Bottom indicator */}
        <View style={tw`items-center mt-6`}>
          <View style={tw`w-32 h-1 bg-gray-600 rounded-full`} />
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;