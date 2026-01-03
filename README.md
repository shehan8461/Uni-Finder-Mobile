# UniFinder Mobile App

React Native mobile application for UniFinder, ported from the web frontend.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your iOS/Android device (for testing)

## Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Start the development server:
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go app on your device

### Platform-specific commands:
```bash
npm run ios      # Run on iOS
npm run android  # Run on Android
npm run web      # Run on web (for testing)
```

## Project Structure

```
mobile/
├── App.js                 # Main app entry point
├── package.json           # Dependencies
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
└── src/
    ├── components/       # Reusable components
    │   ├── Header.js
    │   └── Footer.js
    ├── pages/            # Screen components
    │   ├── HomePage.js
    │   ├── SignInPage.js
    │   ├── SignUp.js
    │   ├── Signin.js
    │   ├── KeywordsPage.js
    │   ├── RecommendationsPage.js
    │   ├── BestRecommendationPage.js
    │   ├── BudgetOptimizer.js
    │   ├── BudgetOptimizerNew.js
    │   ├── AddReview.js
    │   └── ProfileAll.js
    ├── navigation/       # Navigation setup
    │   └── AppNavigator.js
    └── redux/           # State management
        ├── store.js
        └── User/
            └── userSlice.js
```

## Features

- ✅ Navigation between screens
- ✅ Redux state management
- ✅ User authentication UI (backend connection pending)
- ✅ Home page with AI modules overview
- ✅ Keywords/Activities selection
- ✅ Recommendations display
- ✅ Budget Optimizer UI
- ✅ Reviews/Profile pages

## Backend Integration

**Note:** The app is currently set up with frontend-only functionality. Backend API connections are commented out and will be implemented when the backend is ready.

To connect the backend:
1. Update API endpoints in the respective page files
2. Uncomment the fetch/axios calls
3. Update the base URL to match your backend server

## Dependencies

- `expo` - Expo framework
- `react-native` - React Native core
- `@react-navigation/native` - Navigation library
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `redux-persist` - Redux persistence
- `@react-native-async-storage/async-storage` - Async storage for persistence
- `expo-linear-gradient` - Gradient components

## Next Steps

1. Test the app on iOS/Android devices
2. Connect backend APIs when ready
3. Add image assets (icon, splash screen)
4. Enhance UI/UX based on testing feedback
5. Add error handling and loading states
6. Implement form validation

## Notes

- All backend API calls are currently commented out
- Placeholder data is used for testing
- The app is ready for backend integration
- UI is responsive and follows React Native best practices

