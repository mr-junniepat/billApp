import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import {
  ArrowDown,
  Bell,
  Building2,
  Clock,
  Dumbbell,
  Home,
  MoreHorizontal,
  Zap
} from 'lucide-react-native';
import React from 'react';
import { Alert, FlatList, Image, ScrollView, StatusBar, View } from 'react-native';
import tw from 'twrnc';

const DashboardScreen = ({ 
  userName = "Segun Ojo",
  balance = "4,022.53"
}) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();

  const handleElectricityBill = () => {
    Alert.alert('Electricity Bill', 'Navigate to electricity bill payment');
  };

  const billsData = [


    {
      id: 1,
      icon: Clock,
      title: 'Service Charge',
      color: colors.text,
      onPress: () => Alert.alert('Betting', 'Navigate to betting')
    },
  
    {
      id: 2,
      icon: Zap,
      title: 'Electricity',
      color: themeColors.warning,
      onPress: handleElectricityBill
    },

        {
      id: 3,
      icon: Dumbbell,
      title: 'Gym',
      color: themeColors.primary,
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

  const dueBills = [
    { id: 1, title: 'Service Charge', maskedId: '3854', dueDate: '5th Jul', status: 'EARLY', amount: 40000, color: '#5B4FFF' },
    { id: 2, title: 'Electricity', maskedId: '1289', dueDate: '10th Jul', status: 'DUE SOON', amount: 12000, color: '#FFB800' },
    { id: 3, title: 'Gym Membership', maskedId: '9921', dueDate: '20th Jul', status: 'OVERDUE', amount: 5000, color: '#FF4F4F' },
  ];

  const [activeBillIndex, setActiveBillIndex] = React.useState(0);

  const CARD_WIDTH = 300;

  const renderBillCard = ({ item }: { item: typeof dueBills[0] }) => (
    <ThemedView style={[
      tw`rounded-3xl p-0 mx-2`,
      { backgroundColor: item.color, width: CARD_WIDTH, minHeight: 160, justifyContent: 'flex-start' }
    ]}>
      {/* Top Row: Title and Masked ID */}
      <ThemedView style={tw`flex-row justify-between items-center px-6 pt-6`}>
        <ThemedText style={tw`text-white text-base font-semibold tracking-widest`}>{item.title}</ThemedText>
        <ThemedText style={tw`text-white text-base font-semibold`}>•••• {item.maskedId}</ThemedText>
      </ThemedView>
      {/* Due Date and Status */}
      <ThemedView style={tw`flex-row items-center px-6 mt-2 mb-4 justify-between`}>
        <ThemedText style={tw`text-white text-sm`}>Due Date {item.dueDate}</ThemedText>
        <ThemedView style={[tw`px-3 py-1 rounded-full`, { backgroundColor: 'rgba(255,255,255,0.3)' }]}> 
          <ThemedText style={tw`text-white text-xs font-bold`}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>
      {/* Amount and Pay Button */}
      <ThemedView style={tw`flex-row items-end justify-between px-6 pb-6 flex-1`}>
        <ThemedText style={tw`text-white text-3xl font-extrabold`}>₦{item.amount.toLocaleString()}</ThemedText>
        <ThemedButton
          variant="ghost"
          style={[tw`bg-white rounded-full px-8 py-2`, { minWidth: 80 }]} 
          onPress={() => Alert.alert('Pay Bill', `Pay for ${item.title}`)}
        >
          <ThemedText style={[tw`text-base font-bold`, { color: item.color }]}>PAY</ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );

  const getStatusProps = (status: string) => {
    switch (status) {
      case 'overdue':
        return { color: '#ef4444', label: 'Overdue', icon: '⚠️' };
      case 'due_soon':
        return { color: '#f59e42', label: 'Due Soon', icon: '⏰' };
      case 'paid':
        return { color: '#10b981', label: 'Paid', icon: '✔️' };
      default:
        return { color: '#d1d5db', label: 'Unknown', icon: '❓' };
    }
  };

  const renderTransactionItem = ({ item }: { item: typeof transactions[0] }) => (
    <ThemedButton
      variant="ghost"
      style={tw`flex-row items-center justify-between py-4 px-2 rounded-xl`}
      onPress={() => Alert.alert('Transaction Details', `${item.title}\n${item.subtitle}\n${item.amount}`)}
    >
      {/* Left: Icon */}
      <ThemedView style={[tw`w-12 h-12 rounded-xl items-center justify-center mr-4`, { backgroundColor: '#F3F4F6' }]}> 
        <item.icon size={24} color={item.iconColor} />
      </ThemedView>
      {/* Middle: Title and Subtitle */}
      <ThemedView style={tw`flex-1`}> 
        <ThemedText style={tw`text-base font-semibold mb-1`}>{item.title}</ThemedText>
        <ThemedText style={tw`text-xs text-gray-500`}>{item.subtitle}</ThemedText>
      </ThemedView>
      {/* Right: Amount and Status */}
      <ThemedView style={tw`items-end ml-2`}> 
        <ThemedText style={[tw`text-base font-bold`, { color: item.isNegative ? '#ef4444' : '#10b981' }]}>{item.amount}</ThemedText>
        <ThemedView style={[tw`px-2 py-0.5 rounded-full mt-1`, { backgroundColor: '#E5E7EB' }]}> 
          <ThemedText style={tw`text-xs text-gray-700`}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedButton>
  );

  return (
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={tw`flex-row items-center justify-between px-6 pt-12 pb-0`}>
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

        {/* Bills Card Carousel */}
        <View style={[tw`w-full items-center justify-center`, { minHeight: 240 }]}> 
          <FlatList
            data={dueBills}
            renderItem={renderBillCard}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 16}
            decelerationRate="fast"
            onScroll={e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 16));
              setActiveBillIndex(index);
            }}
            contentContainerStyle={{ paddingHorizontal: 24, alignItems: 'center' }}
            pagingEnabled
            style={{ flexGrow: 0 }}
          />
          {/* Pagination Dots */}
          <View style={tw`flex-row justify-center mt-2`}>
            {dueBills.map((_, idx) => (
              <View
                key={idx}
                style={[
                  tw`mx-1 rounded-full`,
                  { width: 8, height: 8, backgroundColor: idx === activeBillIndex ? '#5B4FFF' : '#E5E7EB' }
                ]}
              />
            ))}
          </View>
        </View>

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
                    <ThemedView key={bill.id} style={tw`flex-col items-center w-16`}>
                      <ThemedButton 
                        variant="ghost"
                        style={tw`items-center mb-2`}
                        onPress={bill.onPress}
                      >
                        <ThemedView variant="surface" style={tw`w-16 h-16 rounded-2xl items-center justify-center`}>
                          <IconComponent size={24} color={bill.color} />
                        </ThemedView>
                      </ThemedButton>
                      <ThemedView>
                        <ThemedText type="caption" style={tw`text-center text-xs`}>{bill.title}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  );
                })}
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Recent Transactions */}
        <ThemedView style={[tw`mx-6 mb-8 rounded-3xl p-0`, { backgroundColor: colors.card }]}> 
          <ThemedView style={tw`flex-row items-center justify-between px-2 pt-2 pb-2`}> 
            <ThemedText type="subtitle">Recent Transactions</ThemedText>
            <ThemedButton variant="ghost" size="small" onPress={handleSeeAllTransactions}>
              <ThemedText type="caption">See all</ThemedText>
            </ThemedButton>
          </ThemedView>
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-200 mx-6`} />}
            contentContainerStyle={tw`px-2 pb-4`}
            scrollEnabled={false}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default DashboardScreen;