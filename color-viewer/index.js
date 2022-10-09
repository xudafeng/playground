'use strict';

const THREE = require('three');
const Stats = require('stats.js');
const OrbitControls = require('three-orbit-controls')(THREE);

const _ = require('./utils');

const {
  rgb2hex,
  oppositeColor
} = _;

const board = document.querySelector('#panel .text');
const container = document.querySelector('#container');
const colorInput = document.querySelector('#color_input');
const content = document.querySelector('#panel .content');
const leftIndent = document.querySelector('#panel .left-indent');
const rightIndent = document.querySelector('#panel .right-indent');

const LENGTH = 256;
const STEP = 8;
const defaultValue = '#ffd479';

const handle = (value) => {
  board.innerHTML = value;
  board.style.color = oppositeColor(value);
  content.style.background = value;
  leftIndent.style.background = `radial-gradient(1.5rem at left bottom, transparent 100%, ${value} 100%)`;
  rightIndent.style.background = `radial-gradient(1.5rem at right bottom, transparent 100%, ${value} 100%)`;
};

colorInput.addEventListener('change', e => {
  handle(e.target.value);
});

const changeColor = color => {
  colorInput.value = color;
  handle(color);
};

changeColor(defaultValue);

var INTERSECTED;
const positions = [];
const colors = [];

const camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 15, 3500);

camera.position.z = 1500;

const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();

for (let x = 0; x < LENGTH; x += STEP) {
  for (let y = 0; y < LENGTH; y += STEP) {
    for (let z = 0; z < LENGTH; z += STEP) {
      const px = -LENGTH / 2 + LENGTH * x / (LENGTH - 1);
      const py = -LENGTH / 2 + LENGTH * y / (LENGTH - 1);
      const pz = -LENGTH / 2 + LENGTH * z / (LENGTH - 1);
      positions.push(px, py, pz);
      const color = new THREE.Color();
      color.setRGB(x / 256, y / 256, z / 256);
      colors.push(color.r, color.g, color.b);
    }
  }
}

geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
geometry.computeBoundingSphere();

var material = new THREE.PointsMaterial({
  size: 5,
  vertexColors: THREE.VertexColors
});

const points = new THREE.Points(geometry, material);
points.rotation.x = 1;
points.rotation.y = 1;

scene.add(points);

const renderer = new THREE.WebGLRenderer({
  antialias: false
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const stats = new Stats();

container.appendChild(stats.dom);

const control = new OrbitControls(camera, container);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

document.addEventListener('mousemove', event => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false);

const animate = () => {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(points);

  if (intersects.length) {
    if (INTERSECTED !== intersects[0].index) {
      INTERSECTED = intersects[0].index;
      const r = colors[INTERSECTED * 3];
      const g = colors[INTERSECTED * 3 + 1];
      const b = colors[INTERSECTED * 3 + 2];
      const rgb = `rgb(${r * 256}, ${g * 256}, ${b * 256})`;
      const hex = rgb2hex(rgb);
      changeColor(hex);
    }
  } else if (INTERSECTED !== null) {
    INTERSECTED = null;
  }

  control.update();
  renderer.render(scene, camera);

  stats.update();
};

animate();
