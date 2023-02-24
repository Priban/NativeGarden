import { Path, Circle, Paint, vec, LinearGradient, Skia, useValue } from "@shopify/react-native-skia";
import { useState, useEffect, useCallback } from "react";
import Branch from "./Branch";
import { TreeStructure, Node } from '../utils/TreeStructure';
import { rotateVector } from "../utils/VectorAlgebra";

const branchSize = 10;
const dispersion = 180;

export default function Plant({ c, a }) {

  const [plant, setPlant] = useState(new TreeStructure(new Node({ position: c, angle: a, size: branchSize, orientation: 0 })));

  const grow = () => {
    setPlant(p => {
      // copy the current plant
      const plantCopy = Object.assign(Object.create(Object.getPrototypeOf(p)), p)

      const leaves = plantCopy.getLeafNodes();

      for (const leaf of leaves) {
        const { position, angle, size } = leaf.data;
        const v = rotateVector(vec(0, -1 * size), angle);

        const newAngle = angle + Math.random() * dispersion * 2 - dispersion;

        leaf.children.push(new Node({
          position: vec(position.x + v.x, position.y + v.y),
          angle: newAngle > 90 ? 90 : newAngle < -90 ? -90 : newAngle,
          size: size,
          orientation: Math.random() > 0.5 ? 1 : 0
        }));
      }

      return plantCopy;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      grow();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {
        plant.getAllNodes().map((node, index) => {
          return (
            <Branch c={node.data.position} a={node.data.angle} size={node.data.size} orientation={node.data.orientation} key={index} />
          );
        })
      }
    </>
  );
}
