import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import axios from 'axios';

function Form ({navigation}) {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    glucose: '',
    blood_pressure: '',
    smoking: null, // Either 0 (non-smoker) or 1 (smoker)
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [pickerItems] = useState([
    { label: 'Non-Smoker', value: 0 },
    { label: 'Smoker', value: 1 },
  ]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const { age, bmi, glucose, blood_pressure, smoking } = formData;
    if (!age || !bmi || !glucose || !blood_pressure || smoking === null) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://192.168.18.108:5000/predict', {
        age: parseFloat(age),
        bmi: parseFloat(bmi),
        glucose: parseFloat(glucose),
        blood_pressure: parseFloat(blood_pressure),
        smoking: smoking,
      });

      const result = response.data;
      Alert.alert(
        'Prediction Result',
        `Risk Level: ${result.risk_level}\n\nProbabilities:\nLow Risk: ${result.risk_probabilities['Low Risk']}\nModerate Risk: ${result.risk_probabilities['Moderate Risk']}\nHigh Risk: ${result.risk_probabilities['High Risk']}`
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const selectItem = (item) => {
    handleInputChange('smoking', item.value);
    toggleModal();
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Predict Health Risk</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>BMI</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.bmi}
          onChangeText={(value) => handleInputChange('bmi', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Glucose</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.glucose}
          onChangeText={(value) => handleInputChange('glucose', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Pressure</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.blood_pressure}
          onChangeText={(value) => handleInputChange('blood_pressure', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Smoking</Text>
        <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
          <Text style={styles.dropdownText}>
            {formData.smoking === 0 ? 'Non-Smoker' : formData.smoking === 1 ? 'Smoker' : 'Select Smoking Status'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={pickerItems}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
}

export default Form;

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
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  dropdownText: {
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});