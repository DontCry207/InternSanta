CREATE DATABASE  IF NOT EXISTS `internsanta_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `internsanta_db`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k7a207.p.ssafy.io    Database: internsanta_db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `advent_calendar`
--

DROP TABLE IF EXISTS `advent_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advent_calendar` (
  `advent_calendar_id` bigint NOT NULL AUTO_INCREMENT,
  `advent_calendar_check` datetime(6) NOT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`advent_calendar_id`),
  KEY `FK4ghcg12kl4fp4u4kg2pr2dq07` (`member_id`),
  CONSTRAINT `FK4ghcg12kl4fp4u4kg2pr2dq07` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advent_calendar`
--

LOCK TABLES `advent_calendar` WRITE;
/*!40000 ALTER TABLE `advent_calendar` DISABLE KEYS */;
INSERT INTO `advent_calendar` VALUES (1,'2022-11-18 10:56:08.577000',3);
/*!40000 ALTER TABLE `advent_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fortune`
--

DROP TABLE IF EXISTS `fortune`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fortune` (
  `fortune_id` bigint NOT NULL AUTO_INCREMENT,
  `fortune_content` varchar(50) NOT NULL,
  PRIMARY KEY (`fortune_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fortune`
--

LOCK TABLES `fortune` WRITE;
/*!40000 ALTER TABLE `fortune` DISABLE KEYS */;
INSERT INTO `fortune` VALUES (1,'오늘 저녁엔 소고기를 먹어볼까'),(2,'좋은 일이 일어날 것 같은 날이야!'),(3,'난 너무 완벽해'),(4,'내가 너무 귀여운 탓이지..'),(5,'오늘은 나서지 말고 조용히 있어야겠어'),(6,'이 답답한 속을 달래기 위해 빙수를 먹어야겠어'),(7,'루돌프를 조심해..!'),(8,'산타클로스가 제일 좋아하는 음식은 민스파이야'),(9,'오늘은 일찍 자야겠어'),(10,'오후에 좋은 일이 생길거야'),(11,'이불 밖은 위험한데 왜 난 여기에'),(12,'이 고비를 잘 넘겨야 합니다'),(13,'의욕이 넘치네요'),(14,'오늘까지만 참는다'),(15,'예상치 못한 잔업이 있습니다'),(16,'서두르지 마세요'),(17,'참으면 반드시 득이 돼요'),(18,'나는 노동자, 슬픈 내 눈동자'),(19,'스치면 인연 스며들면 스폰지밥'),(20,'신경 쓰지 말고 마이웨이'),(21,'먹어도 먹어도 배고프네'),(22,'역시 내가 귀여운 탓인가'),(23,'난 좀 더 행복할 자격이 있어'),(24,'본인을 믿으세요'),(25,'여유를 가져보자'),(26,'옛 친구를 만나게 됩니다'),(27,'과감하게 시도하세요'),(28,'치열하게 아무것도 안 하고 싶다'),(29,'지나간 일에 미련을 갖지 마라'),(30,'선택과 집중이 필요합니다'),(31,'시작만 하면 어떻게든 되겠네요'),(32,'충동구매를 조심해야 합니다.'),(33,'사랑은 사랑으로 잊는거야');
/*!40000 ALTER TABLE `fortune` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `member_email` varchar(100) NOT NULL,
  `member_pwd` varchar(20) NOT NULL,
  `member_nickname` varchar(20) NOT NULL,
  `member_chapter` int NOT NULL DEFAULT '0',
  `member_checkpoint` int NOT NULL DEFAULT '0',
  `member_coin` int NOT NULL DEFAULT '0',
  `member_ticket` int NOT NULL DEFAULT '0',
  `member_top` varchar(500) DEFAULT 'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',
  `member_pet` int NOT NULL DEFAULT '0',
  `member_seal_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FKgbs2mhds0ey74bsf1qi6uvpih` (`member_seal_id`),
  CONSTRAINT `FKgbs2mhds0ey74bsf1qi6uvpih` FOREIGN KEY (`member_seal_id`) REFERENCES `member_seal` (`member_seal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'yangksks@gmail.com','1234','양경섭',0,0,9996607,2,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/1/467728149e26897c3bc025ad45bf42258e581ffcd5fe5246c0307594e4391e0f.png',6,1),(2,'mino','1234','mino',2,1,9989830,1,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/2/999d8dbd11ceda899c1e3ac253844996fdd9ebee423edfda8f655feb53f28564.png',0,2),(3,'syong0716@naver.com','hyeseong98','혜또',4,1,8422,13,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/3/95de948e01d226076b3335065dd08534cc918c4cc8a25c836fd790c4ede98cc2.png',2,3),(4,'wonjh07@naver.com','lmh30220','최강재호',10,0,10007185,12,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/4/5862d4ff7773237be76f7ff26b5b03e11187d5d6b406357e705e878a9d07dc58.png',2,4),(5,'asdf@naver.com','asdfff','asdf',10,0,9952130,33,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/5/90036945cab592c4b1265e13078e05b52e360b3500cb4f7c2c076d2d7bd29da4.png',2,5),(6,'msms@naver.com','asdfff','민서',0,0,9999999,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,6),(7,'test@naver.com','asdfff','테스트',0,0,9999999,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,7),(8,'aaa@naver.com','q1w2e3r4','닉네임',10,0,9989781,7,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/8/1e1dbbdf08162f4bb2529b046dfb25a2108ee38cc004a0921c247f24f5134d60.png',8,8),(9,'apitest@test.com','1234','apitest',0,1,9999999,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/9/texture.png',2,9),(10,'apitest2@test.com','1234','apitest',0,0,9999999,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,10),(11,'n@g.com','dkssud12','하잉',1,0,4,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,11),(12,'dev.dukgu@kakao.com','121415','김덕구',0,0,971,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,12),(13,'123@asd.com','123456','123',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,13),(14,'test1234@test.com','12341234','염탐꾼',0,0,35,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,14),(15,'kyu@naver.com','!QAZ2wsx','규규',0,0,10,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,15),(16,'kk_st1@naver.com','gozldrmawl7','김지수',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,16),(17,'asd@asd.asd','123456','1234',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,17),(18,'ssafy@ssafy.com','123456','멍멍',0,0,2449,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,18),(19,'aaa@aaa.com','123412','1234',0,0,40,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,19),(20,'jiww@efw.a','1234qwer','12rfe',0,0,72,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,20),(21,'consultant@ssafy.com','consul123','컨입니다',0,0,47,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,21),(22,'aaaa@naver.com','aaaa1234!','민서짱',0,0,122,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,22),(23,'ggg@naver.com','123456','ggg',0,0,23,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,23),(24,'test@ssafy.com','test','test',0,0,1005105,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,24),(25,'aaa@aaa.aaa','aaaaaa','aaaa',0,0,14,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,25),(26,'wnsguddl92@naver.com','joon6903','Maa',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,26),(27,'gg@gg.com','gggggg','ㅎㅎㅎㅎ',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,27),(28,'gggg@gg.com','gggggg','Ggg',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,28),(29,'santa@naver.com','123456','인턴산타',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,29),(30,'tt@tt.com','123456','tt',0,0,1000,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/30/6c58b5414100819af34768f755a1c3de149dab505706618d0501acaffdf6d02f.png',0,30),(31,'t@t.com','123456','ttt',0,0,0,0,'https://internsanta.s3.ap-northeast-2.amazonaws.com/texture/0/texture.png',0,31);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_seal`
--

DROP TABLE IF EXISTS `member_seal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_seal` (
  `member_seal_id` bigint NOT NULL AUTO_INCREMENT,
  `member_seals` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`member_seal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_seal`
--

LOCK TABLES `member_seal` WRITE;
/*!40000 ALTER TABLE `member_seal` DISABLE KEYS */;
INSERT INTO `member_seal` VALUES (1,'1,4,0,5,6,3,0,0,6,0,3,2'),(2,'28,5,3,7,7,5,10,10,9,4,7,8'),(3,'3,1,6,1,1,2,5,3,0,1,5,5'),(4,'7,9,3,0,1,12,9,6,3,6,3,6'),(5,'4,14,10,6,5,12,10,0,15,7,0,9'),(6,'0,0,0,0,0,0,0,0,0,0,0,0'),(7,'0,0,0,0,0,0,0,0,0,0,0,0'),(8,'1,4,0,11,3,3,3,0,4,7,3,4'),(9,'0,0,0,0,0,0,1,0,0,0,0,0'),(10,'0,0,0,0,0,0,0,0,0,0,0,0'),(11,'0,0,0,0,0,0,0,0,0,0,0,0'),(12,'0,0,0,0,0,0,0,0,0,0,0,0'),(13,'0,0,0,0,0,0,0,0,0,0,0,0'),(14,'0,0,0,0,0,0,0,0,0,0,0,0'),(15,'0,0,0,0,0,0,0,0,0,0,0,0'),(16,'0,0,0,0,0,0,0,0,0,0,0,0'),(17,'0,0,0,0,0,0,0,0,0,0,0,0'),(18,'0,0,0,0,0,0,0,0,0,0,0,0'),(19,'0,0,0,0,0,0,0,0,0,0,0,0'),(20,'0,0,0,0,0,0,0,0,0,0,0,0'),(21,'0,0,0,0,0,0,0,0,0,0,0,0'),(22,'0,0,0,0,0,0,0,0,0,0,0,0'),(23,'0,0,0,0,0,0,0,0,0,0,0,0'),(24,'0,0,0,0,0,0,0,0,0,0,0,0'),(25,'0,0,0,0,0,0,0,0,0,0,0,0'),(26,'0,0,0,0,0,0,0,0,0,0,0,0'),(27,'0,0,0,0,0,0,0,0,0,0,0,0'),(28,'0,0,0,0,0,0,0,0,0,0,0,0'),(29,'0,0,0,0,0,0,0,0,0,0,0,0'),(30,'0,0,0,0,0,0,0,0,0,0,0,0'),(31,'0,0,0,0,0,0,0,0,0,0,0,0');
/*!40000 ALTER TABLE `member_seal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest`
--

DROP TABLE IF EXISTS `quest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quest` (
  `quest_id` bigint NOT NULL AUTO_INCREMENT,
  `quest_chapter` int NOT NULL,
  `quest_checkpoint` int NOT NULL,
  `quest_title` varchar(100) NOT NULL,
  `quest_sub` varchar(100) NOT NULL,
  `quest_npc` int NOT NULL,
  PRIMARY KEY (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest`
--

LOCK TABLES `quest` WRITE;
/*!40000 ALTER TABLE `quest` DISABLE KEYS */;
INSERT INTO `quest` VALUES (1,0,0,'Ep0. 첫 출근!','루돌프에게 말 걸기',0),(2,1,0,'Ep1. 복장은 개성있게!','프랜서에게 말 걸기',1),(3,1,1,'Ep1. 복장은 개성있게!','옷 갈아입기',1),(4,1,2,'Ep1. 복장은 개성있게!','프랜서에게 돌아가기',1),(5,2,0,'Ep2. 내 동료가 돼라!','블리즌에게 말 걸기',2),(6,2,1,'Ep2. 내 동료가 돼라!','펫 분양받기',2),(7,2,2,'Ep2. 내 동료가 돼라!','프랜서에게 돌아가기',2),(8,3,0,'Ep3. 오늘의 운세','도너에게 말 걸기',3),(9,3,1,'Ep3. 오늘의 운세','오늘의 운세 확인하기',3),(10,3,2,'Ep3. 오늘의 운세','도너에게 돌아가기',3),(11,4,0,'Ep4. 산타차 뽑았다 널 데리러가~','빅슨에게 말 걸기',4),(12,4,1,'Ep4. 산타차 뽑았다 널 데리러가~','나무 구해오기',4),(13,4,2,'Ep4. 산타차 뽑았다 널 데리러가~','썰매 재료 구해오기',4),(14,5,0,'Ep5. 씰Look 씰Look','큐피드에게 말 걸기',5),(15,5,1,'Ep5. 씰Look 씰Look','크리스마스 씰 뽑기',5),(16,5,2,'Ep5. 씰Look 씰Look','큐피드에게 돌아가기',5),(17,6,0,'Ep6. 방구석 1열','코멧에게 말 걸기',6),(18,6,1,'Ep6. 방구석 1열','영화 추천 받기',6),(19,6,2,'Ep6. 방구석 1열','코멧에게 돌아가기',6),(20,7,0,'Ep7. 야근은 괴로워','대셔에게 말 걸기',7),(21,7,1,'Ep7. 야근은 괴로워','미니 게임 - 선물 쌓기',7),(22,7,2,'Ep7. 야근은 괴로워','미니 게임 - 길건너 눈사람',7),(23,7,3,'Ep7. 야근은 괴로워','대셔에게 돌아가기',7),(24,8,0,'Ep8. ★산타네컷★','댄서에게 말 걸기',8),(25,8,1,'Ep8. ★산타네컷★','산타네컷 촬영하기',8),(26,8,2,'Ep8. ★산타네컷★','댄서에게 돌아가기',8),(27,9,0,'Ep9. 드디어 정규직!','루돌프에게 말 걸기',0),(28,10,0,'스토리 완료','인턴산타만의 다양한 컨텐츠를 즐겨보세요!',0);
/*!40000 ALTER TABLE `quest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest_script`
--

DROP TABLE IF EXISTS `quest_script`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quest_script` (
  `quest_script_id` bigint NOT NULL AUTO_INCREMENT,
  `quest_id` bigint DEFAULT NULL,
  `quest_script_txt` varchar(500) NOT NULL,
  PRIMARY KEY (`quest_script_id`),
  KEY `FK8u112blxiw5w6nniytojqknjg` (`quest_id`),
  CONSTRAINT `FK8u112blxiw5w6nniytojqknjg` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest_script`
--

LOCK TABLES `quest_script` WRITE;
/*!40000 ALTER TABLE `quest_script` DISABLE KEYS */;
INSERT INTO `quest_script` VALUES (1,1,'안녕 너가 새로온 인턴이구나? 나는 인사팀장 루돌프야.,산타 정직원이 되기 위해선 순록 여덟 마리를 설득해서 너랑 같이 일할 수 있게 해야 해.,너가 순록들 부탁을 하나씩 들어주면 너의 편이 될거야.,순록들이 처음엔 조금 쌀쌀맞을 수는 있지만 속은 다 착한 애들이야.,미션들도 그렇게 어렵진 않으니까 걱정은 하지말라구^^,12월 24일까지 꼭 미션을 수행해서 정식 산타가 될 수 있길 바라!'),(2,2,'뭐야 너 새로 온 인턴이냐?,흠… 근데 너 옷이 그게 뭐야!,나랑 같이 일하고 싶으면 새로운 옷으로 갈아입고 와!,옷 가게에 가면 너가 만들고 싶은 옷을 만들 수 있어.'),(3,3,'어서 새로운 옷으로 갈아입고 와!'),(4,4,'이제야 조금 봐줄만 하네. 그래 너랑 같이 일하도록 할게!,나머지 순록들도 꼭 데려오고! 25일에 만나자고!'),(5,5,'복장이 말끔하다 인턴! 하하하하! 마음에 들었다!,하지만 마음에 안 들어! 산타를 지망하는 녀석이 혼자 쫄랑쫄랑 다니고 있느냐!,동물에게 사랑 받는 자만 산타가 될 자격이 있다! 자! 가서 너를 따르는 펫 한 마리를 데려오너라!,기왕이면 네 얼굴하고 똑같이 생긴 녀석이 좋겠군! 하하하하!'),(6,6,'아직도 데려오지 못한게야? 얼른 다녀오라고!!'),(7,7,'아주 똑닮은 녀석을 데려왔구나! 잘했다!,나도 너와 함께 일을 하고 싶어졌다!,이제 다음 순록을 찾으러 가거라!'),(8,8,'지금까지… 많은 산타를 봐 왔지…,오랫동안 이 일을 하고… 그야말로 산타 할아버지가 될 때까지 일한 녀석도 있지만…,썰매는 위험해… 은퇴한 녀석도… 있지…,후후후… 네 운을 시험해 보겠어…? 캐롤존 벽난로에 가면… 네 운을 시험할 수 있어…'),(9,9,'어서 너의 운을 시험해봐…'),(10,10,'적절한 운세를 받았나?,만족하는 표정이군… 너의 표정이 내 마음을 움직였다…,너와 함께 일하도록 하지… 준비하고 있겠다…'),(11,11,'썰매가 부서졌어. 인턴한테 줄 썰매는 없어. 네가 만들어 와.,만들기 싫어? 내가 왜 만들어야 하냐고? 그럼 만들지 마. 근데 크리스마스 날 뭐 타고 나갈 건 있어?,내 특별히 인턴이니까 재료를 가져오면 썰매 만드는법은 알려주도록 하지.'),(12,12,'뭐야? 아직도 재료를 다 안가지고 온거야? 느려 터졌네.'),(13,13,'왜 이렇게 늦게 와? 기다리다 목 빠지는 줄 알았네.,좋은 재료가 좋은 썰매를 만든다! 이 재료로 만든 썰매를 끌어보고싶군. 특별히 같이 일해주도록 하지. 25일에 보자 인턴.'),(14,14,'꺄아아아앙 너가 새로 온 인턴이구낭?! >< 어머어머 너무 귀엽게 생겼다!ㅎㅎ,우리 마을에 너처럼 귀여운 크리스마스 씰이 있는데.. 알고 있었어??,어머어머 몰랐다구!??!! 그렇다면 상점에 있는 뽑기 기계에서 씰을 뽑아봐! 아주아주 마음에 들걸?!ㅎㅎ,모든 씰을 다 모으면 선물에 응모할 수 있는 티켓이 생긴다는데?!?!?!! 한번해봐!! 꺄항항'),(15,15,'꺄아아아앙! 너무너무 귀여운 씰~~~!!! 얼른 얼른 뽑아봐!!!'),(16,16,'어때 어때?!?! 너무 귀엽지?!??!!>< 꼭 모든 씰을 다 모아봐!!ㅎㅎ,난 처음부터 너가 너무 마음에 들었어!!! 우리 앞으로 같이 잘 해보자!!'),(17,17,'바쁘다 바빠… 응? 뭐가 바쁘냐고? 도와주겠다고?,내가 저번에 본 영화가 너무 재밌어서 비슷한 영화를 찾아서 보고 싶은데, 아무리 찾아도 포스터만 봐서는 잘 모르겠단 말이야.,이대로는 일하러 가지도 않고 계속 영화만 찾고 있을 것 같아. 네가 재밌는 영화 추천해 줘!'),(18,18,'이 영화는 과연 재밌을까..? 영화 고르는게 제일 어려워..'),(19,19,'어머! 너무 재밌어보이는 영화잖아? 일하러 가기 전에 다봐야겠어!,난 이제 영화를 보러 갈게! 25일에 봐!'),(20,20,'— (선물을 정리하며 과로에 시달리던 순록),왜 이렇게 늦게 와... 헉헉…벌써 해가 저물었어. 이대로 가다간 자정이 돼도 출발을 못할 거야., 시작부터 지연이 되면 우리는 끝장이다! 25일 아침에 아이들이 선물을 못 받게 되면 파산하고 말 거야…!,여기 선물 상자들을 최대한 높게 쌓아. 낮게 쌓으면 들어갈 자리가 없어!!,쌓고 나서 선물을 길 건너편으로 옮겨야 해!! 얼른 서둘러!'),(21,21,'얼른 선물을 쌓아!! 시간이 없어!!'),(22,22,'어서 선물을 길 건너편으로 옮겨!! 거의 다했어!!'),(23,23,'휴… 덕분에 시간 안에 다 끝낼 수 있었어. 내일도 같이 힘내보자!'),(24,24,'이제 어엿한 산타의 태가 나는걸?,첫 크리스마스 임무를 받고 출발하기 전 사진 촬영을 하는 것이 산타의 전통이야!,너도 멋지게 사진 한 장 찍어봐!'),(25,25,'찰칵! 찰칵! 멋진 사진을 찍어봐!'),(26,26,'사진 정말 잘나왔다! 이 사진은 평생 간직해야 해! 그럼 25일에 보자!'),(27,27,'오호...모든 순록들의 마음을 사로잡았다니...대단한걸?,쉽지 않은 일이었을텐데 아주 수고 많았다 인턴!,아 아니지...이제 인턴이 아니고 정식 산타가 됐잖아! 축하한다!,그럼 크리스마스 날까지 우리 마을에서 편한 시간 보내면서 같이 놀아보자고! 하하하!'),(28,28,'인턴산타의 모든 스토리를 완료했어요!,인턴산타만의 재미있는 컨텐츠를 즐겨보세요!');
/*!40000 ALTER TABLE `quest_script` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `refresh_token_id` bigint NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(500) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`refresh_token_id`),
  KEY `FK5gdbafb2i76hk1ai18ah6an4w` (`member_id`),
  CONSTRAINT `FK5gdbafb2i76hk1ai18ah6an4w` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (1,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YW5na3Nrc0BnbWFpbC5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2Njk1MzIwMjIsImlhdCI6MTY2ODkyNzIyMiwibWVtYmVyRW1haWwiOiJ5YW5na3Nrc0BnbWFpbC5jb20ifQ.b3BzQw4vN8I1MJH8plNMhIL5komWup21PggFuAhM6dSA4JDueWXhPU476kxty5TINrGKIv-aYe93IFbq0Qu4UQ',1),(2,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaW5vIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5NTMwMzM3LCJpYXQiOjE2Njg5MjU1MzcsIm1lbWJlckVtYWlsIjoibWlubyJ9.eGll9GQjb3s_qylaGoIJMPTUcTGDSmTksHCONWGzVDELxjMacVkWnWaKkMTRKr8TUKmpxOnKLbkVUiwKwjCGxw',2),(3,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeW9uZzA3MTZAbmF2ZXIuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5NTE0MTAyLCJpYXQiOjE2Njg5MDkzMDIsIm1lbWJlckVtYWlsIjoic3lvbmcwNzE2QG5hdmVyLmNvbSJ9.bo-jzkvt9DDvINO2U7e3lLXG8EsdxNugKPqr70o1zopGguAKOAs4hoEHpbvB3cmX1p1t0Vr3vA6CWZUNqGrmpQ',3),(4,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3b25qaDA3QG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTUzMjI3NiwiaWF0IjoxNjY4OTI3NDc2LCJtZW1iZXJFbWFpbCI6IndvbmpoMDdAbmF2ZXIuY29tIn0.kC96GpMd_FrUqpsD32yDMxTZPSH01i-O0VYb2QYWgNi2MarCVP5ub2lQqu-sxnQ0XGonS1OTpYSURH2X9F-N-g',4),(5,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2RmQG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTUzNTYxMCwiaWF0IjoxNjY4OTMwODEwLCJtZW1iZXJFbWFpbCI6ImFzZGZAbmF2ZXIuY29tIn0.GZuRF5ojXoeYwk_uU9frSlnw7X9u0F-RXBb_L5770b0MdoSFZJo5QR21ACGimZ3zeTk4wmWM10nzVzJMNoyJRw',5),(6,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtc21zQG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2ODU4MzgxOCwiaWF0IjoxNjY3OTc5MDE4LCJtZW1iZXJFbWFpbCI6Im1zbXNAbmF2ZXIuY29tIn0.3j_83hkjt79Y-5LfMn5vzzdu7DZZ5dTnkR0epgYrMzpSpL6DM2q9J0Jkml24aDHDnv58_jFfLK-2df6Gp8gQVA',6),(7,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2ODUyNjYwNywiaWF0IjoxNjY3OTIxODA3LCJtZW1iZXJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIn0.podmdl-9RFqGTnkvWROyiiq5OAUDvqXGboOv0fbGVsspaoAz-KMvUslQzOQL74xNMt1iN31CgIOqx7skNZTihg',7),(8,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAbmF2ZXIuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5NTI3MTgxLCJpYXQiOjE2Njg5MjIzODEsIm1lbWJlckVtYWlsIjoiYWFhQG5hdmVyLmNvbSJ9.GsHViKkz5KzpRwqgE2M1cQ_X8XaKhorMHQazlp2L1J4mfWl0T8Xc3GoWFCpirJWSgBdHtN_hL8FsVxqHldFXGw',8),(9,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcGl0ZXN0QHRlc3QuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY4NTY1MjA3LCJpYXQiOjE2Njc5NjA0MDcsIm1lbWJlckVtYWlsIjoiYXBpdGVzdEB0ZXN0LmNvbSJ9.1nSM-Zj9O-XnQc8Bd8m28tQv_b0HlLiJzH-_mjSHLFGFEyNUAIr_-wgyONgj4gkMuJnH2dAYyUPq7AKGK3qxaA',9),(10,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcGl0ZXN0MkB0ZXN0LmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2ODU2NDc0MywiaWF0IjoxNjY3OTU5OTQzLCJtZW1iZXJFbWFpbCI6ImFwaXRlc3QyQHRlc3QuY29tIn0.Tz0yzwc6xWX7vloo7kZWm85SqUSua_l1o-4aM4waVyRL8tXC_wvDS0mjyGPI92KB9g3wLf4l_nU5BcVz01jlnw',10),(11,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuQGcuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5NDYxMTU4LCJpYXQiOjE2Njg4NTYzNTgsIm1lbWJlckVtYWlsIjoibkBnLmNvbSJ9.QopgmGbE5FzHaVNT2wUYcJDQIUfGYEsmtx9-3Fv9A3qnArV5w9iLDS8hHOQH0gIXAOc9loYmWJ9egsG5d7NBeA',11),(12,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXYuZHVrZ3VAa2FrYW8uY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5MzU5MjkwLCJpYXQiOjE2Njg3NTQ0OTAsIm1lbWJlckVtYWlsIjoiZGV2LmR1a2d1QGtha2FvLmNvbSJ9.Su6tMSScefeV3ma8ggjgWDCQVjXg9umNN0s-3EMgJB3or_6Z6mgmllF5p6YRnUeROZehlWrqqEbECiPESn6CVQ',12),(13,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjNAYXNkLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTEwMDIwOCwiaWF0IjoxNjY4NDk1NDA4LCJtZW1iZXJFbWFpbCI6IjEyM0Bhc2QuY29tIn0.xJhywGtQ2KW-ucSSU_enE1VUEuFFasQi_wbVgBVgqwU1YEZC_lirqLKcrNcAmg7IjG9eYjrD9RaHCRCDmtrctg',13),(14,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MTIzNEB0ZXN0LmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTE2MDY5NiwiaWF0IjoxNjY4NTU1ODk2LCJtZW1iZXJFbWFpbCI6InRlc3QxMjM0QHRlc3QuY29tIn0.ubdtnxYQJnZXKvTkN3lK64-zZzAZwlr5RoiuQXnfe9wl6sIs-hJn_dmQsN1FEtUV3P0ewvxn_04R62tEFrGh8w',14),(15,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreXVAbmF2ZXIuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5MTg4MDU3LCJpYXQiOjE2Njg1ODMyNTcsIm1lbWJlckVtYWlsIjoia3l1QG5hdmVyLmNvbSJ9.ECMxnk_RAaQQNiNqBGrvYBt0am8Y4nkZ8TU8geppvzN1dKeJ30xzBtAklo-rf01xHgefI2O6yT92k_jbYvEezQ',15),(16,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJra19zdDFAbmF2ZXIuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5MjEwMDg5LCJpYXQiOjE2Njg2MDUyODksIm1lbWJlckVtYWlsIjoia2tfc3QxQG5hdmVyLmNvbSJ9.iDV-tdxiBIAIwVKwrL-TV4ztTrTMyALbqGu40VbIgxl3KkDitnZdJ0hsPhyz3jiOpUdhZ_hMMedy6sNOH1gMlw',16),(17,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2RAYXNkLmFzZCIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTI1NDQ1MCwiaWF0IjoxNjY4NjQ5NjUwLCJtZW1iZXJFbWFpbCI6ImFzZEBhc2QuYXNkIn0.L0LENxj7Kn23YVOz-BIdcOapanXUYk4Nr1RM4pInD3gNld9dS8QECMxvQH2H_WMvNHabbacZp0zq8mX4H5NzJg',17),(18,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2Njk1MTgzNDksImlhdCI6MTY2ODkxMzU0OSwibWVtYmVyRW1haWwiOiJzc2FmeUBzc2FmeS5jb20ifQ.U57Ea-qDx2CT0H1REXMAVF60TNLnBotUNHsWXwjCySby18X8-3XQS8ZZ3BRYm6qFn2q9iuuDUNFtpPo7RsKG_A',18),(19,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAYWFhLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTI2ODAxMiwiaWF0IjoxNjY4NjYzMjEyLCJtZW1iZXJFbWFpbCI6ImFhYUBhYWEuY29tIn0.HhnVupcKEWlZTe0NLCma4jkhPkHQM1xrH_Fi3OZP2vT7MZSkbJz2qfYBO0Ys00hP1C_CKCttuHPXlwaap9cRHQ',19),(20,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaXd3QGVmdy5hIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5MjY4Mjg1LCJpYXQiOjE2Njg2NjM0ODUsIm1lbWJlckVtYWlsIjoiaml3d0BlZncuYSJ9.M1fJJyffoSURv7DFeQRy1CjlCaEp4qxaWx7xYoBM4Tqo7mvECq5NCPFyz6-Gb4OQmPNH-9xEgR-MUqP922NnQw',20),(21,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb25zdWx0YW50QHNzYWZ5LmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTI3MDAzMCwiaWF0IjoxNjY4NjY1MjMwLCJtZW1iZXJFbWFpbCI6ImNvbnN1bHRhbnRAc3NhZnkuY29tIn0.HKAAp2hubJmlQDk_MdUxd8rT1DJZh_Cc5Q3bKVry0qMxykFSPfgLV6gVXYaZtk6w4AGFUPfVXLrJvJtAZ8OOmw',21),(22,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFhQG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTI3MDMyNCwiaWF0IjoxNjY4NjY1NTI0LCJtZW1iZXJFbWFpbCI6ImFhYWFAbmF2ZXIuY29tIn0.Oss532pwNvOQWMuO_wIoqkYO9H6s01cN3ax9FW3ZnPxnUUJrvy5ZEtSi0c0GpjJgklmy0kmvprQxWwV6kupqow',22),(23,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZ2dAbmF2ZXIuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5Mjc1ODExLCJpYXQiOjE2Njg2NzEwMTEsIm1lbWJlckVtYWlsIjoiZ2dnQG5hdmVyLmNvbSJ9.RScLbOwTGdcjVaYz0B6DaIXvx5fwjiKb5Mlcg8rZqFTdisZLgQHT0DbkWXyF1j1T5Y4aD6qfvVKpQZmHB_Vr4g',23),(24,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHNzYWZ5LmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTM1OTQyNCwiaWF0IjoxNjY4NzU0NjI0LCJtZW1iZXJFbWFpbCI6InRlc3RAc3NhZnkuY29tIn0.9Ehw2QbqrpsBWogB88wb8JmAA4XB-TOz7o_Em-hl6aouXrj4958VQSiafS1kXP8HZER9J5UPu1JD9aIZ8uc8Ig',24),(25,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAYWFhLmFhYSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTM1OTMxMCwiaWF0IjoxNjY4NzU0NTEwLCJtZW1iZXJFbWFpbCI6ImFhYUBhYWEuYWFhIn0.AoJAzZVjWOQJcpY4UN5gAmRZbTwmwhBHghmKjRzJjxgGYQPGeIrbWxVEIwj2pm2rQBY5WMvv7ph8_uGZoZpCuA',25),(26,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3bnNndWRkbDkyQG5hdmVyLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTQ3MzA4OCwiaWF0IjoxNjY4ODY4Mjg4LCJtZW1iZXJFbWFpbCI6Induc2d1ZGRsOTJAbmF2ZXIuY29tIn0.rCj4k8vawKGdR6yG5Ljr05rS0dG6lr4qEHMwjJ6KHvTkXwXsZSIk_Lm74GoEkyw91PgTeqQOQwlUet9BQ_d9ag',26),(27,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZ0BnZy5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2Njk1MTYwMTYsImlhdCI6MTY2ODkxMTIxNiwibWVtYmVyRW1haWwiOiJnZ0BnZy5jb20ifQ.wlqfFSePUEkU3lzabwoURDx743eqbz7okL5zIyXX08QmmcJ35NQdMLokDm4Ux8Z9JZ9l2El3LVWpGkhAyHLrJw',27),(28,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZ2dnQGdnLmNvbSIsImlzcyI6InNzYWZ5LmNvbSIsImV4cCI6MTY2OTUxNjA5MCwiaWF0IjoxNjY4OTExMjkwLCJtZW1iZXJFbWFpbCI6ImdnZ2dAZ2cuY29tIn0.OJH4iQ1jGOtiRnttPDNbXvhWN4LKnueAytWoyh1tvuAhC5FDdA1njSuV6e0EyXtqDRjySWJfTI1W_bOLCSOuZA',28),(29,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYW50YUBuYXZlci5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2Njk1MTgyMzgsImlhdCI6MTY2ODkxMzQzOCwibWVtYmVyRW1haWwiOiJzYW50YUBuYXZlci5jb20ifQ.JXgs1dqKjWLAXvEinBxxJzM0SAiGA8p3hChrZ4g6t55oKuOPu-R9ze7qgXBF9jMRhGW1olZEUbaARZRkXtJhGQ',29),(30,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dEB0dC5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2Njk1MjY4NjEsImlhdCI6MTY2ODkyMjA2MSwibWVtYmVyRW1haWwiOiJ0dEB0dC5jb20ifQ.YgPIFsaAC-vseclXDd9zQ0Qbuq3rvQ5yHDsAMh6MMImlb-0RQOBa7nxeSXWxY7tTWrElk6oSN4WNq10hFT6XEA',30),(31,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0QHQuY29tIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY5NTI3MDEyLCJpYXQiOjE2Njg5MjIyMTIsIm1lbWJlckVtYWlsIjoidEB0LmNvbSJ9.A7PZ6IUx4k-6jQ--M72R7A7UD4rkc_sImGmNwFUO1Mu72m_3VqRb7F_bRqWhrz6A95QMfiUTOtgPYtgbKCw2hg',31);
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seal`
--

DROP TABLE IF EXISTS `seal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seal` (
  `seal_id` bigint NOT NULL AUTO_INCREMENT,
  `seal_name` varchar(20) DEFAULT NULL,
  `seal_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`seal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seal`
--

LOCK TABLES `seal` WRITE;
/*!40000 ALTER TABLE `seal` DISABLE KEYS */;
INSERT INTO `seal` VALUES (1,'루돌프','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/rudolf.png'),(2,'눈송이','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/snow.png'),(3,'양초','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/candle.png'),(4,'징글벨','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/bell.png'),(5,'지팡이사탕','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/candy.png'),(6,'트리','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/tree.png'),(7,'눈사람','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/snowman.png'),(8,'진저쿠키','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/cookie.png'),(9,'산타클로스','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/santa.png'),(10,'핫초코','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/choco.png'),(11,'양말','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/socks.png'),(12,'선물상자','https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/gift.png');
/*!40000 ALTER TABLE `seal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 17:18:09
