import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Building2,
  ChevronRight,
  Clock,
  Eye,
  Home,
  MoreHorizontal,
  Phone,
  Zap
} from 'lucide-react-native';
import React from 'react';
import { Alert, Image, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

const DashboardScreen = ({ 
  userName = "Segun Ojo",
  balance = "4,022.53"
}) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();

  const billsData = [
    {
      id: 1,
      icon: Phone,
      title: 'Airtime',
      color: themeColors.success,
      onPress: () => Alert.alert('Airtime', 'Navigate to airtime purchase')
    },

    {
      id: 3,
      icon: Clock,
      title: 'Betting',
      color: colors.text,
      onPress: () => Alert.alert('Betting', 'Navigate to betting')
    },
  
    {
      id: 5,
      icon: Zap,
      title: 'Electricity',
      color: themeColors.warning,
      onPress: handleElectricityBill
    },


    {
      id: 8,
      icon: MoreHorizontal,
      title: 'More',
      color: colors.text,
      onPress: () => Alert.alert('More', 'Show more options')
    }
  ];

  const transactions = [
    {
      id: 1,
      icon: Zap,
      iconColor: themeColors.warning,
      title: 'Electricity Bill',
      subtitle: 'March 15, 2024 - 10:30 AM',
      amount: '- ₦2,500.00',
      status: 'Successful',
      isNegative: true
    },
    {
      id: 2,
      icon: Building2,
      iconColor: themeColors.secondary,
      title: 'Service Charge',
      subtitle: 'March 14, 2024 - 09:15 AM',
      amount: '- ₦1,200.00',
      status: 'Successful',
      isNegative: true
    },
    {
      id: 3,
      icon: ArrowDown,
      iconColor: themeColors.success,
      title: 'Money Received',
      subtitle: 'March 13, 2024 - 14:22 PM',
      amount: '+ ₦5,000.00',
      status: 'Successful',
      isNegative: false
    },
    {
      id: 4,
      icon: Home,
      iconColor: themeColors.warning,
      title: 'Daily Reward',
      subtitle: 'March 12, 2024 - 08:17 AM',
      amount: '+ ₦110.00',
      status: 'Successful',
      isNegative: false
    }
  ];

  const handleAddMoney = () => {
    Alert.alert('Add Money', 'Navigate to add money screen');
  };

  const handleWithdraw = () => {
    Alert.alert('Withdraw', 'Navigate to withdraw screen');
  };

  const handleElectricityBill = () => {
    Alert.alert('Electricity Bill', 'Navigate to electricity bill payment');
  };

  const handleServiceCharge = () => {
    Alert.alert('Service Charge', 'Navigate to service charge payment');
  };

  const handleTransactionHistory = () => {
    Alert.alert('Transaction History', 'Navigate to full transaction history');
  };

  const handleSeeAllTransactions = () => {
    Alert.alert('See All', 'Navigate to all transactions');
  };

  const handleNotification = () => {
    Alert.alert('Notifications', 'Show notifications');
  };

  return (
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={tw`flex-row items-center justify-between px-6 pt-12 pb-6`}>
          <ThemedView style={tw`flex-row items-center`}>
            <ThemedView style={tw`w-10 h-10 bg-orange-400 rounded-full mr-3 overflow-hidden`}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                style={tw`w-full h-full`}
              />
            </ThemedView>
            <ThemedView>
              <ThemedText type="caption">Hello 👋</ThemedText>
              <ThemedText type="subtitle">{userName}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={tw`flex-row items-center`}>
            <ThemedButton variant="ghost" size="small" onPress={handleNotification}>
              <Bell size={24} color={colors.text} />
            </ThemedButton>
          </ThemedView>
        </ThemedView>

        {/* Balance Card */}
        <ThemedView style={tw`mx-6 mb-8`}>
          <ThemedView style={[tw`rounded-3xl p-6`, { backgroundColor: themeColors.primary }]}>
            <ThemedView style={tw`flex-row items-center justify-between mb-4`}>
              <ThemedView style={tw`flex-row items-center`}>
                <ThemedText style={tw`text-white text-sm opacity-90 mr-2`}>Total Balance</ThemedText>
                <Eye size={16} color="#ffffff" opacity={0.9} />
              </ThemedView>
              <ThemedButton 
                variant="ghost"
                size="small"
                style={tw`flex-row items-center`}
                onPress={handleTransactionHistory}
              >
                <ThemedText style={tw`text-white text-sm mr-1`}>Transaction History</ThemedText>
                <ChevronRight size={16} color="#ffffff" />
              </ThemedButton>
            </ThemedView>
            <ThemedText style={tw`text-white text-4xl font-bold mb-6`}>₦ {balance}</ThemedText>
            <ThemedView style={tw`flex-row justify-between`}>
              <ThemedButton 
                variant="ghost"
                style={tw`bg-black bg-opacity-20 rounded-2xl px-6 py-3 flex-row items-center flex-1 mr-3`}
                onPress={handleAddMoney}
              >
                <ArrowDown size={20} color="#ffffff" style={tw`mr-2`} />
                <ThemedText style={tw`text-white font-semibold`}>Add Money</ThemedText>
              </ThemedButton>
              <ThemedButton 
                variant="ghost"
                style={tw`bg-black bg-opacity-20 rounded-2xl px-6 py-3 flex-row items-center flex-1 ml-3`}
                onPress={handleWithdraw}
              >
                <ArrowUp size={20} color="#ffffff" style={tw`mr-2`} />
                <ThemedText style={tw`text-white font-semibold`}>Withdraw</ThemedText>
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Pay a Bill Section */}
        <ThemedView style={tw`px-8 mb-8`}>
          <ThemedView style={tw`flex-row items-center mb-6`}>
            <ThemedText type="subtitle">Pay a Bill</ThemedText>
          </ThemedView>
          
          {/* Grid Layout for Bills - 4x2 Grid */}
          <ThemedView style={tw`w-full mx-2`}>
            {/* Render bills in rows of 4 */}
            {Array.from({ length: Math.ceil(billsData.length / 4) }, (_, rowIndex) => (
              <ThemedView key={rowIndex} style={tw`flex-row justify-between ${rowIndex < Math.ceil(billsData.length / 4) - 1 ? 'mb-6' : ''}`}>
                {billsData.slice(rowIndex * 4, (rowIndex + 1) * 4).map((bill) => {
                  const IconComponent = bill.icon;
                  return (
                    <ThemedView key={bill.id} style={tw`items-center w-16`}>
                      <ThemedButton 
                        variant="ghost"
                        style={tw`items-center mb-2`}
                        onPress={bill.onPress}
                      >
                        <ThemedView variant="surface" style={tw`w-16 h-16 rounded-2xl items-center justify-center`}>
                          <IconComponent size={24} color={bill.color} />
                        </ThemedView>
                      </ThemedButton>
                      <ThemedText type="caption" style={tw`text-center text-xs`}>{bill.title}</ThemedText>
                    </ThemedView>
                  );
                })}
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Recent Transactions */}
        <ThemedView style={tw`px-6 mb-8`}>
          <ThemedView style={tw`flex-row items-center justify-between mb-4`}>
            <ThemedView style={tw`flex-row items-center`}>
              <ThemedText type="subtitle">Recent Transaction</ThemedText>
            </ThemedView>
            <ThemedButton variant="ghost" size="small" onPress={handleSeeAllTransactions}>
              <ThemedText type="caption">See all</ThemedText>
            </ThemedButton>
          </ThemedView>

          {transactions.map((transaction) => {
            const IconComponent = transaction.icon;
            return (
              <ThemedButton 
                key={transaction.id}
                variant="ghost"
                style={[tw`flex-row items-center justify-between py-4 border-b`, { borderBottomColor: colors.border }]}
              >
                <ThemedView style={tw`flex-row items-center flex-1`}>
                  <ThemedView variant="surface" style={tw`w-12 h-12 rounded-2xl items-center justify-center mr-4`}>
                    <IconComponent size={20} color={transaction.iconColor} />
                  </ThemedView>
                  <ThemedView style={tw`flex-1`}>
                    <ThemedText style={tw`font-semibold mb-1`}>{transaction.title}</ThemedText>
                    <ThemedText type="caption">{transaction.subtitle}</ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedView style={tw`items-end`}>
                  <ThemedText 
                    type={transaction.isNegative ? 'error' : 'success'}
                    style={tw`font-semibold mb-1`}
                  >
                    {transaction.amount}
                  </ThemedText>
                  <ThemedText type="caption" style={tw`text-xs`}>{transaction.status}</ThemedText>
                </ThemedView>
              </ThemedButton>
            );
          })}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default DashboardScreen;