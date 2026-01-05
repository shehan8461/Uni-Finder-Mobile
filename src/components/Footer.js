import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.heading}>Quick Links</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.linkButton}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Recommendations')} style={styles.linkButton}>
            <Text style={styles.link}>Recommendations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileAll')} style={styles.linkButton}>
            <Text style={styles.link}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Keywords')} style={styles.linkButton}>
            <Text style={styles.link}>Solutions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BudgetOptimizerNew')} style={styles.linkButton}>
            <Text style={styles.link}>Budget</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Connect</Text>
          <View style={styles.socialIcons}>
            <Text style={styles.socialIcon}>📚</Text>
            <Text style={styles.socialIcon}>🤖</Text>
            <Text style={styles.socialIcon}>🎓</Text>
          </View>
          <Text style={styles.text}>
            AI-Powered Educational Platform
          </Text>
        </View>
      </View>

      <View style={styles.divider} />
      <Text style={styles.copyright}>
        &copy; 2024 UniFinder. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  section: {
    flex: 1,
    minWidth: width < 375 ? '100%' : '45%',
    marginBottom: 15,
  },
  heading: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#ecf0f1',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  linkButton: {
    marginBottom: 6,
  },
  link: {
    color: '#ecf0f1',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#34495e',
    marginVertical: 12,
  },
  copyright: {
    color: '#95a5a6',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default Footer;

