import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/colors';

function TabIcon({
  name,
  focused,
  label,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  label: string;
}) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
        <Ionicons
          name={name}
          size={22}
          color={focused ? Colors.white : Colors.mediumGray}
        />
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="shelters"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'business' : 'business-outline'} focused={focused} label="Shelters" />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'heart' : 'heart-outline'} focused={focused} label="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 82 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
