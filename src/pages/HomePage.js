import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isTablet = width > 768;

const HomePage = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Keywords');
  };

  const handleBudgetOptimizer = () => {
    navigation.navigate('BudgetOptimizerNew');
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="Home" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.brandLogo}>
              <Text style={styles.brandIcon}>🎓</Text>
            </View>

            <Text style={styles.heroTitle}>
              AI-Powered{'\n'}
              <Text style={styles.heroTitleHighlight}>Educational</Text>{'\n'}
              Guidance Platform
            </Text>

            <Text style={styles.heroSubtitle}>
              Empowering Sri Lankan students with data-driven insights for academic and career success through cutting-edge AI technology
            </Text>

            <View style={styles.ctaButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>🚀 Explore Our Solutions</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.secondaryButton}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>📊 View Research</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsBar}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>350K+</Text>
                <Text style={styles.statLabel}>A/L Candidates</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4</Text>
                <Text style={styles.statLabel}>AI Modules</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transforming Education Through AI</Text>
            <Text style={styles.sectionSubtitle}>
              Discover how our advanced AI modules are revolutionizing educational guidance for Sri Lankan students
            </Text>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Addressing Educational Challenges in Sri Lanka</Text>
            <Text style={styles.overviewText}>
              Approximately 350,000 G.C.E. A/L candidates annually compete for about 44,000 state university seats,
              leaving over 300,000 students to navigate private, external, or vocational pathways without personalized support.
              Rising living costs—up 15% over the past five years—combined with opaque scholarship and loan eligibility criteria
              contribute to widespread under-utilization of financial aid.
            </Text>
          </View>

          <Text style={styles.modulesTitle}>----Our AI Solutions----</Text>

          <View style={styles.modulesContainer}>
            <View style={[styles.moduleCard, { backgroundColor: '#e3f2fd' }]}>
              <Text style={styles.moduleIcon}>🎯</Text>
              <Text style={[styles.moduleTitle, { color: '#1976d2' }]}>
                1. Degree Recommendation System
              </Text>
              <Text style={styles.moduleText}>
                Employing hybrid machine learning approaches including content-based filtering, collaborative filtering,
                and Multi-Criteria Decision Making (MCDM) with Z-score filters to provide personalized degree recommendations.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.moduleCard, { backgroundColor: '#e8f5e8' }]}
              onPress={handleBudgetOptimizer}
            >
              <Text style={styles.moduleIcon}>💰</Text>
              <Text style={[styles.moduleTitle, { color: '#388e3c' }]}>
                2. Student Budget Optimizer
              </Text>
              <Text style={styles.moduleText}>
                Advanced expense forecasting system that generates personalized budget plans for students, incorporating
                real-time cost-of-living indices, accommodation costs, and educational expenses.
              </Text>
              <View style={styles.liveDemoBadge}>
                <Text style={styles.liveDemoText}>🚀 Live Demo</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.moduleCard, { backgroundColor: '#fff3e0' }]}>
              <Text style={styles.moduleIcon}>🏆</Text>
              <Text style={[styles.moduleTitle, { color: '#f57c00' }]}>
                3. Scholarship & Loan Matcher
              </Text>
              <Text style={styles.moduleText}>
                Intelligent matching system with eligibility prediction algorithms, automated deadline alerts, and fraud
                detection capabilities.
              </Text>
            </View>

            <View style={[styles.moduleCard, { backgroundColor: '#f3e5f5' }]}>
              <Text style={styles.moduleIcon}>📈</Text>
              <Text style={[styles.moduleTitle, { color: '#7b1fa2' }]}>
                4. Career Outcome Predictor
              </Text>
              <Text style={styles.moduleText}>
                Leveraging time-series forecasting and comprehensive skill-gap analysis to predict career outcomes,
                salary expectations, and job market trends.
              </Text>
            </View>
          </View>

          <View style={styles.platformOverview}>
            <Text style={styles.platformTitle}>Integrated Data-Driven Platform</Text>
            <Text style={styles.platformText}>
              By integrating UGC admissions data, real-time cost-of-living indices, comprehensive scholarship frameworks,
              and current labor-market statistics, our platform applies advanced machine learning algorithms.
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    minHeight: isSmallDevice ? height * 0.75 : height * 0.7,
    paddingVertical: isSmallDevice ? 30 : 40,
    paddingHorizontal: isSmallDevice ? 15 : 20,
    justifyContent: 'center',
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  brandLogo: {
    width: isSmallDevice ? 70 : 80,
    height: isSmallDevice ? 70 : 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isSmallDevice ? 15 : 20,
  },
  brandIcon: {
    fontSize: isSmallDevice ? 32 : 36,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 26 : isTablet ? 38 : 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: isSmallDevice ? 15 : 20,
    lineHeight: isSmallDevice ? 32 : isTablet ? 48 : 40,
    paddingHorizontal: 10,
  },
  heroTitleHighlight: {
    color: '#ffd700',
  },
  heroSubtitle: {
    fontSize: isSmallDevice ? 14 : 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: isSmallDevice ? 25 : 30,
    paddingHorizontal: isSmallDevice ? 10 : 20,
    lineHeight: isSmallDevice ? 20 : 24,
  },
  ctaButtons: {
    width: '100%',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 30 : 40,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: isSmallDevice ? 14 : 16,
    paddingHorizontal: isSmallDevice ? 25 : 30,
    marginBottom: 12,
    width: isSmallDevice ? '100%' : width * 0.85,
    maxWidth: 300,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButtonText: {
    color: '#667eea',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    paddingVertical: isSmallDevice ? 14 : 16,
    paddingHorizontal: isSmallDevice ? 25 : 30,
    width: isSmallDevice ? '100%' : width * 0.85,
    maxWidth: 300,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '600',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: isSmallDevice ? 15 : 20,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: isSmallDevice ? 10 : 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  mainContent: {
    padding: isSmallDevice ? 15 : 20,
  },
  section: {
    marginBottom: isSmallDevice ? 25 : 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 22 : isTablet ? 32 : 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  sectionSubtitle: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: isSmallDevice ? 20 : 24,
    paddingHorizontal: 10,
  },
  overviewCard: {
    backgroundColor: '#f8f9fa',
    padding: isSmallDevice ? 15 : 20,
    borderRadius: 10,
    marginBottom: isSmallDevice ? 25 : 30,
  },
  overviewTitle: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  overviewText: {
    fontSize: isSmallDevice ? 13 : 14,
    lineHeight: isSmallDevice ? 20 : 22,
    color: '#555',
    textAlign: 'justify',
  },
  modulesTitle: {
    fontSize: isSmallDevice ? 20 : isTablet ? 28 : 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: isSmallDevice ? 15 : 20,
    color: '#333',
  },
  modulesContainer: {
    marginBottom: isSmallDevice ? 25 : 30,
  },
  moduleCard: {
    padding: isSmallDevice ? 15 : 20,
    borderRadius: 15,
    marginBottom: isSmallDevice ? 15 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIcon: {
    fontSize: isSmallDevice ? 40 : 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  moduleText: {
    fontSize: isSmallDevice ? 13 : 14,
    lineHeight: isSmallDevice ? 18 : 20,
    textAlign: 'justify',
    color: '#555',
  },
  liveDemoBadge: {
    backgroundColor: 'rgba(56, 142, 60, 0.2)',
    padding: isSmallDevice ? 4 : 5,
    paddingHorizontal: isSmallDevice ? 8 : 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  liveDemoText: {
    color: '#388e3c',
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: '600',
  },
  platformOverview: {
    backgroundColor: '#fff',
    padding: isSmallDevice ? 18 : 25,
    borderRadius: 15,
    marginBottom: isSmallDevice ? 25 : 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  platformTitle: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  platformText: {
    fontSize: isSmallDevice ? 13 : 14,
    lineHeight: isSmallDevice ? 20 : 22,
    textAlign: 'justify',
    color: '#555',
  },
});

export default HomePage;

