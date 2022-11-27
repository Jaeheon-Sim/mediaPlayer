import axios from "axios";
import { motion } from "framer-motion";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  CourseInfoAtom,
  CourseListAtom,
  OverlappingAtom,
  QueryListAtom,
  QuestionAtom,
  unitInfoAtom,
  UrlAtom,
  UserTokenAtom,
  VideoAtom,
} from "../atom";
import { STATICURL } from "../static";

const Wrapper = styled.div`
  max-height: 80vh;
  overflow: auto;
`;

const Catalog = styled(motion.li)`
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) =>
    props.men === props.now ? "#a8a7a7" : "black"}; //props 활용
  margin: 10px 0px;
`;

const Tab = styled.div`
  margin-left: 25px;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 1.4rem;
`;
const TitleBox = styled.div`
  font-size: 1.3rem;
  margin-left: 15px;
  margin-top: 2vh;
`;

const ListBox = styled.ul`
  margin-top: 20px;
`;

const SubInfoBox = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: flex-end;
`;

export default function List() {
  // 강의 목록을 누르면 비디오 url을 바꾸는 형식으로 진행해야할것같음 라우터 없이 -> 성능 업그레이드
  // api요청 -> 받아옴 -> state에 저장 -> video url 변경 (초기화)
  const queryList = useRecoilValue(QueryListAtom);
  const userToken = useRecoilValue(UserTokenAtom);
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const setMediaUrl = useSetRecoilState(UrlAtom);
  const courseList = useRecoilValue(CourseListAtom);
  const setQueryList = useSetRecoilState(QueryListAtom);
  const setUnitInfo = useSetRecoilState(unitInfoAtom);
  const unitInfo = useRecoilValue(unitInfoAtom);
  const videoVal = useRecoilValue(VideoAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const courseInfo = useRecoilValue(CourseInfoAtom);

  async function getAnotherCourseUnit(unitId) {
    try {
      var isCheck = false;
      if (videoVal.duration == videoVal.playedSec) {
        isCheck = true;
      }
      const res = await axios.post(
        `${STATICURL}/front/play/units/${unitId}/`,
        {
          complete: isCheck,
          currentUnitId: queryList.unitId,
          recordTime: videoVal.played,
        },
        {
          headers: {
            "X-AUTH-TOKEN": userToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setQueryList((queryList) => ({ ...queryList, unitId: unitId }));
      setUnitInfo({
        title: res.data.title,
        unitId: res.data.unitId,
        time: res.data.time,
      });
      if (res.data.fileUrl.includes("http")) {
        setMediaUrl(`${res.data.fileUrl}`);
      } else {
        setMediaUrl(`http://34.64.177.193/${res.data.fileUrl}`);
      }
      questionDown(unitId);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  async function questionDown(unitId) {
    try {
      const res = await axios.get(
        `${STATICURL}/front/unit/${unitId}/questions`
      );
      setQuestionVal(res.data);
      getThisUnitRate(unitId);
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  async function getThisUnitRate(unitId) {
    try {
      const res = await axios.get(`${STATICURL}/front/units/${unitId}/rating`, {
        headers: {
          "X-AUTH-TOKEN": userToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
        },
      });

      setUnitInfo((prev) => ({ ...prev, rating: res.data }));
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  return (
    <Wrapper>
      <TitleBox>
        <Title>&lt;{courseInfo.title}&gt;</Title>
        <SubInfoBox>
          <h2>{courseInfo.subtitle}</h2>-<h3>{courseInfo.instructor}</h3>
        </SubInfoBox>
      </TitleBox>
      <TitleBox>
        <Title>{unitInfo.title}</Title>
      </TitleBox>
      <ListBox>
        {courseList?.map((e, idx) => {
          return (
            <Catalog
              onClick={() => {
                getAnotherCourseUnit(e.unitId);
              }}
              men={e.unitId}
              now={unitInfo.unitId}
              key={idx}
              whileHover={{ backgroundColor: "#dfdede" }}
            >
              <Tab>
                {idx}. {e.title}
              </Tab>
            </Catalog>
          );
        })}
      </ListBox>
    </Wrapper>
  );
}
