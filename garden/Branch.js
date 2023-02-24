import { Path, Circle, Paint, vec, LinearGradient, Skia } from "@shopify/react-native-skia";
import { rotateVector } from "../utils/VectorAlgebra";

export default function Branch({ c, a, size, orientation }) {
  const v = rotateVector(vec(0, -1 * size), a);

  // make a vec that is 45 degrees to the left of v
  const v90 = rotateVector(v, orientation ? 90 : -90);

  const path = Skia.Path.Make();
  path.moveTo(c.x, c.y);
  path.lineTo(c.x + v.x, c.y + v.y);
  path.lineTo((c.x + v.x / 2) + v90.x / 3, (c.y + v.y / 2) + v90.y / 3);
  path.close();

  return (
    <Path path={path}>
      <Paint color="green" />
      <Paint color="darkgreen" style="stroke" strokeWidth={3} />
    </Path>
  );
}
