import * as THREE from "three";

// Initialize texture loader
const textureLoader = new THREE.TextureLoader();

// global moon  texture
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
// Initialize  a global moon material
const moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture,
});

export const createPlanet = (planet, geometry) => {
  // create mesh
  const planetMesh = new THREE.Mesh(geometry, planet.material);
  //set scale
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  planetMesh.name = planet.name;

  return planetMesh;
};

export const createMoon = (moon, geometry) => {
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;

  return moonMesh;
};
