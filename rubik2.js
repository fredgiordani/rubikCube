const canvas = document.querySelector('#canvas');
const renderer =  new THREE.WebGLRenderer({antialias: true, canvas});

const fov = 75;
const aspect = 2;  // valeur par défaut du canevas
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 4;


const scene = new THREE.Scene();

const rubiksCube = new THREE.Group();
scene.add(rubiksCube);


const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);



function makeInstance(geometry, color, x, y, z) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  rubiksCube.add(cube); // AU LIEU DE scene.add(...)
  return cube;
}



let posX= [-1,0,1];
let posY= [-1,0,1];
let posZ= [-1,0,1];

cubes= [];

posX.forEach(elementX => {
    posY.forEach(elementY => {
        posZ.forEach(elementZ => {
            let cube = [elementX,elementY,elementZ]
            cubes.push(cube);
        })
    });    
});

console.log("cubes : ",cubes);

console.log( cubes.length)

const instancesXYZ = [];

cubes.forEach(cube => {

    let cubeX= cube[0];
    let cubeY= cube[1];
    let cubeZ= cube[2];
    const spacing = 1.1;
    instancesXYZ.push(makeInstance(geometry, 0x44aa88,  cubeX * spacing ,cubeY * spacing,cubeZ * spacing));
});



function render(time) {
  time *= 0.001;  // convertit le temps en secondes

  // Rotation globale du Rubik's Cube
  rubiksCube.rotation.x = time * 0.3;
  rubiksCube.rotation.y = time * 0.5;

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