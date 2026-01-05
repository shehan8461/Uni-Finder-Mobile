import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BestRecommendationPage = () => {
  const route = useRoute();
  const { recommendation } = route.params || { recommendation: 'No recommendation available.' };

  return (
    <View style={styles.container}>
      <Header currentRoute="BestRecommendation" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Best Recommendation</Text>
            <Text style={styles.recommendationText}>
              {typeof recommendation === 'object' 
                ? JSON.stringify(recommendation, null, 2)
                : recommendation}
            </Text>
          </View>
        </View>
        <Footer />
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    minHeight: 400,
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
    marginBottom: 20,
    color: '#333',
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
});

export default BestRecommendationPage;

