import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchData } from '../../utils/apis/api';
import crown from '../../assets/images/crown2.png';
const GameRanking = (props) => {
  const { setPage, gameType } = props;
  const [scoreRank, setScoreRank] = useState([]);
  const [playRank, setplayRank] = useState([]);

  useEffect(() => {
    fetchData
      .get(`/api/v1/game?mtype=${gameType}&rtype=${1}&cnt=${10}`)
      .then((res) => {
        setScoreRank(res.data);
      });
    fetchData
      .get(`/api/v1/game?mtype=${gameType}&rtype=${2}&cnt=${10}`)
      .then((res) => {
        setplayRank(res.data);
      });
  }, []);

  return (
    <>
      <Title textColor="white">
        {gameType === 1 ? '선물 쌓기' : '길건너 눈사람'}
      </Title>
      <BackBtn>
        <IoIosArrowBack onClick={() => setPage(1)} color={'white'} size={50} />
      </BackBtn>
      <RankTableSet>
        <RankBox>
          <table>
            <caption>최고점수 TOP 10</caption>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {scoreRank?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {i === 0 ? (
                        <img src={crown} alt="" width="20px" />
                      ) : (
                        i + 1
                      )}
                    </td>
                    <td>{item.memberNickname}</td>
                    <td>{item.minigameScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </RankBox>
        <RankBox>
          <table>
            <caption>플레이 횟수 TOP 10</caption>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>횟수</th>
              </tr>
            </thead>
            <tbody>
              {playRank?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {i === 0 ? (
                        <img src={crown} alt="" width="20px" />
                      ) : (
                        i + 1
                      )}
                    </td>
                    <td>{item.memberNickname}</td>
                    <td>{item.minigameScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </RankBox>
      </RankTableSet>
    </>
  );
};
const Title = styled.h2`
  display: block;
  font-size: 60px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.textColor};
`;
const BackBtn = styled.div`
  position: absolute;
  left: 5px;
  top: 15px;
  cursor: pointer;
`;

const RankTableSet = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  gap: 60px;
  padding: 30px;
`;
const RankBox = styled.div`
  flex-grow: 1;
  width: 40%;
  /* display: flex;
  justify-content: center; */
  background-color: #7c7c7c6e;
  border-radius: 20px;
  padding: 10px;

  text-align: center;
  font-size: 20px;
  overflow: auto;
  color: white;

  table {
    width: 100%;
    caption {
      color: white;
      font-size: 30px;
      padding-bottom: 10px;
    }
    th {
      font-weight: 700;
      border-bottom: 2px solid white;
      padding: 8px 0;
    }
    td {
      padding: 8px 0;
    }
  }
`;
export default GameRanking;
