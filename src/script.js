import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import { planets } from "./planets";
import { createPlanet, createMoon } from "./helpers";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// Initialize texture loader
const textureLoader = new THREE.TextureLoader();

// sun texture
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");

// background texture
const cubeTexture = new THREE.CubeTextureLoader()
  .setPath("/textures/cubeMap/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

scene.background = cubeTexture;

// Generic sphere for all elements
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Initialize sun
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

// creating the solar system
export const planetMeshes = planets.map((planet) => {
  // create planet mesh
  const planetMesh = createPlanet(planet, sphereGeometry);

  // add mesh to scene
  scene.add(planetMesh);

  // loop through each moon and create it
  planet.moons.forEach((moon) => {
    // create moon mesh
    const moonMesh = createMoon(moon, sphereGeometry);

    // add moon to planet
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 200);
// scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, i) => {
    planet.rotation.y += planets[i].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[i].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[i].distance;

    planet.children.forEach((moon, j) => {
      moon.rotation.y += planets[i].moons[j].speed;

      moon.position.x =
        Math.sin(planet.rotation.y) * planets[i].moons[j].distance;
      moon.position.z =
        Math.cos(planet.rotation.y) * planets[i].moons[j].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
