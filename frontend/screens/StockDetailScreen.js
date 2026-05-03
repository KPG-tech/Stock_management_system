import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, SafeAreaView } from 'react-native';
import api from '../services/api';

const StockDetailScreen = ({ route }) => {
  const { stockId } = route.params;
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetail = async () => {
      try {
        const response = await api.get(`/stocks/${stockId}`);
        setStock(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch stock details');
      } finally {
        setLoading(false);
      }
    };
    fetchStockDetail();
  }, [stockId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Stock item not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>{stock.name}</Text>
          <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
        </View>

        {/* Details Card */}
        <Text style={styles.sectionTitle}>Inventory Details</Text>
        <View style={styles.detailsCard}>
          
          <View style={styles.row}>
            <Text style={styles.label}>Current Quantity</Text>
            <Text style={[styles.value, { fontWeight: 'bold', fontSize: 18 }]}>{stock.quantity}</Text>
          </View>
          
          {stock.supplier ? (
            <View style={styles.row}>
              <Text style={styles.label}>Supplier</Text>
              <Text style={styles.value}>{stock.supplier}</Text>
            </View>
          ) : null}

          <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Text style={styles.label}>Date Added</Text>
            <Text style={styles.value}>
              {new Date(stock.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Description Card */}
        {stock.description ? (
          <>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{stock.description}</Text>
            </View>
          </>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  center: { justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20 },
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1f2937', marginBottom: 10, textAlign: 'center' },
  price: { fontSize: 32, fontWeight: '900', color: '#10b981' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#6b7280', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase' },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1, 
    borderBottomColor: '#f3f4f6' 
  },
  label: { fontSize: 16, color: '#4b5563', fontWeight: '500' },
  value: { fontSize: 16, color: '#1f2937', fontWeight: '600' },
  descriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  descriptionText: { fontSize: 16, color: '#4b5563', lineHeight: 24 },
  errorText: { fontSize: 18, color: '#ef4444', fontWeight: 'bold' }
});

export default StockDetailScreen;
