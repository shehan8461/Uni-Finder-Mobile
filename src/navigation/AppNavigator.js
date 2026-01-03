import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/Signin';
import KeywordsPage from '../pages/KeywordsPage';
import RecommendationsPage from '../pages/RecommendationsPage';
import BestRecommendationPage from '../pages/BestRecommendationPage';
import BudgetOptimizer from '../pages/BudgetOptimizer';
import BudgetOptimizerNew from '../pages/BudgetOptimizerNew';
import AddReview from '../pages/AddReview';
import ProfileAll from '../pages/ProfileAll';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignInNew" component={SignIn} />
      <Stack.Screen name="Keywords" component={KeywordsPage} />
      <Stack.Screen name="Recommendations" component={RecommendationsPage} />
      <Stack.Screen name="BestRecommendation" component={BestRecommendationPage} />
      <Stack.Screen name="BudgetOptimizer" component={BudgetOptimizer} />
      <Stack.Screen name="BudgetOptimizerNew" component={BudgetOptimizerNew} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="ProfileAll" component={ProfileAll} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

