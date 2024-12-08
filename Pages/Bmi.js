import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100; // Convert cm to meters

    if (!weightInKg || !heightInMeters || heightInMeters <= 0) {
      Alert.alert('Error', 'Please enter valid weight and height.');
      return;
    }

    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI.toFixed(2)); // Display BMI up to 2 decimal places

    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setBMICategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
      setBMICategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
      setBMICategory('Overweight');
    } else {
      setBMICategory('Obesity');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={(value) => setWeight(value)}
            placeholder="Enter your weight"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={(value) => setHeight(value)}
            placeholder="Enter your height"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.result}>
            <Text style={styles.resultText}>Your BMI: {bmi}</Text>
            <Text style={styles.resultText}>Category: {bmiCategory}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BMI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'left',  // Title aligned to the left
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  // Center text inside button
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',  // Center result text
    fontWeight: 'bold',
  },
});
