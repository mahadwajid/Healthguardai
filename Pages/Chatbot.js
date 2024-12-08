import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const MedicalHealthcareChat = () => {
  const [messages, setMessages] = useState([]);

  // Handle sending messages
  const handleSend = (newMessages = []) => {
    // Send user message
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    
    const userMessage = newMessages[0].text;  // Get the user input
    const botResponse = getBotResponse(userMessage); // Get bot response

    // Send bot response
    setTimeout(() => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.round(Math.random() * 1000000), // Generate unique ID
            text: botResponse,
            createdAt: new Date(),
            user: {
              _id: 2, // Bot ID
              name: 'Healthcare Bot',
            },
          },
        ])
      );
    }, 1000);
  };

  const getBotResponse = (input) => {
    switch (input.toLowerCase()) {
      case 'what is the recommended daily water intake?':
        return 'The recommended daily water intake is about 2-3 liters for adults.';
      case 'what should i do if i have a headache?':
        return 'You can rest, stay hydrated, and take over-the-counter pain relief if needed. If it persists, consult a doctor.';
      case 'what are the symptoms of flu?':
        return 'The symptoms of flu include fever, cough, sore throat, and body aches.';
      default:
        return "I'm sorry, I don't have a response for that. Please try asking something else.";
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: 1, // User ID
        }}
        placeholder="Ask me anything"
        alwaysShowSend
        renderUsernameOnMessage
        isTyping={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MedicalHealthcareChat;
