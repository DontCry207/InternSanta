import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// import main script and neural network model from Jeeliz FaceFilter NPM package
import { JEELIZFACEFILTER, NN_4EXPR } from 'facefilter';

// import THREE.js helper, useful to compute pose
// The helper is not minified, feel free to customize it (and submit pull requests bro):
import { JeelizThreeFiberHelper } from '../contrib/faceFilter/JeelizThreeFiberHelper.js';
import myCharacter from '../../../assets/character.glb';
import { Stars, useGLTF } from '@react-three/drei';
// import { Model } from '../Character_final';

const _maxFacesDetected = 1; // max number of detected faces
const _faceFollowers = new Array(_maxFacesDetected);
let _expressions = null;

// This mesh follows the face. put stuffs in it.
// Its position and orientation is controlled by Jeeliz THREE.js helper
const FaceFollower = (props) => {
  // This reference will give us direct access to the mesh
  const objRef = useRef();
  useEffect(() => {
    const threeObject3D = objRef.current;
    // console.log(threeObject3D);
    // threeObject3D.position = THREE.Vector3(-0.33, -0.73, -5.64);
    _faceFollowers[props.faceIndex] = threeObject3D;
  });

  // const mouthOpenRef = useRef();
  // const mouthSmileRef = useRef();
  // useFrame(() => {
  //   if (mouthOpenRef.current) {
  //     const s0 = props.expression.mouthOpen;
  //     mouthOpenRef.current.scale.set(s0, 1, s0);
  //   }

  //   if (mouthSmileRef.current) {
  //     const s1 = props.expression.mouthSmile;
  //     mouthSmileRef.current.scale.set(s1, 1, s1);
  //   }
  // });

  // console.log('RENDER FaceFollower component');
  const { nodes, materials, animations } = useGLTF(myCharacter);
  nodes.Scene.rotateY(Math.PI);
  return (
    <>
      <Stars
        radius={40}
        depth={20}
        count={1000}
        factor={4}
        saturation={1}
        fade
        speed={5}
      />
      <object3D ref={objRef}>
        {/* <mesh name="mainCube" position={[0, 1.5, 0]}>
        <boxBufferGeometry args={[0.8, 0.8, 0.8]} />
        <meshNormalMaterial />
      </mesh> */}
        <ambientLight intensity={0.8} />
        <primitive object={nodes.Scene} scale={0.7} position={[0, 1, 0]} />
        {/* <Model /> */}
      </object3D>
    </>
  );
};

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
let _threeFiber = null;
const ThreeGrabber = (props) => {
  _threeFiber = useThree();
  useFrame(
    JeelizThreeFiberHelper.update_camera.bind(
      null,
      props.sizing,
      _threeFiber.camera,
    ),
  );
  return null;
};

const compute_sizing = () => {
  // compute  size of the canvas:
  const height = 400;
  const wWidth = 600;
  // const width = Math.min(wWidth, height);
  const width = 600;

  // compute position of the canvas:
  const top = 0;
  const left = (wWidth - width) / 2;
  return { width, height, top, left };
};

const AppCanvas = () => {
  // init state:
  // _expressions = [];
  // for (let i = 0; i < _maxFacesDetected; ++i) {
  //   _expressions.push({
  //     mouthOpen: 0,
  //     mouthSmile: 0,
  //     eyebrowFrown: 0,
  //     eyebrowRaised: 0,
  //   });
  // }
  const [sizing, setSizing] = useState(compute_sizing());
  const [isInitialized] = useState(true);

  let _timerResize = null;
  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = setTimeout(do_resize, 200);
  };

  const do_resize = () => {
    _timerResize = null;
    const newSizing = compute_sizing();
    setSizing(newSizing);
  };

  useEffect(() => {
    if (!_timerResize) {
      JEELIZFACEFILTER.resize();
    }
  }, [sizing]);

  const callbackReady = (errCode, spec) => {
    if (errCode) {
      console.log('AN ERROR HAPPENS. ERR =', errCode);
      return;
    }

    console.log('INFO: JEELIZFACEFILTER IS READY');
    // there is only 1 face to track, so 1 face follower:
    JeelizThreeFiberHelper.init(spec, _faceFollowers, callbackDetect);
  };

  const callbackTrack = (detectStatesArg) => {
    // if 1 face detection, wrap in an array:
    const detectStates = detectStatesArg.length
      ? detectStatesArg
      : [detectStatesArg];

    // update video and THREE faceFollowers poses:
    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera);

    // render the video texture on the faceFilter canvas:
    JEELIZFACEFILTER.render_video();

    // get expressions factors:
    detectStates.forEach((detectState, faceIndex) => {
      const exprIn = detectState.expressions;
      // const expression = _expressions[faceIndex];
      // expression.mouthOpen = exprIn[0];
      // expression.mouthSmile = exprIn[1];
      // expression.eyebrowFrown = exprIn[2]; // not used here
      // expression.eyebrowRaised = exprIn[3]; // not used here
    });
  };

  const callbackDetect = (faceIndex, isDetected) => {
    if (isDetected) {
      console.log('DETECTED');
    } else {
      console.log('LOST');
    }
  };

  const faceFilterCanvasRef = useRef(null);
  useEffect(() => {
    window.addEventListener('resize', handle_resize);
    window.addEventListener('orientationchange', handle_resize);

    JEELIZFACEFILTER.init({
      canvas: faceFilterCanvasRef.current,
      NNC: NN_4EXPR,
      maxFacesDetected: 1,
      followZRot: true,
      callbackReady,
      callbackTrack,
    });
    return JEELIZFACEFILTER.destroy;
  }, [isInitialized]);

  console.log('RENDER AppCanvas component');
  return (
    <>
      <Canvas
        className="mirrorX"
        style={{
          zIndex: 2,
          ...sizing,
        }}
        gl={{
          preserveDrawingBuffer: true, // allow image capture
        }}
        updatedefaultcamera="false">
        <Suspense fallback={null}>
          <ThreeGrabber sizing={sizing} />
          <FaceFollower faceIndex={0} />
        </Suspense>
      </Canvas>

      {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
      <canvas
        className="mirrorX"
        ref={faceFilterCanvasRef}
        style={{
          position: 'absolute',
          zIndex: 1,
          ...sizing,
        }}
        width={sizing.width}
        height={sizing.height}
      />
    </>
  );
};

useGLTF.preload(myCharacter);

export default AppCanvas;
