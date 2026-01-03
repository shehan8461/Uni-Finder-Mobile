import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const KeywordsPage = () => {
  const navigation = useNavigation();
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const keywords = [
    'hiking',
    'beach',
    'bicycling',
    'historical',
    'wildlife',
    'bird watching',
  ];

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const handleSubmit = () => {
    if (selectedKeyword) {
      navigation.navigate('Recommendations', { keyword: selectedKeyword });
    } else {
      Alert.alert('Error', 'Please select a keyword.');
    }
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="Keywords" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Select Your Preferred Activity</Text>
            <View style={styles.keywordsContainer}>
              {keywords.map((keyword, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.keywordButton,
                    selectedKeyword === keyword && styles.keywordButtonSelected,
                  ]}
                  onPress={() => handleKeywordSelect(keyword)}
                >
                  <Text
                    style={[
                      styles.keywordText,
                      selectedKeyword === keyword && styles.keywordTextSelected,
                    ]}
                  >
                    {keyword}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.submitButton, !selectedKeyword && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!selectedKeyword}
            >
              <Text style={styles.submitButtonText}>Get Recommendations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    minHeight: 500,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  keywordButton: {
    width: '48%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#667eea',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  keywordButtonSelected: {
    backgroundColor: '#667eea',
  },
  keywordText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  keywordTextSelected: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default KeywordsPage;

