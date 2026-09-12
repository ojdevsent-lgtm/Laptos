import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const laptops = [
  { id: '1', brand: 'Apple', name: 'MacBook Air M3', price: 999, ram: '8 GB', storage: '256 GB', use: 'Study • Work', score: 91 },
  { id: '2', brand: 'Lenovo', name: 'IdeaPad Slim 5', price: 699, ram: '16 GB', storage: '512 GB', use: 'Work • Study', score: 88 },
  { id: '3', brand: 'ASUS', name: 'Vivobook 15', price: 599, ram: '16 GB', storage: '512 GB', use: 'Everyday', score: 86 },
  { id: '4', brand: 'HP', name: 'Pavilion 14', price: 749, ram: '16 GB', storage: '512 GB', use: 'Work • Business', score: 87 },
  { id: '5', brand: 'Acer', name: 'Swift Go 14', price: 799, ram: '16 GB', storage: '1 TB', use: 'Coding • Work', score: 90 },
  { id: '6', brand: 'Dell', name: 'Inspiron 14', price: 649, ram: '16 GB', storage: '512 GB', use: 'Business • Study', score: 85 },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return laptops;
    return laptops.filter((laptop) => `${laptop.brand} ${laptop.name} ${laptop.use}`.toLowerCase().includes(q));
  }, [query]);

  const toggleSaved = (id: string) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.eyebrow}>SMART LAPTOP DISCOVERY</Text>
                <Text style={styles.title}>Find your next laptop.</Text>
              </View>
              <View style={styles.logo}><Ionicons name="laptop-outline" size={24} color="#fff" /></View>
            </View>
            <Text style={styles.subtitle}>Compare specs, understand performance, and choose with confidence.</Text>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={20} color="#8390A7" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search laptops, brands..."
                placeholderTextColor="#8390A7"
                style={styles.searchInput}
              />
            </View>
            <View style={styles.quickRow}>
              {['Gaming', 'Coding', 'Study', 'Business'].map((label) => (
                <Pressable key={label} onPress={() => setQuery(label)} style={styles.chip}>
                  <Text style={styles.chipText}>{label}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <Text style={styles.resultCount}>{filtered.length} laptops</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const isSaved = saved.includes(item.id);
          return (
            <View style={styles.card}>
              <View style={styles.cardIcon}><Ionicons name="laptop-outline" size={30} color="#5B8CFF" /></View>
              <View style={styles.cardMain}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.use}>{item.use}</Text>
                <View style={styles.specRow}>
                  <Text style={styles.spec}>{item.ram}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.spec}>{item.storage}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.spec}>Score {item.score}</Text>
                </View>
                <Text style={styles.price}>${item.price.toLocaleString()}</Text>
              </View>
              <Pressable onPress={() => toggleSaved(item.id)} hitSlop={10} style={styles.saveButton}>
                <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={22} color={isSaved ? '#5B8CFF' : '#8390A7'} />
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No laptops match your search.</Text>}
        ListFooterComponent={<Text style={styles.footer}>Laptos • Choose better. Buy smarter.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#07101F' },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: '#6D91E8', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#F6F8FC', fontSize: 29, fontWeight: '800', marginTop: 8, letterSpacing: -0.8 },
  subtitle: { color: '#9AA7BB', fontSize: 14, lineHeight: 21, marginTop: 10, maxWidth: 340 },
  logo: { width: 48, height: 48, borderRadius: 15, backgroundColor: '#172846', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#263A60' },
  searchBox: { height: 54, marginTop: 22, backgroundColor: '#111D31', borderRadius: 17, borderWidth: 1, borderColor: '#22324D', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 10 },
  searchInput: { flex: 1, color: '#F6F8FC', fontSize: 15 },
  quickRow: { flexDirection: 'row', gap: 8, marginTop: 13 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#101D32', borderWidth: 1, borderColor: '#21334F' },
  chipText: { color: '#B6C2D5', fontSize: 12, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 26, marginBottom: 10 },
  sectionTitle: { color: '#F6F8FC', fontSize: 19, fontWeight: '800' },
  resultCount: { color: '#73819A', fontSize: 12, fontWeight: '600' },
  card: { marginHorizontal: 20, marginVertical: 7, padding: 15, backgroundColor: '#0E1A2C', borderRadius: 20, borderWidth: 1, borderColor: '#1B2A43', flexDirection: 'row', minHeight: 145 },
  cardIcon: { width: 58, height: 58, borderRadius: 17, backgroundColor: '#142542', alignItems: 'center', justifyContent: 'center' },
  cardMain: { flex: 1, marginLeft: 13 },
  brand: { color: '#71809A', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  name: { color: '#F5F7FB', fontSize: 17, fontWeight: '800', marginTop: 3 },
  use: { color: '#A0ADC0', fontSize: 12, marginTop: 4 },
  specRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  spec: { color: '#8090A8', fontSize: 11, fontWeight: '600' },
  dot: { color: '#41506A' },
  price: { color: '#EAF0FF', fontSize: 15, fontWeight: '800', marginTop: 8 },
  saveButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  empty: { color: '#8897AE', textAlign: 'center', marginTop: 35 },
  footer: { color: '#53627A', textAlign: 'center', paddingVertical: 35, fontSize: 12 },
});
