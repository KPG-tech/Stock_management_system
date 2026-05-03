import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const StockListScreen = ({ navigation }) => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const { logout } = useContext(AuthContext);

  const fetchStocks = async () => {
    try {
      const response = await api.get('/stocks');
      setStocks(response.data);
      setFilteredStocks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch stocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchStocks();
    }
  }, [isFocused]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = stocks.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredStocks(newData);
    } else {
      setFilteredStocks(stocks);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this stock item?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/stocks/${id}`);
            fetchStocks();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete stock');
          }
        } 
      }
    ]);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => await logout() }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.stockCard} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('StockDetail', { stockId: item._id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.itemQty}>Qty: <Text style={styles.qtyNumber}>{item.quantity}</Text></Text>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.editBtn]} 
          onPress={() => navigation.navigate('EditStock', { stock: item })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.deleteBtn]} 
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Inventory</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search stock items..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredStocks}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No stock items found.</Text>
                <Text style={styles.emptySubText}>Click the + button to add one.</Text>
              </View>
            }
          />
        )}

        <TouchableOpacity 
          style={styles.fab} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddStock')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f3f4f6' },
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1f2937' },
  logoutBtn: { backgroundColor: '#fee2e2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  logoutText: { color: '#ef4444', fontWeight: 'bold', fontSize: 14 },
  searchContainer: { paddingHorizontal: 20, paddingBottom: 15 },
  searchBar: { 
    backgroundColor: '#ffffff', 
    borderRadius: 20, 
    paddingHorizontal: 20,
    paddingVertical: 12, 
    fontSize: 16,
    color: '#1f2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  stockCard: { 
    backgroundColor: '#ffffff', 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', flex: 1, marginRight: 10 },
  itemPrice: { fontSize: 18, fontWeight: '800', color: '#10b981' },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  itemQty: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  qtyNumber: { color: '#1f2937', fontWeight: 'bold', fontSize: 16 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 12 },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 8, marginLeft: 10 },
  editBtn: { backgroundColor: '#f3f4f6' },
  deleteBtn: { backgroundColor: '#fee2e2' },
  btnText: { fontWeight: 'bold', fontSize: 13, color: '#374151' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#6b7280' },
  emptySubText: { fontSize: 14, color: '#9ca3af', marginTop: 5 },
  fab: { 
    position: 'absolute', 
    bottom: 30, 
    right: 25, 
    backgroundColor: '#4f46e5', 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: { color: '#ffffff', fontSize: 32, fontWeight: '400', marginTop: -2 }
});

export default StockListScreen;
