import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, Circle, Paint, vec, LinearGradient } from "@shopify/react-native-skia";
import Plant from './garden/Plant';

export default function App() {
  const width = 414;
  const height = 896;

  return (
    <Canvas style={{ width, height, backgroundColor: "brown" }}>
      <Plant c={vec(200, 700)} a={0} />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
