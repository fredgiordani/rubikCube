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

document.querySelector('#rotateTopRight').addEventListener('click', () => {
  rotateTopLayerRight90();
});

document.querySelector('#rotateMiddleRight').addEventListener('click', () => {
  rotateMiddleLayerRight90();
});

document.querySelector('#rotateDownRight').addEventListener('click', () => {
  rotateDownLayerRight90();
});

document.querySelector('#rotateTopLeft').addEventListener('click', () => {
  rotateTopLayerLeft90();
});

document.querySelector('#rotateMiddleLeft').addEventListener('click', () => {
  rotateMiddleLayerLeft90();
});

document.querySelector('#rotateDownLeft').addEventListener('click', () => {
  rotateDownLayerLeft90();
});

document.querySelector('#rotateXLeftColumnUp').addEventListener('click', () => {
  rotateXLeftcolumnUp90();
});

document.querySelector('#rotateXMiddleColumnUp').addEventListener('click', () => {
  rotateXMiddlecolumnUp90();
});

document.querySelector('#rotateXRightColumnUp').addEventListener('click', () => {
  rotateXRightcolumnUp90();
});

document.querySelector('#rotateXLeftColumnDown').addEventListener('click', () => {
  rotateXLeftcolumnDown90();
});

document.querySelector('#rotateXMiddleColumnDown').addEventListener('click', () => {
  rotateXMiddlecolumnDown90();
});

document.querySelector('#rotateXRightColumnDown').addEventListener('click', () => {
  rotateXRightcolumnDown90();
});

document.querySelector('#rotateZFrontColumnRight').addEventListener('click', () => {
  rotateZFrontColumnRight90();
});

document.querySelector('#rotateZMiddleColumnRight').addEventListener('click', () => {
  rotateZMiddleColumnRight90();
});

document.querySelector('#rotateZBackColumnRight').addEventListener('click', () => {
  rotateZBackColumnRight90();
});

document.querySelector('#rotateZFrontColumnLeft').addEventListener('click', () => {
  rotateZFrontColumnLeft90();
});

document.querySelector('#rotateZMiddleColumnLeft').addEventListener('click', () => {
  rotateZMiddleColumnLeft90();
});

document.querySelector('#rotateZBackColumnLeft').addEventListener('click', () => {
  rotateZBackColumnLeft90();
});

document.querySelector('#shuffle').addEventListener('click', () => {
  randomSchuffle();
});



function rotateTopLayerRight90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == 1 );

  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (angle < target) {
      const delta = Math.min(speed, target - angle);
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
});
}

function rotateMiddleLayerRight90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == 0 );

  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (angle < target) {
      const delta = Math.min(speed, target - angle);
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateDownLayerRight90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == -1 );

  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (angle < target) {
      const delta = Math.min(speed, target - angle);
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateTopLayerLeft90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == 1 );

  console.log("imdgmiufg");
  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}


function rotateMiddleLayerLeft90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == 0 );

  console.log("imdgmiufg");
  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateDownLayerLeft90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const topLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.y == -1 );

  console.log("imdgmiufg");
  
  const group = new THREE.Group();
  topLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      group.rotation.y += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      topLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateXLeftcolumnUp90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == -1 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateXMiddlecolumnUp90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == 0 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}
function rotateXRightcolumnUp90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == 1 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateXLeftcolumnDown90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == -1 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}

function rotateXMiddlecolumnDown90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == 0 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}
function rotateXRightcolumnDown90() {
    return new Promise(resolve => {

  // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const xLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.x == 1 );

  
  const group = new THREE.Group();
  xLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.x += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      xLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
}


function rotateZFrontColumnRight90(){
    return new Promise(resolve => {

 // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == 1 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})

};


function  rotateZMiddleColumnRight90(){
    return new Promise(resolve => {

 // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == 0 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
};



function  rotateZBackColumnRight90(){
    return new Promise(resolve => {

   // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == -1 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  // const target = Math.PI / 2;
  const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      // const delta = Math.min(speed, target - angle);
      const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})

};



function  rotateZFrontColumnLeft90(){
    return new Promise(resolve => {

 // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == 1 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
};


function  rotateZMiddleColumnLeft90(){
    return new Promise(resolve => {

 // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == 0 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
};



function  rotateZBackColumnLeft90(){
    return new Promise(resolve => {

 // const topLayerCubes = Object.values(cubesMap).filter(cube => Math.abs(cube.userData.pos.y - 1) < 0.01);
  const zLayerCubes = Object.values(cubesMap).filter(cube => cube.userData.pos.z == -1 );

  
  const group = new THREE.Group();
  zLayerCubes.forEach(cube => {
    rubiksCube.remove(cube);
    group.add(cube);
  });
  rubiksCube.add(group);

  let angle = 0;
  const target = Math.PI / 2;
  // const target = -Math.PI / 2;
  const speed = 0.05;

  function animateRotation() {
    if (Math.abs(angle) < Math.abs(target)) {
      const delta = Math.min(speed, target - angle);
      // const delta = Math.sign(target) * Math.min(speed, Math.abs(target - angle));
      
      group.rotation.z += delta;
      angle += delta;
      requestAnimationFrame(animateRotation);
    } else {
      // Une fois la rotation terminée :
      zLayerCubes.forEach(cube => {
        cube.applyMatrix4(group.matrix);
        cube.userData.pos = {
          x: Math.round(cube.position.x),
          y: Math.round(cube.position.y),
          z: Math.round(cube.position.z),
        };
        rubiksCube.add(cube);
        const key = `${cube.userData.pos.x},${cube.userData.pos.y},${cube.userData.pos.z}`;
        cubesMap[key] = cube;
      });
      rubiksCube.remove(group);
    }
  }

  animateRotation();
})
};


const shuffles=[
  rotateTopLayerRight90,
  rotateMiddleLayerRight90,
  rotateDownLayerRight90,
  rotateTopLayerLeft90,
  rotateMiddleLayerLeft90,
  rotateDownLayerLeft90,
  rotateXLeftcolumnUp90,
  rotateXMiddlecolumnUp90,
  rotateXRightcolumnUp90,
  rotateXLeftcolumnDown90,
  rotateXMiddlecolumnDown90,
  rotateXRightcolumnDown90,
  rotateZFrontColumnRight90,
  rotateZMiddleColumnRight90,
  rotateZBackColumnRight90,
  rotateZFrontColumnLeft90,
  rotateZMiddleColumnLeft90,
  rotateZBackColumnLeft90,
]

 
function randomSchuffle(){
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      console.log("Shuffle", i);
      let index = Math.floor(Math.random() * shuffles.length);
      const shuffle = shuffles[index];
      shuffle();
    }, i * 1000); // décalage de 1 seconde entre chaque appel
  }
}


  



  
