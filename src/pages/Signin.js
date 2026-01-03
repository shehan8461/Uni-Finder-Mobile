import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, signout } from '../redux/User/userSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
  };

  const handleSignOut = async () => {
    try {
      // Backend connection will be added later
      // await fetch('http://localhost:3000/api/auth/signout');
      dispatch(signout());
      Alert.alert('Success', 'Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!formdata.email || !formdata.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      dispatch(signInStart());
      // Backend connection will be added later
      // const res = await fetch('http://localhost:3000/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formdata),
      // });
      // const data = await res.json();
      // if (data.success === false) {
      //   dispatch(signInFailure(data.message));
      //   return;
      // }
      // dispatch(signInSuccess(data));
      Alert.alert('Info', 'Backend connection pending. Will connect when backend is ready.');
    } catch (error) {
      dispatch(signInFailure(error.toString()));
      Alert.alert('Error', error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Header currentRoute="SignInNew" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => handleChange('email', value)}
                value={formdata.email || ''}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={(value) => handleChange('password', value)}
                value={formdata.password || ''}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'Something went wrong!'}</Text>
              </View>
            )}

            {currentUser && (
              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={() => navigation.navigate('AddReview')}
              >
                <Text style={styles.buttonText}>Add Review</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

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
    alignItems: 'center',
    padding: 20,
    minHeight: 500,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  formGroup: {
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
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#667eea',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
});

