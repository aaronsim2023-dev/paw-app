import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search by name, breed...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={18} color={Colors.mediumGray} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGray}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color={Colors.mediumGray} />
          </TouchableOpacity>
        )}
      </View>
      {onFilterPress && (
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.veryLightGray,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.charcoal,
    padding: 0,
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
});
