import React from 'react';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

const Snow = () => {
  let particles;

  const { camera, gl, scene } = useThree();
  const particleNum = 10000;
  const maxRange = 500;
  const minRange = maxRange / 2;
  const textureSize = 64.0;

  useEffect(() => {
    init();
  }, []);

  const drawRadialGradation = (ctx, canvasRadius, canvasW, canvasH) => {
    ctx.save();
    const gradient = ctx.createRadialGradient(
      canvasRadius,
      canvasRadius,
      0,
      canvasRadius,
      canvasRadius,
      canvasRadius,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.restore();
  };

  const getTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const diameter = textureSize;
    canvas.width = diameter;
    canvas.height = diameter;
    const canvasRadius = diameter / 2;

    /* gradation circle
    ------------------------ */
    drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);

    /* snow crystal
    ------------------------ */
    // drawSnowCrystal(ctx, canvasRadius);

    const texture = new THREE.Texture(canvas);
    //texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    texture.needsUpdate = true;
    return texture;
  };

  const render = (timeStamp) => {
    const posArr = particles.geometry.attributes.position.array;
    const velArr = particles.geometry.velocities;

    for (var i = 0; i < 3 * particleNum; i += 3) {
      const velocity = velArr[i / 3];

      const velX = Math.sin(timeStamp * 0.001 * velocity.x) * 0.1;
      const velZ = Math.cos(timeStamp * 0.0015 * velocity.z) * 0.1;

      posArr[i] += velX;
      posArr[i + 1] += velocity.y;
      posArr[i + 2] += velZ;

      if (posArr[i + 1] < -minRange) {
        posArr[i + 1] = minRange;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    gl.render(scene, camera);

    requestAnimationFrame(render);
  };

  const init = () => {
    /* scene
    -------------------------------------------------------------*/

    /* Snow Particles
    -------------------------------------------------------------*/
    const pointGeometry = new THREE.BufferGeometry();
    const positionTemp = [];
    for (let i = 0; i < particleNum; i++) {
      const x = Math.floor(Math.random() * maxRange - minRange);
      const y = Math.floor(Math.random() * maxRange - minRange);
      const z = Math.floor(Math.random() * maxRange - minRange);
      const particle = new THREE.Vector3(x, y, z);
      positionTemp.push(particle);
      // const color = new THREE.Color(0xffffff);
      // pointGeometry.colors.push(color);
    }
    pointGeometry.setFromPoints(positionTemp);

    const pointMaterial = new THREE.PointsMaterial({
      size: 1.5,
      color: 0xffffff,
      vertexColors: false,
      map: getTexture(),
      // blending: THREE.AdditiveBlending,
      transparent: true,
      // opacity: 0.8,
      fog: true,
      depthWrite: false,
    });

    const velocities = [];
    for (let i = 0; i < particleNum; i++) {
      const x = Math.floor(Math.random() * 6 - 3) * 0.02;
      const y = Math.floor(Math.random() * 10 + 3) * -0.01;
      const z = Math.floor(Math.random() * 6 - 3) * 0.02;
      const particle = new THREE.Vector3(x, y, z);
      velocities.push(particle);
    }

    particles = new THREE.Points(pointGeometry, pointMaterial);
    particles.geometry.velocities = velocities;
    scene.add(particles);

    /* rendering start
    -------------------------------------------------------------*/
    requestAnimationFrame(render);
  };

  return <></>;
};

export default Snow;
