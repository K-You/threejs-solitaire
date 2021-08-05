import * as THREE from 'THREE';
import './style.css';

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.setZ(30);

renderer.render(scene, camera);

// Object
const geometry = new THREE.PlaneGeometry(75, 40);
const material = new THREE.MeshStandardMaterial({
  color: 'green',
});
const gameboard = new THREE.Mesh(geometry, material);
scene.add(gameboard);

// Light
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,0,0);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

// Helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

function addFondation() {
  // Object
  const fondationGeo = new THREE.PlaneGeometry(3, 4);
  const fondationMaterial = new THREE.MeshStandardMaterial({
    color: 'white',
  });

  for(let i=0; i<4; i++) {
    const fondation = new THREE.Mesh(fondationGeo, fondationMaterial);
    scene.add(fondation);
    fondation.position.setX(15 + i*5);
    fondation.position.setY(15);
  }
}

addFondation();

function addReserve() {
  // Object
  const fondationGeo = new THREE.PlaneGeometry(3, 4);
  const fondationMaterial = new THREE.MeshStandardMaterial({
    color: 'white',
  });

  for(let i=0; i<2; i++) {
    const fondation = new THREE.Mesh(fondationGeo, fondationMaterial);
    scene.add(fondation);
    fondation.position.setX(-30 + i*5);
    fondation.position.setY(15);
  }
}

addReserve();

function addTableau() {
  // Object
  const fondationGeo = new THREE.PlaneGeometry(3, 4);
  const fondationMaterial = new THREE.MeshStandardMaterial({
    color: 'white',
  });

  for(let i=0; i<7; i++) {
    const fondation = new THREE.Mesh(fondationGeo, fondationMaterial);
    scene.add(fondation);
    fondation.position.setX(i*5);
    fondation.position.setY(5);
  }
}

addTableau();

const ROUGE = 'rouge';
const NOIR = 'noir';

const COEUR = { symbol: '❤️', couleur: ROUGE };
const PIQUE = { symbol: '♠️', couleur: NOIR };
const CARREAU = { symbol: '♦️', couleur: ROUGE };
const TREFLE = { symbol: '♣️', couleur: NOIR };

const SYMBOLS = [COEUR, PIQUE, CARREAU, TREFLE];

function generateCards() {
  const cards = [];
  const fondationGeo = new THREE.PlaneGeometry(3, 4);
  const fondationMaterial = new THREE.MeshStandardMaterial({
    color: 'white',
  });
  SYMBOLS.forEach(symbol => {
    for(let i=0;i<54;i++) {
      const fondation = new THREE.Mesh(fondationGeo, fondationMaterial);
      scene.add(fondation);
      fondation.position.setX(i*5);
      fondation.position.setY(5);
    }
  });
  return cards;
}

//Animation
let previousRAF = null;
function animate(t){
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  if(previousRAF === null){
    previousRAF = t;
  }

  const timeElapsed = (t-previousRAF) * 0.001;
 
  previousRAF = t;
}

// Window resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', () => {
  onWindowResize();
}, false);

animate();