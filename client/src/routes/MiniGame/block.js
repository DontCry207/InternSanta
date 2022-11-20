import * as THREE from 'three';
import * as CANNON from 'cannon';
import snow from '../../assets/images/snow1.png';
import { fetchData } from '../../utils/apis/api';
const Block = () => {
  window.focus(); // Capture keys right away (by default focus is on editor)

  let camera, scene, renderer; // ThreeJS globals
  let world; // CannonJs world
  let lastTime; // Last timestamp of animation
  let stack; // Parts that stay solid on top of each other
  let overhangs; // Overhanging parts that fall down
  const boxHeight = 0.8; // Height of each layer
  const originalBoxSize = 3; // Original width and height of a box
  let gameEnded;

  const scoreElement = document.getElementById('score');
  const resultsElement = document.getElementById('results');

  //==
  let particles;
  let positions = [],
    velocities = [];
  const numSnowflakes = 300;

  const maxRange = 12,
    minRange = maxRange / 2;
  const minHeight = 8;

  const geometry = new THREE.BufferGeometry();
  const textureLoader = new THREE.TextureLoader();

  init();
  animate();

  function animate() {
    requestAnimationFrame(animate);

    updateParticles();

    renderer.render(scene, camera);
  }

  function updateParticles() {
    for (let i = 0; i < numSnowflakes * 3; i += 3) {
      particles.geometry.attributes.position.array[i] -=
        particles.geometry.attributes.velocity.array[i];
      particles.geometry.attributes.position.array[i + 1] -=
        particles.geometry.attributes.velocity.array[i + 1];
      particles.geometry.attributes.position.array[i + 2] -=
        particles.geometry.attributes.velocity.array[i + 2];

      if (particles.geometry.attributes.position.array[i + 1] < 0) {
        particles.geometry.attributes.position.array[i] = Math.floor(
          Math.random() * maxRange - minRange,
        );
        particles.geometry.attributes.position.array[i + 1] = Math.floor(
          Math.random() * minHeight + minRange,
        );
        particles.geometry.attributes.position.array[i + 2] = Math.floor(
          Math.random() * maxRange - minRange,
        );
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }
  }
  //==

  function addSnowflakes() {
    for (let i = 0; i < numSnowflakes; i++) {
      positions.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * minRange + minHeight),
        Math.floor(Math.random() * maxRange - minRange),
      );

      velocities.push(
        (Math.random() * 6 - 3) * 0.003,
        (Math.random() * 3 + 0.12) * 0.006,
        (Math.random() * 6 - 3) * 0.003,
      );
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      'velocity',
      new THREE.Float32BufferAttribute(velocities, 3),
    );

    const flakeMaterial = new THREE.PointsMaterial({
      size: 13,
      map: textureLoader.load(snow),
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      opacity: 1,
    });

    particles = new THREE.Points(geometry, flakeMaterial);
    scene.add(particles);
  }

  function init() {
    gameEnded = false;
    lastTime = 0;
    stack = [];
    overhangs = [];

    // Initialize CannonJS
    world = new CANNON.World();
    world.gravity.set(0, -10, 0); // Gravity pulls things down
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 40;

    // Initialize ThreeJs
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.OrthographicCamera(
      width / -2, // left
      width / 2, // right
      height / 2, // top
      height / -2, // bottom
      0, // near plane
      100, // far plane
    );

    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    // Foundation
    addLayer(0, 0, originalBoxSize, originalBoxSize);

    // First layer
    addLayer(-10, 0, originalBoxSize, originalBoxSize, 'x');

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.75);
    renderer.setAnimationLoop(animation);
    const bs = document.getElementById('game');
    bs.appendChild(renderer.domElement);

    addSnowflakes();
  }

  function startGame() {
    gameEnded = false;
    lastTime = 0;
    stack = [];
    overhangs = [];

    if (resultsElement) resultsElement.style.display = 'none';
    if (scoreElement) scoreElement.innerText = 0;

    if (world) {
      // Remove every object from world
      while (world.bodies.length > 0) {
        world.remove(world.bodies[0]);
      }
    }

    if (scene) {
      // Remove every Mesh from the scene
      while (scene.children.find((c) => c.type == 'Mesh')) {
        const mesh = scene.children.find((c) => c.type == 'Mesh');
        scene.remove(mesh);
      }

      // Foundation
      addLayer(0, 0, originalBoxSize, originalBoxSize);

      // First layer
      addLayer(-10, 0, originalBoxSize, originalBoxSize, 'x');
    }

    if (camera) {
      // Reset camera positions
      camera.position.set(4, 4, 4);
      camera.lookAt(0, 0, 0);
    }
  }

  function addLayer(x, z, width, depth, direction) {
    const y = boxHeight * stack.length; // Add the new box one layer higher
    const layer = generateBox(x, y, z, width, depth, false);
    layer.direction = direction;
    stack.push(layer);
  }

  function addOverhang(x, z, width, depth) {
    const y = boxHeight * (stack.length - 1); // Add the new box one the same layer
    const overhang = generateBox(x, y, z, width, depth, true);
    overhangs.push(overhang);
  }

  function generateBox(x, y, z, width, depth, falls) {
    // ThreeJS
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    const color = new THREE.Color(`hsl(${stack.length * 10}, 80%, 70%)`);
    const material = new THREE.MeshLambertMaterial({ color });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);

    // CannonJS
    const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2),
    );
    let mass = falls ? 5 : 0; // If it shouldn't fall then setting the mass to zero will keep it stationary
    mass *= width / originalBoxSize; // Reduce mass proportionately by size
    mass *= depth / originalBoxSize; // Reduce mass proportionately by size
    const body = new CANNON.Body({ mass, shape });
    body.position.set(x, y, z);
    world.addBody(body);

    return {
      threejs: mesh,
      cannonjs: body,
      width,
      depth,
    };
  }

  function cutBox(topLayer, overlap, size, delta) {
    const direction = topLayer.direction;
    const newWidth = direction == 'x' ? overlap : topLayer.width;
    const newDepth = direction == 'z' ? overlap : topLayer.depth;

    // Update metadata
    topLayer.width = newWidth;
    topLayer.depth = newDepth;

    // Update ThreeJS model
    topLayer.threejs.scale[direction] = overlap / size;
    topLayer.threejs.position[direction] -= delta / 2;

    // Update CannonJS model
    topLayer.cannonjs.position[direction] -= delta / 2;

    // Replace shape to a smaller one (in CannonJS you can't simply just scale a shape)
    const shape = new CANNON.Box(
      new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2),
    );
    topLayer.cannonjs.shapes = [];
    topLayer.cannonjs.addShape(shape);
  }

  window.addEventListener('mousedown', eventHandler);
  window.addEventListener('touchstart', eventHandler);
  window.addEventListener('keydown', function (event) {
    if (event.key == ' ') {
      event.preventDefault();
      eventHandler();
      return;
    }
    // if (event.key == "R" || event.key == "r") {
    //   event.preventDefault();
    //   startGame();
    //   return;
    // }
  });

  function eventHandler() {
    splitBlockAndAddNextOneIfOverlaps();
  }

  function splitBlockAndAddNextOneIfOverlaps() {
    if (gameEnded) return;

    const topLayer = stack[stack.length - 1];
    const previousLayer = stack[stack.length - 2];

    const direction = topLayer.direction;

    const size = direction == 'x' ? topLayer.width : topLayer.depth;
    const delta =
      topLayer.threejs.position[direction] -
      previousLayer.threejs.position[direction];
    const overhangSize = Math.abs(delta);
    const overlap = size - overhangSize;

    if (overlap > 0) {
      cutBox(topLayer, overlap, size, delta);

      // Overhang
      const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
      const overhangX =
        direction == 'x'
          ? topLayer.threejs.position.x + overhangShift
          : topLayer.threejs.position.x;
      const overhangZ =
        direction == 'z'
          ? topLayer.threejs.position.z + overhangShift
          : topLayer.threejs.position.z;
      const overhangWidth = direction == 'x' ? overhangSize : topLayer.width;
      const overhangDepth = direction == 'z' ? overhangSize : topLayer.depth;

      addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

      // Next layer
      const nextX = direction == 'x' ? topLayer.threejs.position.x : -10;
      const nextZ = direction == 'z' ? topLayer.threejs.position.z : -10;
      const newWidth = topLayer.width; // New layer has the same size as the cut top layer
      const newDepth = topLayer.depth; // New layer has the same size as the cut top layer
      const nextDirection = direction == 'x' ? 'z' : 'x';

      if (scoreElement) scoreElement.innerText = stack.length - 1;
      addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
    } else {
      missedTheSpot();
    }
  }

  function missedTheSpot() {
    const topLayer = stack[stack.length - 1];

    // Turn to top layer into an overhang and let it fall down
    addOverhang(
      topLayer.threejs.position.x,
      topLayer.threejs.position.z,
      topLayer.width,
      topLayer.depth,
    );
    world.remove(topLayer.cannonjs);
    scene.remove(topLayer.threejs);

    gameEnded = true;
    // api 호출 stack.length
    fetchData
      .patch('/api/v1/member/coin', {
        memberCoin: stack.length - 2,
      })
      .then((res) => {
        console.log(res.data);
      });
    if (resultsElement) resultsElement.style.display = 'flex';
    document.getElementById('result-score').innerText = stack.length - 2;
    document.getElementById('result-coin').innerText = stack.length - 2;
  }

  function animation(time) {
    if (lastTime) {
      const timePassed = time - lastTime;
      const speed = 0.008;

      const topLayer = stack[stack.length - 1];

      // The top level box should move if the game has not ended AND
      // it's either NOT in autopilot or it is in autopilot and the box did not yet reach the robot position

      if (!gameEnded) {
        // Keep the position visible on UI and the position in the model in sync
        topLayer.threejs.position[topLayer.direction] += speed * timePassed;
        topLayer.cannonjs.position[topLayer.direction] += speed * timePassed;

        // If the box went beyond the stack then show up the fail screen
        if (topLayer.threejs.position[topLayer.direction] > 10) {
          missedTheSpot();
        }
      }

      // 4 is the initial camera height
      if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
        camera.position.y += speed * timePassed;
      }

      updatePhysics(timePassed);
    }
    lastTime = time;
  }

  function updatePhysics(timePassed) {
    world.step(timePassed / 1000); // Step the physics world

    // Copy coordinates from Cannon.js to Three.js
    overhangs.forEach((element) => {
      element.threejs.position.copy(element.cannonjs.position);
      element.threejs.quaternion.copy(element.cannonjs.quaternion);
    });
  }

  window.addEventListener('resize', () => {
    // Adjust camera
    // console.log("resize", window.innerWidth*0.6, window.innerHeight*0.75);
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera.top = height / 2;
    camera.bottom = height / -2;
    // console.log(width, height);
    // Reset renderer
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.75);
    renderer.render(scene, camera);
  });
};

export default Block;
