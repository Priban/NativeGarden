import { vec } from "@shopify/react-native-skia";
// a module for vector algebra

// rotate a vector by an angle
const rotateVector = (vector, angle) => {
  angle = angle * Math.PI / 180;
  const x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
  const y = vector.x * Math.sin(angle) + vector.y * Math.cos(angle);
  return vec(x, y);
}

// export the module
export { rotateVector };