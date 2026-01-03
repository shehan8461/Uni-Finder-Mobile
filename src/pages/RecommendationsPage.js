import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecommendationsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { keyword } = route.params || { keyword: '' };
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (keyword) {
      fetchRecommendations();
    }
  }, [keyword]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      // Backend connection will be added later
      // const response = await axios.post('http://localhost:5001/recommend', {
      //   user_input: keyword,
      // });
      // setRecommendations(response.data);
      
      // Placeholder data for now
      setRecommendations([
        { id: 1, title: 'Recommendation 1', description: 'Backend connection pending' },
        { id: 2, title: 'Recommendation 2', description: 'Will connect when backend is ready' },
      ]);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations. Backend connection pending.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowBestRecommendation = () => {
    if (recommendations.length > 0) {
      navigation.navigate('BestRecommendation', {
        recommendation: recommendations[0],
      });
    } else {
      Alert.alert('Error', 'No recommendations available');
    }
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="Recommendations" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Recommendations</Text>
          {keyword && (
            <Text style={styles.subtitle}>Based on: {keyword}</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#667eea" style={styles.loader} />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : recommendations.length > 0 ? (
            <>
              {recommendations.map((rec) => (
                <View key={rec.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{rec.title}</Text>
                  <Text style={styles.cardDescription}>{rec.description}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.button}
                onPress={handleShowBestRecommendation}
              >
                <Text style={styles.buttonText}>Show Best Recommendation</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noData}>No recommendations available</Text>
          )}
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16,
  },
});

export default RecommendationsPage;

