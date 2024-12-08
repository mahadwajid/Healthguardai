import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const HealthApp = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity Tracker</Text>
      </View>

      {/* "Today Target" Section */}
      <View style={styles.todayTarget}>
        <View style={styles.targetCard}>
          <Text style={styles.targetValue}>8L</Text>
          <Text style={styles.targetLabel}>Water Intake</Text>
        </View>
        <View style={styles.targetCard}>
          <Text style={styles.targetValue}>2400</Text>
          <Text style={styles.targetLabel}>Foot Steps</Text>
        </View>
      </View>

      {/* Cards with Navigation */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Form')}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Predicted Your Health</Text>
            <Text style={styles.cardDescription}>
              Get insights into your health status based on your activity and data.
            </Text>
          </View>
          <Image source={require('../assets/First.png')} style={styles.cardImage} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chatbot')}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Talk With Chatbot</Text>
            <Text style={styles.cardDescription}>
              Chat with our AI-powered assistant for personalized health advice.
            </Text>
          </View>
          <Image source={require('../assets/Chatbot.png')} style={styles.cardImage} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Bmi-Calculator')}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>BMI Calculator</Text>
            <Text style={styles.cardDescription}>
              Calculate your Body Mass Index to know your fitness level.
            </Text>
          </View>
          <Image source={require('../assets/BMI.png')} style={styles.cardImage} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  todayTarget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f4ff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  targetCard: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  targetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  targetLabel: {
    fontSize: 14,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  cardImage: {
    width: 100,
    height: 90,
    resizeMode: 'cover',
    transform: [{ scale: 1.3 }],
    borderRadius: 10,
  },
});

export default HealthApp;
