import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Canvas, Line, vec, useSpring, useTouchHandler } from "@shopify/react-native-skia";
import Plant from './garden/Plant';
import { useState, useEffect } from "react";

const width = 414;
const height = 800;

export default function App() {

  const [plants, setPlants] = useState([]);
  const [touch, setTouch] = useState({ start: vec(0, 0), end: vec(0, 0) });
  const [touching, setTouching] = useState(false);
  const lineOpacity = useSpring(touching ? 1 : 0);

  const reset = () => {
    setPlants([]);
  }

  const addPlant = (x, y) => {
    setPlants(p => {
      return [...p, <Plant c={vec(x, y)} a={0} key={p.length} />];
    });
  }

  const onCanvasTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      setTouch(t => ({ start: vec(x, y), end: vec(x, y) }));
      setTouching(true);
    },
    onActive: ({ x, y }) => {
      setTouch(t => ({ ...t, end: vec(x, y) }));
    },
    onEnd: (event) => {
      console.log("touch end");
      console.log(event);

      // distinguish between a tap and a swipe
      if (Math.abs(touch.start.x - x) < 10 && Math.abs(touch.start.y - y) < 10) {
        console.log("tapped");
        addPlant(x, y);
      } else {

      }

      setTouch(t => {
        return { ...t, end: vec(x, y) }
      });
      setTouching(false);
    },
  });

  return (
    <>
      <Canvas style={{ width, height, backgroundColor: "brown" }} onTouch={onCanvasTouch}>
        {plants}
        <Line
          p1={touch.start}
          p2={touch.end}
          color={touching ? "lightblue" : "red"}
          style="stroke"
          strokeWidth={2}
          opacity={lineOpacity}
        />
      </Canvas>
      <View style={styles.bottomMenu}>
        <Button
          color="white"
          title="Reset"
          onPress={reset}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    flex: 1,
    backgroundColor: "brown",
    borderTop: "1px solid black",
  }
});
