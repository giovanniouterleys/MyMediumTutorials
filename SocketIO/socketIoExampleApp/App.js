import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';

export default function App() {

  const socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  socket.on('message', (message) => {
    Alert.alert('Message', message);
  });

  const sendMessage = () => {
    socket.emit('message', 'Hello from client');
  }

  return (
    <View style={styles.container}>
      <Button title="Send a message" onPress={sendMessage}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
