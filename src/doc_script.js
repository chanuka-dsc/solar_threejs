import { float } from "three/webgpu";
import { planets } from "./planets";
import { planetMeshes } from "./script";
const select = document.getElementById("planets");
const radius = document.getElementById("radius");
const speed = document.getElementById("speed");
const distance = document.getElementById("distance");

planets.forEach((planet, i) => {
  select.options[select.options.length] = new Option(planet.name, i);
});

// Start values
radius.value = planets[select.selectedIndex].radius;
speed.value = planets[select.selectedIndex].speed;
distance.value = planets[select.selectedIndex].distance;

select.onchange = (e) => {
  console.log("change");
  radius.value = planets[select.selectedIndex].radius;
  speed.value = planets[select.selectedIndex].speed;
  distance.value = planets[select.selectedIndex].distance;
};

radius.onchange = (e) => {
  planetMeshes[select.selectedIndex].scale.setScalar(parseInt(radius.value));
};

speed.onchange = (e) => {
  planets[select.selectedIndex].speed = parseFloat(speed.value);
  console.log(planets[select.selectedIndex].speed);
};

distance.onchange = (e) => {
  planets[select.selectedIndex].distance = parseInt(distance.value);
};
