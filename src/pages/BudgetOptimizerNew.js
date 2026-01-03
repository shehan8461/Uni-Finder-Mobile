import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const BudgetOptimizerNew = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [formData, setFormData] = useState({
    // Account Information
    email: currentUser?.email || '',
    password: '',
    full_name: currentUser?.username || '',
    phone: '',
    university: 'SLIIT',
    
    // Academic Profile
    year_of_study: 'Second Year',
    field_of_study: 'IT',
    district: 'Colombo',
    
    // Financial Basics
    monthly_income: '30000',
    accommodation_type: 'Rented Room',
    rent: '10000',
    
    // Food Preferences
    food_type: 'Mixed',
    meals_per_day: '3 meals',
    diet_type: 'Non-Vegetarian',
    cooking_frequency: 'Most days',
    cooking_percentage: '60',
    
    // Transport Details
    distance_uni_accommodation: '5',
    distance_home_uni: '80',
    transport_method: 'Bus',
    days_per_week: '5 days',
    home_visit_frequency: 'Monthly',
    transport_method_home: 'Bus',
    
    // Additional Expenses
    internet: '1500',
    study_materials: '2000',
    entertainment: '2000',
    utilities: '1000',
    healthcare: '1000',
    other: '500'
  });

  // Backend URLs
  // For physical device: Use your computer's network IP (e.g., 192.168.1.129)
  // For iOS Simulator: Use localhost or 127.0.0.1
  // For Android Emulator: Use 10.0.2.2
  // Change these IPs to match your setup
  const COMPUTER_IP = '192.168.1.129'; // Your computer's IP from Flask server logs
  const backendUrl = Platform.OS === 'ios' && __DEV__ 
    ? 'http://127.0.0.1:5002'  // iOS Simulator
    : Platform.OS === 'android' && __DEV__
    ? 'http://10.0.2.2:5002'   // Android Emulator
    : `http://${COMPUTER_IP}:5002`; // Physical device - use network IP
  
  const nodeBackendUrl = Platform.OS === 'ios' && __DEV__
    ? 'http://localhost:3000'  // iOS Simulator
    : Platform.OS === 'android' && __DEV__
    ? 'http://10.0.2.2:3000'   // Android Emulator
    : `http://${COMPUTER_IP}:3000`; // Physical device - use network IP

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kurunegala', 'Anuradhapura',
    'Ratnapura', 'Batticaloa', 'Trincomalee', 'Badulla'
  ];

  const universities = [
    'SLIIT', 'University of Colombo', 'University of Moratuwa', 
    'University of Kelaniya', 'University of Peradeniya', 'NSBM Green University',
    'IIT Campus', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
    setError(null);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const submitAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare request data
      const requestData = {
        ...formData,
        monthly_income: parseInt(formData.monthly_income) || 0,
        rent: parseInt(formData.rent) || 0,
        distance_uni_accommodation: parseInt(formData.distance_uni_accommodation) || 0,
        distance_home_uni: parseInt(formData.distance_home_uni) || 0,
        cooking_percentage: parseInt(formData.cooking_percentage) || 60,
        internet: parseInt(formData.internet) || 0,
        study_materials: parseInt(formData.study_materials) || 0,
        entertainment: parseInt(formData.entertainment) || 0,
        utilities: parseInt(formData.utilities) || 0,
        healthcare: parseInt(formData.healthcare) || 0,
        other: parseInt(formData.other) || 0,
        userId: currentUser?._id || null,
        username: currentUser?.username || formData.full_name,
        email: currentUser?.email || formData.email
      };

      // Step 1: Get ML analysis from Flask
      const response = await fetch(`${backendUrl}/api/budget/complete-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
        
        // Step 2: Save to MongoDB via Node.js API
        try {
          const budgetSaveData = {
            userId: currentUser?._id || null,
            username: currentUser?.username || formData.full_name,
            email: currentUser?.email || formData.email,
            monthly_income: requestData.monthly_income,
            year_of_study: formData.year_of_study,
            field_of_study: formData.field_of_study,
            university: formData.university,
            district: formData.district,
            accommodation_type: formData.accommodation_type,
            rent: requestData.rent,
            internet: requestData.internet,
            study_materials: requestData.study_materials,
            entertainment: requestData.entertainment,
            utilities: requestData.utilities,
            healthcare: requestData.healthcare,
            other: requestData.other,
            food_type: formData.food_type,
            meals_per_day: formData.meals_per_day,
            diet_type: formData.diet_type,
            cooking_frequency: formData.cooking_frequency,
            cooking_percentage: requestData.cooking_percentage,
            distance_uni_accommodation: requestData.distance_uni_accommodation,
            distance_home_uni: requestData.distance_home_uni,
            transport_method: formData.transport_method,
            transport_method_home: formData.transport_method_home,
            days_per_week: formData.days_per_week,
            home_visit_frequency: formData.home_visit_frequency,
            food_budget: result.calculated_budgets?.food || {},
            transport_budget: result.calculated_budgets?.transport || {},
            predicted_budget: result.ml_prediction?.predicted_budget || 0,
            ml_confidence: (result.ml_prediction?.confidence || 0) * 100,
            risk_level: result.risk_assessment?.risk_level || 'Medium Risk',
            risk_probability: (result.risk_assessment?.risk_probability || 0) * 100,
            total_expenses: result.financial_summary?.total_expenses || 0,
            calculated_savings: result.financial_summary?.monthly_savings || 0,
            savings_rate: result.financial_summary?.savings_rate || 0,
            recommendations: result.recommendation?.key_recommendations || [],
            actionable_steps: result.recommendation?.action_steps || [],
            expense_breakdown: result.expense_breakdown || {},
            analysis_date: new Date().toISOString(),
            status: 'active'
          };

          const saveResponse = await fetch(`${nodeBackendUrl}/api/budget/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(budgetSaveData)
          });

          if (saveResponse.ok) {
            const saveResult = await saveResponse.json();
            console.log('✅ Budget prediction saved to MongoDB:', saveResult.predictionId);
          } else {
            console.warn('⚠️ Failed to save to MongoDB, but showing results anyway');
          }
        } catch (saveError) {
          console.warn('⚠️ MongoDB save error:', saveError.message);
        }
        
        setCurrentStep(7); // Move to results step
      } else {
        let errorMessage = 'Failed to analyze budget';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error (Status: ${response.status}). Please check if Flask server is running on ${backendUrl}`;
        }
        setError(errorMessage);
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      let errorMessage = 'Network error. ';
      if (error.message.includes('Network request failed') || error.message.includes('Failed to fetch')) {
        errorMessage += `Cannot connect to backend server at ${backendUrl}. `;
        errorMessage += `Please ensure:\n1. Flask server is running on port 5002\n2. Your device and computer are on the same network\n3. Firewall allows connections on port 5002`;
      } else {
        errorMessage += error.message || 'Unknown error occurred';
      }
      setError(errorMessage);
      Alert.alert('Connection Error', errorMessage);
      console.error('Budget analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      'Account', 'Academic', 'Financial', 'Food', 'Transport', 'Additional', 'Results'
    ];
    const progress = (currentStep / 7) * 100;

    return (
      <View style={styles.stepIndicator}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[
                styles.stepNumber,
                currentStep === index + 1 && styles.stepNumberActive,
                currentStep > index + 1 && styles.stepNumberCompleted
              ]}>
                <Text style={[
                  styles.stepNumberText,
                  currentStep === index + 1 && styles.stepNumberTextActive,
                  currentStep > index + 1 && styles.stepNumberTextCompleted
                ]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[
                styles.stepLabel,
                currentStep === index + 1 && styles.stepLabelActive
              ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>📝 Step 1: Account Information</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="student@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder="Min 8 characters"
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.full_name}
            onChangeText={(value) => handleInputChange('full_name', value)}
            placeholder="Your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            placeholder="+94 77 123 4567"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>University *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.university}
              onValueChange={(value) => handleInputChange('university', value)}
              style={styles.picker}
            >
              {universities.map(uni => (
                <Picker.Item key={uni} label={uni} value={uni} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>🎓 Step 2: Academic Profile</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Year of Study *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.year_of_study}
              onValueChange={(value) => handleInputChange('year_of_study', value)}
              style={styles.picker}
            >
              <Picker.Item label="First Year" value="First Year" />
              <Picker.Item label="Second Year" value="Second Year" />
              <Picker.Item label="Third Year" value="Third Year" />
              <Picker.Item label="Fourth Year" value="Fourth Year" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Field of Study *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.field_of_study}
              onValueChange={(value) => handleInputChange('field_of_study', value)}
              style={styles.picker}
            >
              <Picker.Item label="Engineering" value="Engineering" />
              <Picker.Item label="IT/Computer Science" value="IT" />
              <Picker.Item label="Business" value="Business" />
              <Picker.Item label="Medicine" value="Medicine" />
              <Picker.Item label="Arts" value="Arts" />
              <Picker.Item label="Science" value="Science" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current District *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.district}
              onValueChange={(value) => handleInputChange('district', value)}
              style={styles.picker}
            >
              {districts.map(dist => (
                <Picker.Item key={dist} label={dist} value={dist} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>💰 Step 3: Financial Basics</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monthly Income (LKR) *</Text>
          <TextInput
            style={styles.input}
            value={formData.monthly_income}
            onChangeText={(value) => handleInputChange('monthly_income', value)}
            placeholder="30000"
            keyboardType="numeric"
          />
          <Text style={styles.helpText}>
            Total money you receive monthly (allowance, scholarship, part-time job)
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Accommodation Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.accommodation_type}
              onValueChange={(value) => handleInputChange('accommodation_type', value)}
              style={styles.picker}
            >
              <Picker.Item label="University Hostel" value="University Hostel" />
              <Picker.Item label="Rented Room/Apartment" value="Rented Room" />
              <Picker.Item label="Living with Family (No rent)" value="Living with Family" />
              <Picker.Item label="Boarding House" value="Boarding" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monthly Rent (LKR) *</Text>
          <TextInput
            style={styles.input}
            value={formData.rent}
            onChangeText={(value) => handleInputChange('rent', value)}
            placeholder="10000"
            keyboardType="numeric"
          />
          <Text style={styles.helpText}>
            Enter 0 if living with family or accommodation is free
          </Text>
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>🍽️ Step 4: Food Preferences</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Food Type Preference *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.food_type}
              onValueChange={(value) => handleInputChange('food_type', value)}
              style={styles.picker}
            >
              <Picker.Item label="Home Cooked (I cook myself)" value="Home Cooked" />
              <Picker.Item label="Mixed (Cook + Order/Eat out)" value="Mixed" />
              <Picker.Item label="Food Delivery (Uber Eats, PickMe)" value="Food Delivery" />
              <Picker.Item label="Mostly Canteen/Restaurants" value="Mostly Canteen/Restaurants" />
              <Picker.Item label="Full Meal Plan (Hostel/Boarding)" value="Full Meal Plan" />
            </Picker>
          </View>
        </View>

        {formData.food_type === 'Mixed' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Cooking vs Ordering: {formData.cooking_percentage}% Cook / {100 - parseInt(formData.cooking_percentage || 60)}% Order
            </Text>
            <TextInput
              style={styles.input}
              value={formData.cooking_percentage}
              onChangeText={(value) => handleInputChange('cooking_percentage', value)}
              placeholder="60"
              keyboardType="numeric"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Meals Per Day *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.meals_per_day}
              onValueChange={(value) => handleInputChange('meals_per_day', value)}
              style={styles.picker}
            >
              <Picker.Item label="2 meals" value="2 meals" />
              <Picker.Item label="3 meals" value="3 meals" />
              <Picker.Item label="3 meals + snacks" value="3 meals + snacks" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Diet Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.diet_type}
              onValueChange={(value) => handleInputChange('diet_type', value)}
              style={styles.picker}
            >
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
              <Picker.Item label="Vegan" value="Vegan" />
            </Picker>
          </View>
        </View>

        {(formData.food_type === 'Home Cooked' || formData.food_type === 'Mixed') && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>How often do you cook?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.cooking_frequency}
                onValueChange={(value) => handleInputChange('cooking_frequency', value)}
                style={styles.picker}
              >
                <Picker.Item label="Every day" value="Every day" />
                <Picker.Item label="Most days" value="Most days" />
                <Picker.Item label="Sometimes" value="Sometimes" />
                <Picker.Item label="Rarely" value="Rarely" />
                <Picker.Item label="Never" value="Never" />
              </Picker>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>🚌 Step 5: Transport Details</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Distance: Uni to Accommodation (km)</Text>
            <TextInput
              style={styles.input}
              value={formData.distance_uni_accommodation}
              onChangeText={(value) => handleInputChange('distance_uni_accommodation', value)}
              placeholder="5"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Distance: Home to Uni (km)</Text>
            <TextInput
              style={styles.input}
              value={formData.distance_home_uni}
              onChangeText={(value) => handleInputChange('distance_home_uni', value)}
              placeholder="80"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Primary Transport Method *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.transport_method}
              onValueChange={(value) => handleInputChange('transport_method', value)}
              style={styles.picker}
            >
              <Picker.Item label="Walking" value="Walking" />
              <Picker.Item label="Bicycle" value="Bicycle" />
              <Picker.Item label="Bus" value="Bus" />
              <Picker.Item label="Train" value="Train" />
              <Picker.Item label="Tuk-Tuk/Three-Wheeler" value="Tuk-Tuk" />
              <Picker.Item label="Ride-share (Uber/PickMe)" value="Ride-share" />
              <Picker.Item label="Personal Vehicle" value="Personal Vehicle" />
              <Picker.Item label="University Transport" value="University Transport" />
              <Picker.Item label="Mixed" value="Mixed" />
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Days per Week at University</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.days_per_week}
                onValueChange={(value) => handleInputChange('days_per_week', value)}
                style={styles.picker}
              >
                <Picker.Item label="1 day" value="1 day" />
                <Picker.Item label="2 days" value="2 days" />
                <Picker.Item label="3 days" value="3 days" />
                <Picker.Item label="4 days" value="4 days" />
                <Picker.Item label="5 days" value="5 days" />
                <Picker.Item label="6 days" value="6 days" />
                <Picker.Item label="7 days" value="7 days" />
              </Picker>
            </View>
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Home Visit Frequency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.home_visit_frequency}
                onValueChange={(value) => handleInputChange('home_visit_frequency', value)}
                style={styles.picker}
              >
                <Picker.Item label="Daily" value="Daily" />
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Bi-weekly" value="Bi-weekly" />
                <Picker.Item label="Monthly" value="Monthly" />
                <Picker.Item label="Once per semester" value="Once per semester" />
                <Picker.Item label="Rarely/Never" value="Rarely/Never" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transport Method for Home Visits</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.transport_method_home}
              onValueChange={(value) => handleInputChange('transport_method_home', value)}
              style={styles.picker}
            >
              <Picker.Item label="Bus" value="Bus" />
              <Picker.Item label="Train" value="Train" />
              <Picker.Item label="Personal Vehicle" value="Personal Vehicle" />
              <Picker.Item label="Ride-share" value="Ride-share" />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep6 = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.cardHeader}
      >
        <Text style={styles.cardHeaderText}>📊 Step 6: Additional Expenses (Optional)</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Internet & Mobile (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.internet}
              onChangeText={(value) => handleInputChange('internet', value)}
              placeholder="1500"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Study Materials (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.study_materials}
              onChangeText={(value) => handleInputChange('study_materials', value)}
              placeholder="2000"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Entertainment & Social (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.entertainment}
              onChangeText={(value) => handleInputChange('entertainment', value)}
              placeholder="2000"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Utilities (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.utilities}
              onChangeText={(value) => handleInputChange('utilities', value)}
              placeholder="1000"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Healthcare (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.healthcare}
              onChangeText={(value) => handleInputChange('healthcare', value)}
              placeholder="1000"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Other Expenses (LKR/month)</Text>
            <TextInput
              style={styles.input}
              value={formData.other}
              onChangeText={(value) => handleInputChange('other', value)}
              placeholder="500"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep7 = () => {
    if (!analysisResult) {
      return (
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.readyText}>Ready to analyze your budget!</Text>
            <Text style={styles.readySubtext}>
              Click "Analyze Budget" to get your personalized financial insights.
            </Text>
          </View>
        </View>
      );
    }

    const { financial_summary, expense_breakdown, calculated_budgets, risk_assessment, recommendation } = analysisResult;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Financial Summary */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#28a745', '#20c997']}
            style={styles.cardHeader}
          >
            <Text style={styles.cardHeaderText}>💰 Financial Summary</Text>
          </LinearGradient>
          <View style={styles.cardBody}>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Monthly Income</Text>
                <Text style={[styles.summaryValue, styles.summaryValuePrimary]}>
                  LKR {financial_summary?.monthly_income?.toLocaleString() || 0}
                </Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Total Expenses</Text>
                <Text style={[styles.summaryValue, styles.summaryValueDanger]}>
                  LKR {financial_summary?.total_expenses?.toLocaleString() || 0}
                </Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Monthly Savings</Text>
                <Text style={[
                  styles.summaryValue,
                  (financial_summary?.monthly_savings || 0) >= 0 
                    ? styles.summaryValueSuccess 
                    : styles.summaryValueDanger
                ]}>
                  LKR {financial_summary?.monthly_savings?.toLocaleString() || 0}
                </Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Savings Rate</Text>
                <Text style={[
                  styles.summaryValue,
                  (financial_summary?.savings_rate || 0) >= 0 
                    ? styles.summaryValueSuccess 
                    : styles.summaryValueDanger
                ]}>
                  {financial_summary?.savings_rate?.toFixed(1) || 0}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Risk Assessment */}
        {risk_assessment && (
          <View style={[
            styles.card,
            risk_assessment.risk_level === 'High Risk' && styles.riskCardHigh
          ]}>
            <View style={styles.cardBody}>
              <Text style={[
                styles.riskTitle,
                risk_assessment.risk_level === 'High Risk' && styles.riskTitleHigh
              ]}>
                {risk_assessment.risk_level === 'High Risk' ? '⚠️ High Financial Risk Detected' : '✅ Low Financial Risk'}
              </Text>
              <Text style={styles.riskText}>
                Risk Probability: {risk_assessment.risk_probability?.toFixed(1) || 0}%
              </Text>
              {risk_assessment.recommendations && risk_assessment.recommendations.length > 0 && (
                <View style={styles.recommendationsList}>
                  {risk_assessment.recommendations.map((rec, idx) => (
                    <View key={idx} style={styles.recommendationItem}>
                      <Text style={styles.recommendationText}>
                        <Text style={styles.recommendationCategory}>{rec.category}:</Text> {rec.message}
                        {rec.potential_savings > 0 && (
                          <Text style={styles.savingsText}>
                            {' '}(Potential savings: LKR {rec.potential_savings.toLocaleString()})
                          </Text>
                        )}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* AI Recommendation */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#17a2b8', '#138496']}
            style={styles.cardHeader}
          >
            <Text style={styles.cardHeaderText}>🎯 AI Recommendation</Text>
          </LinearGradient>
          <View style={styles.cardBody}>
            <Text style={styles.recommendationMain}>
              {recommendation || 'No specific recommendation available.'}
            </Text>
          </View>
        </View>

        {/* Expense Breakdown */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.cardHeader}
          >
            <Text style={styles.cardHeaderText}>📊 Expense Breakdown</Text>
          </LinearGradient>
          <View style={styles.cardBody}>
            {expense_breakdown && Object.entries(expense_breakdown).map(([category, amount]) => {
              if (category === 'total_expenses') return null;
              const percentage = expense_breakdown.total_expenses 
                ? ((amount / expense_breakdown.total_expenses) * 100).toFixed(1) 
                : 0;
              return (
                <View key={category} style={styles.expenseRow}>
                  <Text style={styles.expenseCategory}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                  </Text>
                  <View style={styles.expenseAmountContainer}>
                    <Text style={styles.expenseAmount}>
                      LKR {amount?.toLocaleString() || 0}
                    </Text>
                    <Text style={styles.expensePercentage}>
                      ({percentage}%)
                    </Text>
                  </View>
                </View>
              );
            })}
            <View style={[styles.expenseRow, styles.expenseTotal]}>
              <Text style={styles.expenseTotalLabel}>TOTAL:</Text>
              <Text style={styles.expenseTotalAmount}>
                LKR {expense_breakdown?.total_expenses?.toLocaleString() || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Calculated Budgets */}
        {(calculated_budgets?.food || calculated_budgets?.transport) && (
          <View style={styles.card}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.cardHeader}
            >
              <Text style={styles.cardHeaderText}>📈 Auto-Calculated Budgets</Text>
            </LinearGradient>
            <View style={styles.cardBody}>
              {calculated_budgets.food && (
                <View style={styles.calculatedBudgetItem}>
                  <Text style={styles.calculatedBudgetTitle}>🍽️ Food Budget</Text>
                  <Text style={styles.calculatedBudgetAmount}>
                    LKR {calculated_budgets.food.monthly_total?.toLocaleString() || 0}
                  </Text>
                  <Text style={styles.calculatedBudgetDetails}>
                    Type: {calculated_budgets.food.food_type} | Daily: LKR {calculated_budgets.food.daily_cost?.toLocaleString() || 0}
                  </Text>
                </View>
              )}

              {calculated_budgets.transport && (
                <View style={styles.calculatedBudgetItem}>
                  <Text style={styles.calculatedBudgetTitle}>🚌 Transport Budget</Text>
                  <Text style={styles.calculatedBudgetAmount}>
                    LKR {calculated_budgets.transport.monthly_total?.toLocaleString() || 0}
                  </Text>
                  <Text style={styles.calculatedBudgetDetails}>
                    Method: {calculated_budgets.transport.transport_method} | Daily: LKR {calculated_budgets.transport.daily_cost?.toLocaleString() || 0}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderNavigationButtons = () => {
    if (currentStep === 7 && analysisResult) {
      return (
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonSecondary]}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.navButtonTextSecondary}>📝 Edit Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonSecondary, currentStep === 1 && styles.navButtonDisabled]}
          onPress={prevStep}
          disabled={currentStep === 1}
        >
          <Text style={styles.navButtonTextSecondary}>← Previous</Text>
        </TouchableOpacity>

        {currentStep < 6 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonPrimary]}
            onPress={nextStep}
          >
            <Text style={styles.navButtonTextPrimary}>Next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonSuccess, loading && styles.navButtonDisabled]}
            onPress={submitAnalysis}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.navButtonTextPrimary}>🔍 Analyze Budget</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="BudgetOptimizerNew" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>🎯 AI-Powered Student Budget Optimizer</Text>
            <Text style={styles.mainSubtitle}>
              Complete your profile in 6 simple steps to get personalized budget insights
            </Text>
          </View>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Error Display */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>❌ {error}</Text>
            </View>
          )}

          {/* Form Steps */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}

          {/* Navigation Buttons */}
          {renderNavigationButtons()}
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
    padding: 15,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  stepIndicator: {
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  stepItem: {
    alignItems: 'center',
    width: width / 7 - 5,
    marginBottom: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepNumberActive: {
    backgroundColor: '#667eea',
  },
  stepNumberCompleted: {
    backgroundColor: '#28a745',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  stepNumberTextActive: {
    color: '#fff',
  },
  stepNumberTextCompleted: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#667eea',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardHeader: {
    padding: 15,
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  readyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  readySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryBox: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryValuePrimary: {
    color: '#667eea',
  },
  summaryValueDanger: {
    color: '#dc3545',
  },
  summaryValueSuccess: {
    color: '#28a745',
  },
  riskCardHigh: {
    borderWidth: 2,
    borderColor: '#dc3545',
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  riskTitleHigh: {
    color: '#dc3545',
  },
  riskText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  recommendationsList: {
    marginTop: 10,
  },
  recommendationItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  recommendationCategory: {
    fontWeight: 'bold',
  },
  savingsText: {
    color: '#28a745',
    fontWeight: '600',
  },
  recommendationMain: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  expenseTotal: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#667eea',
    marginTop: 10,
    paddingTop: 15,
  },
  expenseCategory: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  expenseAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 5,
  },
  expensePercentage: {
    fontSize: 12,
    color: '#666',
  },
  expenseTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseTotalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
  },
  calculatedBudgetItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  calculatedBudgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  calculatedBudgetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 5,
  },
  calculatedBudgetDetails: {
    fontSize: 12,
    color: '#666',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  navButtonPrimary: {
    backgroundColor: '#667eea',
  },
  navButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  navButtonSuccess: {
    backgroundColor: '#28a745',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextSecondary: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BudgetOptimizerNew;
