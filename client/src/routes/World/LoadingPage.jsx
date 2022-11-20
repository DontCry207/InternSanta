import christmasTown from '../../assets/images/christmasTown.jpg';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../Atom';
import loadingImg from '../../assets/images/loading.png';
const LoadingPage = () => {
  const loading = useRecoilValue(loadingState);
  return (
    <>
      {loading ? (
        <Container christmasTown={christmasTown}>
          <p>Loading...</p>
          <img src={loadingImg} alt="" />
          <span>Tip. 썰매는 1마리의 루돌프와 8마리의 순록이 끄는 것이다.</span>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  z-index: 20;
  background-image: url(${(props) => props.christmasTown});
  background-size: cover;

  p {
    font-size: 80px;
    color: white;
    -webkit-text-stroke: 2px #000;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
    padding-bottom: 20px;
  }
  img {
    width: 50%;
  }
  span {
    padding-top: 20px;
    font-size: 36px;
    color: white;
    -webkit-text-stroke: 1px #000;
  }
`;

export default LoadingPage;
