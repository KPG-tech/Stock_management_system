import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../services/api';

const AddStockScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');

  const handleAddStock = async () => {
    if (!name || !quantity || !price) {
      Alert.alert('Missing Fields', 'Please fill in Name, Quantity, and Price.');
      return;
    }

    try {
      await api.post('/stocks', {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        supplier,
        description
      });
      Alert.alert('Success', 'Stock item added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add stock');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput style={styles.input} placeholder="Item name" placeholderTextColor="#9ca3af" value={name} onChangeText={setName} />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Quantity *</Text>
              <TextInput style={styles.input} placeholder="0" placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Price *</Text>
              <TextInput style={styles.input} placeholder="0.00" placeholderTextColor="#9ca3af" value={price} onChangeText={setPrice} keyboardType="numeric" />
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Additional Info</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Supplier</Text>
            <TextInput style={styles.input} placeholder="Supplier name" placeholderTextColor="#9ca3af" value={supplier} onChangeText={setSupplier} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add optional notes here..."
              placeholderTextColor="#9ca3af"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleAddStock} activeOpacity={0.8}>
          <Text style={styles.submitBtnText}>Save Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 15 },
  inputGroup: { marginBottom: 16 },
  row: { flexDirection: 'row' },
  label: { fontSize: 14, fontWeight: '600', color: '#4b5563', marginBottom: 6 },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: { height: 100, paddingTop: 12 },
  submitBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default AddStockScreen;
