import christmasTown from '../../assets/images/christmasTown.jpg';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../Atom';

const LoadingPage = () => {
  const loading = useRecoilValue(loadingState);
  return (
    <>
      {loading ? (
        <Container christmasTown={christmasTown}>
          <p>로딩중...</p>
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
  }
`;

export default LoadingPage;
