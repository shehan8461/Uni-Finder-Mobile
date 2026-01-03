import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.heading}>AI Learning Platform</Text>
            <Text style={styles.text}>
              Empowering learners with intelligent educational guidance and personalized learning experiences.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Quick Links</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.link}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
              <Text style={styles.link}>AI Recommendations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileAll')}>
              <Text style={styles.link}>Learning Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Keywords')}>
              <Text style={styles.link}>Study Keywords</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Connect With Us</Text>
            <Text style={styles.text}>Join our community of AI-powered learners</Text>
            <View style={styles.socialIcons}>
              <Text style={styles.socialIcon}>📚</Text>
              <Text style={styles.socialIcon}>🤖</Text>
              <Text style={styles.socialIcon}>🎓</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.divider} />
      <Text style={styles.copyright}>
        &copy; 2024 AI Educational Guidance Platform. Transforming learning through intelligent technology.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  scroll: {
    flexGrow: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  section: {
    minWidth: 200,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#ecf0f1',
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: '#ecf0f1',
    fontSize: 12,
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#34495e',
    marginVertical: 20,
  },
  copyright: {
    color: '#95a5a6',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default Footer;

