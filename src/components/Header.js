import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Modal, 
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Header = ({ currentRoute = 'Home' }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const navItems = [
    { label: 'Home', route: 'Home', icon: '🏠' },
    { label: 'Solutions', route: 'Keywords', icon: '💡' },
    { label: 'Recommendations', route: 'Recommendations', icon: '🎯' },
    { label: 'Reviews', route: 'ProfileAll', icon: '⭐' },
    { label: 'Budget', route: 'BudgetOptimizerNew', icon: '💰' },
  ];

  const handleNavPress = (route) => {
    navigation.navigate(route);
    setMenuVisible(false);
  };

  return (
    <>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')} 
            style={styles.brand}
          >
            <Text style={styles.brandIcon}>🎓</Text>
            <Text style={styles.brandText}>UniFinder</Text>
          </TouchableOpacity>

          <View style={styles.rightSection}>
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.menuButton}
            >
              <View style={styles.menuIcon}>
                <View style={[styles.menuLine, menuVisible && styles.menuLineActive]} />
                <View style={[styles.menuLine, menuVisible && styles.menuLineActive]} />
                <View style={[styles.menuLine, menuVisible && styles.menuLineActive]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Mobile Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.menuHeader}
                >
                  <Text style={styles.menuTitle}>Menu</Text>
                  <TouchableOpacity
                    onPress={() => setMenuVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </LinearGradient>

                <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
                  {/* Navigation Items */}
                  {navItems.map((item) => (
                    <TouchableOpacity
                      key={item.route}
                      onPress={() => handleNavPress(item.route)}
                      style={[
                        styles.menuItem,
                        currentRoute === item.route && styles.menuItemActive
                      ]}
                    >
                      <Text style={styles.menuItemIcon}>{item.icon}</Text>
                      <Text style={[
                        styles.menuItemText,
                        currentRoute === item.route && styles.menuItemTextActive
                      ]}>
                        {item.label}
                      </Text>
                      {currentRoute === item.route && (
                        <View style={styles.activeIndicator} />
                      )}
                    </TouchableOpacity>
                  ))}

                  <View style={styles.menuDivider} />

                  {/* Auth Buttons */}
                  <TouchableOpacity
                    onPress={() => handleNavPress('SignInNew')}
                    style={styles.authButton}
                  >
                    <Text style={styles.authButtonText}>Sign In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleNavPress('SignUp')}
                    style={[styles.authButton, styles.authButtonPrimary]}
                  >
                    <Text style={[styles.authButtonText, styles.authButtonTextPrimary]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brandIcon: {
    fontSize: 24,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 5,
    borderRadius: 6,
  },
  brandText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    transition: 'all 0.3s',
  },
  menuLineActive: {
    backgroundColor: '#ffd700',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContent: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: '#f8f9fa',
  },
  menuItemActive: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItemTextActive: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  authButton: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#667eea',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  authButtonPrimary: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  authButtonTextPrimary: {
    color: '#fff',
  },
});

export default Header;

