import { Text, View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
    return (
      <>
        <Stack.Screen options={{ title: 'Page Not Found!' }} />
        <View style={styles.container}>
          <Link href="/" style={styles.button}>
            Go back to Home screen!
          </Link>
        </View>
      </>
    );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90D5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#2E6F40',
  },
});