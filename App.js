import { StyleSheet, View } from 'react-native';
import Quiz from './src/components/Quiz';


export default function App() {
  return (
    <View style={styles.container}>
      <Quiz/>
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
