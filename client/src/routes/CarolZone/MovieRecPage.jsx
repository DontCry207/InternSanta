import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import santa from '../../assets/images/santa.png';
import { useRef } from 'react';

const MovieRecPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieRecList, setMovieRecList] = useState(null);
  // const movieRef = useRef();
  useEffect(() => {
    fetchData.get('/api/v2/movie').then((res) => {
      setMovieList(res.data);
    });
  }, []);

  const movieSelect = function (e) {
    setSelectedMovie(e.target.value);
  };

  const getMovieRecList = async () => {
    const res = await fetchData.get(
      '/api/v2/movie/recommend?title=' + selectedMovie,
    );
    setMovieRecList(res.data);
  };

  useEffect(() => {
    document.getElementById('movierec')?.scrollTo(0, 0);
  }, [movieRecList]);

  const page1 = () => {
    return (
      <>
        <MovieListBox>
          <form>
            <MovieList>
              {movieList?.map((item, i) => {
                return (
                  <MovieBox key={i}>
                    <RadioButton
                      type="radio"
                      id={i}
                      name="movie"
                      value={item.title}
                      onChange={(e) => {
                        movieSelect(e);
                      }}
                    />
                    <label htmlFor={i}>
                      <img
                        src={item.poster_path}
                        alt={item.title}
                        title={item.title}
                      />
                    </label>
                  </MovieBox>
                );
              })}
            </MovieList>
          </form>
        </MovieListBox>
        <RecButton>
          <button
            onClick={() => {
              getMovieRecList();
            }}
            disabled={selectedMovie ? false : true}>
            선택완료
          </button>
        </RecButton>
      </>
    );
  };

  const page2 = () => {
    return (
      <>
        <MovieListBox id="movierec">
          <form>
            <MovieRecList>
              {movieRecList?.map((item, i) => {
                return (
                  <MovieInfoBox key={i}>
                    <img
                      src={item.poster_path}
                      alt={item.title}
                      title={item.title}
                    />
                    <div>
                      <Title>
                        <p>{item.title}</p>
                      </Title>
                      <Content>
                        <p>개봉날짜 : {item.release_date}</p>
                        <p>줄거리 : {item.overview}</p>
                      </Content>
                    </div>
                  </MovieInfoBox>
                );
              })}
            </MovieRecList>
          </form>
        </MovieListBox>
      </>
    );
  };

  const render = () => {
    return (
      <>
        <div>
          <Logo>
            <p>크리스마스</p>
            <img src={santa} alt="santaLogo" />
            <p>무비박스</p>
          </Logo>
          {movieRecList ? (
            <SubTitle>오늘 밤 이런 영화 어떤가요?</SubTitle>
          ) : (
            <SubTitle>
              다음의 크리스마스 영화들 중 재미있게 보았던 영화를 골라주세요!
            </SubTitle>
          )}
        </div>
        {movieRecList ? page2() : page1()}
      </>
    );
  };
  return movieList ? render() : null;
};

const Logo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 72px;
  color: #de6363;
  img {
    width: 76px;
  }
`;
const SubTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 25px;
  color: #ececec;
  padding: 20px 0;
`;
const MovieListBox = styled.div`
  overflow: auto;
`;
const MovieList = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  justify-content: center;
  padding: 0 45px;
  grid-template-columns: repeat(5, minmax(auto, 300px));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;
const MovieBox = styled.div`
  width: 170px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  background-position: center center;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  label {
    display: flex;
    justify-content: center;
  }
  img {
    display: block;
    width: 95%;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
  }
  input {
    &:checked + label > img {
      border: 5px dashed red;
      /* outline: 5px dashed green; */
    }
    /* &:checked + label {
      transform: scale(1.1);
    } */
  }
`;
const MovieRecList = styled.div`
  width: 100%;
  place-items: center;
  justify-content: center;
  padding: 0 45px;
  gap: 10px;
`;
const MovieInfoBox = styled.div`
  width: 80%;
  margin: 0 auto;
  /* box-sizing: border-box; */
  overflow: hidden;
  /* cursor: pointer; */
  background-position: center center;
  display: flex;
  align-items: center;
  padding: 10px 0;
  img {
    /* display: block; */
    width: 20%;
    height: 100%;
    border-radius: 10px;
    transition: 0.3s;
  }
  div {
    padding: 15px 25px;
    /* display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical; */
  }
`;
const Title = styled.div`
  p {
    font-size: 40px;
    font-weight: bold;
    padding-bottom: 15px;
  }
`;

const Content = styled.div`
  p {
    font-size: 20px;
    padding-bottom: 10px;
  }
`;
const RadioButton = styled.input`
  display: none;
`;
const RecButton = styled.div`
  padding-top: 15px;
  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    &:disabled {
      background-color: lightgray;
    }
  }
`;

export default MovieRecPage;
