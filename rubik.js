const canvas = document.querySelector('#canvas');
const renderer =  new THREE.WebGLRenderer({antialias: true, canvas});

const fov = 75;
const aspect = 2;  // valeur par défaut du canevas
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 5;


const scene = new THREE.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// // sans light 
// // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

// // avec light

// const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // cyan

// // on créé le cube
// const cube = new THREE.Mesh(geometry, material);

// // on ajoute le cube a la scene
// scene.add(cube);


// //  on donne cube et camera a la fonction render du renderer 
// renderer.render(scene, camera);


// function render(time) {
//   time *= 0.001;  // convertis le temps en secondes
 
//   cube.rotation.x = time;
//   cube.rotation.y = time;
 
//   renderer.render(scene, camera);
 
//   requestAnimationFrame(render);
// }

// function makeInstance(geometry, color, x) {
//   const material = new THREE.MeshPhongMaterial({color});
 
//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);
 
//   cube.position.x = x;
 
//   return cube;
// }

function makeInstance(geometry, color, x,y,z) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);
 
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
 
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

// const cubecubesXYZs = [
//   makeInstance(geometry, 0x44aa88,  0),
//   makeInstance(geometry, 0x8844aa, -2),
//   makeInstance(geometry, 0xaa8844,  2),
// ];

const instancesXYZ = [];

cubes.forEach(cube => {
    let cubeX= cube[0];
    let cubeY= cube[1];
    let cubeZ= cube[2];
    instancesXYZ.push(makeInstance(geometry, 0x44aa88,  cubeX,cubeY,cubeZ));
});

function render(time) {
  time *= 0.001;  // conversion du temps en secondes
 
  instancesXYZ.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
renderer.render(scene, camera);
requestAnimationFrame(render);
}

requestAnimationFrame(render);

// {
//   const color = 0xFFFFFF;
//   const intensity = 3;
//   const light = new THREE.DirectionalLight(color, intensity);
//   light.position.set(-1, 2, 4);
//   scene.add(light);
// }


