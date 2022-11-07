import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { JEELIZFACEFILTER, NN_4EXPR } from 'facefilter'
import JeelizResizer from "./util/JeelizResizer";
import JeelizThreeHelper from "./util/JeelizThreeHelper";
import JEELIZFACEFILTER from "./util/jeelizFaceFilter";
import { NN_DEFAULT } from 'facefilter';
const SantaFourCutAR = () =>{
// SETTINGS of this demo:
const SETTINGS = {
  gltfModelURL: 'model/octopus.gltf',
  offsetYZ: [2, -1], // offset of the model in 3D along vertical and depth axis
  // offset: [-1.2, -0.7, -1], // offset of the model in 3D along vertical and depth axis
  scale: 0.3
};

let THREECAMERA = null;

//entry point:
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    isFullScreen: true,
    callback: start,
    onResize: function(){
      JeelizThreeHelper.update_camera(THREECAMERA);
    }
  })
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec){
  const threeStuffs = JeelizThreeHelper.init(spec, null);

  // IMPORT THE GLTF MODEL:
  const gltfLoader = new GLTFLoader();
  gltfLoader.load( SETTINGS.gltfModelURL, function ( gltf ) {
    
    gltf.scene.position.add(new THREE.Vector3(0,SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));
    // gltf.scene.position.add(new THREE.Vector3(SETTINGS.offset[0],SETTINGS.offset[1], SETTINGS.offset[2]));
    gltf.scene.scale.multiplyScalar(SETTINGS.scale);

    // dispatch the model:
    threeStuffs.faceObject.add(gltf.scene);
  } ); //end gltfLoader.load callback
  
  //CREATE THE CAMERA
  THREECAMERA = JeelizThreeHelper.create_camera();
} //end init_threeScene()





function start(){
  JEELIZFACEFILTER.init({ 
    videoSettings:{ // increase the default video resolution since we are in full screen
      'idealWidth': 600,  // ideal video width in pixels
      'idealHeight': 600,  // ideal video height in pixels
      'maxWidth': 1920,    // max video width in pixels
      'maxHeight': 1920    // max video height in pixels
    },
    followZRot: true,
    canvasId: 'jeeFaceFilterCanvas',
    NNC: NN_DEFAULT, //root of NN_DEFAULT.json file
    callbackReady: function(errCode, spec){
      if (errCode){
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      init_threeScene(spec);
    }, //end callbackReady()

    // called at each render iteration (drawing loop):
    callbackTrack: function(detectState){
      JeelizThreeHelper.render(detectState, THREECAMERA);
    }
  }); //end JEELIZFACEFILTER.init call
} //end start()

// const cav = document.getElementById("jeeFaceFilterCanvas")
window.addEventListener('load', main());
};
export default SantaFourCutAR;
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// // import { JEELIZFACEFILTER, NN_4EXPR } from 'facefilter'
// import JeelizResizer from "./util/JeelizResizer";
// import JeelizThreeHelper from "./util/JeelizThreeHelper";
// import JEELIZFACEFILTER from "./util/jeelizFaceFilter";
// import NN_DEFAULT from "./neuralNets/NN_DEFAULT.json"
// import octopus from "../../assets/octopus.gltf"
// // SETTINGS of this demo:
// const SantaFourCutAR = () =>{
//   const SETTINGS = {
//     gltfModelURL: 'model/octopus.gltf',
//     offsetYZ: [2, -1], // offset of the model in 3D along vertical and depth axis
//     // offset: [-1.2, -0.7, -1], // offset of the model in 3D along vertical and depth axis
//     scale: 0.3
//   };
  
//   let THREECAMERA = null;

//   //entry point:
//   function main(){
//     console.log("gd");
//     JeelizResizer.size_canvas({
//       canvasId: 'jeeFaceFilterCanvas',
//       isFullScreen: true,
//       callback: start,
//       onResize: function(){
//         JeelizThreeHelper.update_camera(THREECAMERA);
//       }
//     })
//   }
//   // build the 3D. called once when Jeeliz Face Filter is OK
//   function init_threeScene(spec){
//     const threeStuffs = JeelizThreeHelper.init(spec, null);
  
//     // IMPORT THE GLTF MODEL:
//     const gltfLoader = new GLTFLoader();
    
//     gltfLoader.load( SETTINGS.gltfModelURL, function ( gltf ) {
      
//       gltf.scene.position.add(new THREE.Vector3(0,SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));
//       // gltf.scene.position.add(new THREE.Vector3(SETTINGS.offset[0],SETTINGS.offset[1], SETTINGS.offset[2]));
//       gltf.scene.scale.multiplyScalar(SETTINGS.scale);
  
//       // dispatch the model:
//       threeStuffs.faceObject.add(gltf.scene);
//     } ); //end gltfLoader.load callback
    
//     //CREATE THE CAMERA
//     THREECAMERA = JeelizThreeHelper.create_camera();
//   } //end init_threeScene()
  
//   function start(){
    

//     JEELIZFACEFILTER.init({ 
//       videoSettings:{ // increase the default video resolution since we are in full screen
//         'idealWidth': 600,  // ideal video width in pixels
//         'idealHeight': 600,  // ideal video height in pixels
//         'maxWidth': 1920,    // max video width in pixels
//         'maxHeight': 1920    // max video height in pixels
//       },
//       followZRot: true,
//       canvasId: 'jeeFaceFilterCanvas',
//       NNC: NN_DEFAULT, //root of NN_DEFAULT.json file
//       callbackReady: function(errCode, spec){
//         if (errCode){
//           console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
//           return;
//         }
  
//         init_threeScene(spec);
//       }, //end callbackReady()
  
//       // called at each render iteration (drawing loop):
//       callbackTrack: function(detectState){
//         JeelizThreeHelper.render(detectState, THREECAMERA);
//       }
//     }); //end JEELIZFACEFILTER.init call
//   } //end start()
  
//   window.addEventListener('load', main());
// }
// export default SantaFourCutAR;