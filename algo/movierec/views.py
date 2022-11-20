from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pickle
from django.apps import AppConfig

CONST_MOVIES = {}
CONST_COSINE_SIM = {}

class MovieInit(AppConfig):
  global CONST_MOVIES
  global CONST_COSINE_SIM
  CONST_MOVIES = pickle.load(open('movies.pickle', 'rb'))
  CONST_COSINE_SIM = pickle.load(open('cosine_sim.pickle', 'rb'))

@api_view(["GET"])
def getMovieList(request):
  global CONST_MOVIES

  result = []
  for i in range(len(CONST_MOVIES)):
    movie_res = {}
    
    movie_res["title"] = CONST_MOVIES["title"][i]
    movie_res["poster_path"] = CONST_MOVIES["poster_path"][i]
    
    result.append(movie_res)
    
  return Response(result, status=status.HTTP_200_OK)

@api_view(["GET"])
def recommend(request):

  global CONST_MOVIES
  global CONST_COSINE_SIM

  title = request.GET["title"]

  # 영화의 제목을 통해서 전체 데이터 기준 그 영화의 index 값을 얻기
  idx = CONST_MOVIES[CONST_MOVIES['title'] == title].index[0]
  
  # 코사인 유사도 매트릭스 (CONST_COSINE_SIM)에서 idx에 해당하는 데이터를 (idx, 유사도) 형태로 얻기
  sim_scores = list(enumerate(CONST_COSINE_SIM[idx]))

  # 코사인 유사도 기준으로 내림차순 정렬
  sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

  # 자기 자신을 제외한 10개의 추천 영화를 슬라이싱
  sim_scores = sim_scores[1:11]

  # 추천 영화 목록 10개와 인덱스 정보 추출
  movie_indices = [i[0] for i in sim_scores]

  result = []
  for i in movie_indices:
    movie = {}
    
    if CONST_MOVIES["title_kr"][i] :
      movie["title"] = CONST_MOVIES["title_kr"][i]
    else:
      movie["title"] = CONST_MOVIES["title"][i]

    if CONST_MOVIES["overview_kr"][i]:
      movie["overview"] = CONST_MOVIES["overview_kr"][i]
    else:
      movie["overview"] = CONST_MOVIES["overview"][i]

    movie["poster_path"] = CONST_MOVIES["poster_path"][i]
    movie["release_date"] = CONST_MOVIES["release_date"][i]
    
    result.append(movie)
    
  return Response(result, status=status.HTTP_200_OK)