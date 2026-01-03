import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileAll = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Backend connection will be added later
      // const response = await fetch('http://localhost:3000/api/reviews');
      // const data = await response.json();
      // setReviews(data);
      
      // Placeholder data
      setReviews([
        { id: 1, title: 'Review 1', content: 'Backend connection pending', rating: 5 },
        { id: 2, title: 'Review 2', content: 'Will connect when backend is ready', rating: 4 },
      ]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="ProfileAll" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Reviews</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#667eea" style={styles.loader} />
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <View key={review.id} style={styles.card}>
                <Text style={styles.cardTitle}>{review.title}</Text>
                <Text style={styles.cardContent}>{review.content}</Text>
                <Text style={styles.cardRating}>Rating: {review.rating}/5</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>No reviews available</Text>
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
    marginBottom: 20,
    color: '#333',
  },
  loader: {
    marginTop: 50,
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
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardRating: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16,
  },
});

export default ProfileAll;

