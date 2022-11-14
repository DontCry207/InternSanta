// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import styled from 'styled-components';
// import AppCanvas from './components/AppCanvas';
// import SantaFourCutAR from './SantaFourCutAR';
// const SantaFourCutPage = () => {
//   // const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // if (!loading) {
//     //   console.log('sdf');
//     SantaFourCutAR();
//     // }
//   }, []);
//   // const play = () => {
//   //   return <canvas width="600" height="600" id="jeeFaceFilterCanvas"></canvas>;
//   // };
//   // return (
//   //   <>
//   //     {loading ? (
//   //       <button
//   //         onClick={() => {
//   //           setLoading(false);
//   //         }}>
//   //         Play
//   //       </button>
//   //     ) : (
//   //       play()
//   //     )}
//   //   </>
//   // );
//   // function main() {
//   //   console.log('asdf');
//   // }
//   // window.addEventListener('load', main());
//   function capture() {
//     let canvas = document.getElementsByClassName('mirrorX')[1];
//     let imgData = canvas.toDataURL('image/png');
//     let im = document.createElement('img');
//     im.setAttribute('src', imgData);
//     document.body.appendChild(im);
//     // // console.log(imgData);
//   }
//   return (
//     <>
//       {/* <CameraBox>
//         <AppCanvas />
//       </CameraBox> */}
//       <canvas width="600" height="600" id="jeeFaceFilterCanvas"></canvas>
//       <Btn
//         onClick={() => {
//           capture();
//         }}>
//         캡쳐
//       </Btn>
//     </>
//   );
// };
// const CameraBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   .mirrorX {
//     right: 0;
//   }
// `;
// const Btn = styled.button`
//   position: absolute;
//   top: 0;
// `;
// export default SantaFourCutPage;
