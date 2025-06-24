const canvas = document.querySelector('#canvas');
const renderer =  new THREE.WebGLRenderer({antialias: true, canvas});

const red     = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const orange  = new THREE.MeshBasicMaterial({ color: 0xff8000 });
const white   = new THREE.MeshBasicMaterial({ color: 0xffffff });
const yellow  = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const green   = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const blue    = new THREE.MeshBasicMaterial({ color: 0x0000ff });


const materials = [
  red,    // +X (right)
  orange, // -X (left)
  white,  // +Y (up)
  yellow, // -Y (down)
  green,  // +Z (front)
  blue    // -Z (back)
];

const fov = 75;
const aspect = 2;  // valeur par défaut du canevas
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // optionnel : mouvement fluide
controls.dampingFactor = 0.1;  // plus ou moins d'inertie

camera.position.z = 4;




const scene = new THREE.Scene();

const rubiksCube = new THREE.Group();
scene.add(rubiksCube);


const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);



function makeInstance(geometry, x, y, z) {
  // const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, materials);
  cube.position.set(x, y, z);
  rubiksCube.add(cube); // AU LIEU DE scene.add(...)
  return cube;
}



let posX= [-1,0,1];
let posY= [-1,0,1];
let posZ= [-1,0,1];

cubes= [];

const cubesMap = {};

posX.forEach(x => {
    posY.forEach(y => {
        posZ.forEach(z => {
            const spacing = 1.01;
            const cube = makeInstance(geometry,  x * spacing ,y * spacing,z * spacing);
            cube.userData.pos = { x, y, z };
            const key = `${x},${y},${z}`;
            cubesMap[key] = cube;
        })
    });    
});




console.log("cubes : ",cubesMap);

function render(time) {
  time *= 0.001;  // convertit le temps en secondes

   controls.update(); // ← essentiel pour le mouvement fluide

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);




{
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}