/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model({ modelUrl, clickedMesh, onClick, onPointerMissed }) {
  const model = useLoader(GLTFLoader, modelUrl);
  function renderNode(node, materials) {
    return (
      <mesh
        key={node.name}
        matrix={node.matrix}
        geometry={node.geometry}
        material={
          node.name === clickedMesh?.name
            ? new THREE.MeshBasicMaterial({
                color: "#22c55e",
              })
            : materials[node.material?.name]
        }
        rotation={node.rotation}
        position={node?.position}
        scale={node.scale}
        name={node.name}
        onClick={onClick}
        onPointerMissed={onPointerMissed}
      >
        {node.children.length > 0 && (
          <group>
            {node.children.map((child) => {
              return renderNode(child, materials);
            })}
          </group>
        )}
      </mesh>
    );
  }
  return (
    <Canvas className="h-full w-full border ">
      <ambientLight intensity={1.2} />
      <directionalLight position={[1, 2, 3]} />
      <OrbitControls />
      <group scale={0.5} position={[0, -1, 0]} dispose={null}>
        {model.scene.children.map((node) => renderNode(node, model.materials))}
      </group>
    </Canvas>
  );
}

export default Model;