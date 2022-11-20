import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { musicModalState } from '../../../Atom';
import AlertModal from '../../Common/AlertModal';

const MusicControlModal = (props) => {
  const [musicModal, setMusicModal] = useRecoilState(musicModalState);

  const volumeChange = (e) => {
    props.setVolume(e.target.valueAsNumber);
  };

  const close = (e) => {
    setMusicModal(false);
  };

  const render = () => {
    return (
      <Modal>
        <AlertModal
          title={'볼륨'}
          rightBtnName={'닫기'}
          setRightBtnControl={() => {
            close();
          }}>
          <Container>
            <VolumeControl>
              <input
                id="volumeControl"
                type="range"
                value={props.volume}
                min={0}
                max={1}
                step={0.01}
                onChange={volumeChange}
              />
            </VolumeControl>
            <Volume>
              <p>음량: {(props.volume * 100).toFixed(0)}</p>
            </Volume>
          </Container>
        </AlertModal>
      </Modal>
    );
  };

  return <>{musicModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 10;
`;

const VolumeControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    height: 40px;
    width: 100%;
    &::-webkit-slider-thumb {
      cursor: pointer;
    }
  }
`;

const Volume = styled.div`
  pointer-events: none;
  font-size: 26px;
`;

export default MusicControlModal;
