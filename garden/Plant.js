import { Path, Circle, Paint, vec, LinearGradient, Skia, useValue } from "@shopify/react-native-skia";
import { useState, useEffect } from "react";
import Branch from "./Branch";
import { TreeStructure, Node } from '../utils/TreeStructure';
import { rotateVector } from "../utils/VectorAlgebra";

const branchSize = 15;
const dispersion = 80;
const maxBranches = 100;
const maxAngle = 110;

export default function Plant({ c, a, t }) {

  const [plant, setPlant] = useState(new TreeStructure(new Node({ position: c, angle: a, size: branchSize, orientation: 0 })));

   useEffect(() => {
    const interval = setInterval(() => {
      grow();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const grow = () => {
    if (plant.getAllNodes().length > maxBranches) {
      return;
    }

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
          angle: newAngle > maxAngle ? maxAngle : newAngle < -maxAngle ? -maxAngle : newAngle,
          size: size,
          orientation: Math.random() > 0.5 ? 1 : 0
        }));
      }

      return plantCopy;
    });
  }

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
