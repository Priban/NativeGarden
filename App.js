import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Canvas, Line, vec, useSpring, useTouchHandler } from "@shopify/react-native-skia";
import Plant from './garden/Plant';
import { useState, useEffect } from "react";

const width = 414;
const height = 800;

export default function App() {

  const [plants, setPlants] = useState([]);
  const [touchStart, setTouchStart] = useState(vec(0, 0));
  const [touchEnd, setTouchEnd] = useState(vec(0, 0));
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
      setTouchStart(vec(x, y));
      setTouching(true);
    },
    onActive: ({ x, y }) => {
      setTouchEnd(vec(x, y));
    },
    onEnd: ({ x, y }) => {
      console.log(x, y);
      setTouching(false);
    },
  });

  useEffect(() => {
    if (touching) {
      return;
    }
    console.log("touchend -------");
    console.log(touchStart.x, touchStart.y);
    console.log(touchEnd.x, touchEnd.y);
  }, [touching]);
  

  return (
    <>
      <Canvas style={{ width, height, backgroundColor: "brown" }} onTouch={onCanvasTouch}>
        {plants}
        <Line
          p1={touchStart}
          p2={touchEnd}
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
