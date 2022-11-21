import { motion } from "framer-motion";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  CourseListAtom,
  QueryListAtom,
  QuestionAtom,
  unitInfoAtom,
  UrlAtom,
  UserTokenAtom,
  VideoAtom,
} from "../atom";
import { STATICURL, TESTTOKEN, TESTUNIT } from "../static";

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
  margin-left: 15px;
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

  async function getAnotherCourseUnit(unitId) {
    try {
      var isCheck = false;
      if (videoVal.duration == videoVal.playedSec) {
        isCheck = true;
      }
      const res = await fetch(`${STATICURL}/front/course/unit/${unitId}`, {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": userToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          complete: isCheck,
          currentUnitId: queryList.unitId,
          recordTime: videoVal.played,
        }),
      });
      setQueryList((queryList) => ({ ...queryList, unitId: unitId }));
      const json = await res.json();

      setUnitInfo({ title: json.title, unitId: json.unitId, time: json.time });
      if (json.fileUrl.includes("http")) {
        setMediaUrl(`${json.fileUrl}`);
      } else {
        setMediaUrl(`${STATICURL}${json.fileUrl}`);
      }

      questionDown(unitId);
    } catch (error) {
      alert(error); // 발생한 에러 표시
    }
  }

  const questionDown = (unitId) => {
    fetch(`${STATICURL}/front/course/unit/${unitId}/question/`, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((res) => {
        setQuestionVal(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

// 리스트클릭 -> 해당 강의 유닛 받아와서 -> url을 바꾸자(reload())
