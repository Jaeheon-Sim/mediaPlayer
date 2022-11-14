import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CourseListAtom, QuestionAtom, UrlAtom, UserTokenAtom } from "../atom";
import { STATICURL, TESTTOKEN, TESTUNIT } from "../static";

const Wrapper = styled.div`
  height: 82vh;
  overflow: auto;
`;

const Catalog = styled(motion.li)`
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => (props.men === props.now ? null : "black")}; //props 활용
  margin: 10px 0px;
`;

const Tab = styled.div`
  margin-left: 15px;
`;

export default function List() {
  // 강의 목록을 누르면 비디오 url을 바꾸는 형식으로 진행해야할것같음 라우터 없이 -> 성능 업그레이드
  // api요청 -> 받아옴 -> state에 저장 -> video url 변경 (초기화)

  const userToken = useRecoilValue(UserTokenAtom);
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const setMediaUrl = useSetRecoilState(UrlAtom);
  const courseList = useRecoilValue(CourseListAtom);
  // 리스트별로 현재 리스트에 색 띄우게 하지 뭐

  const getAnotherCourseUnit = (unitId) => {
    fetch(`${STATICURL}/front/course/unit/${unitId}`, {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": TESTTOKEN,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        complete: true,
        currentUnitId: TESTUNIT,
        recordTime: 0,
      }),
    })
      .then((e) => e.json())
      .then((res) => {
        setMediaUrl(`${STATICURL}${res.fileUrl}`);
        questionDown();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const questionDown = () => {
    fetch(`${STATICURL}/front/course/unit/${TESTUNIT}/question/`, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
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
              getAnotherCourseUnit(idx + 1);
            }}
            key={idx}
            whileHover={{ backgroundColor: "#dfdede" }}
          >
            <Tab>
              {e.unitId}. {e.title}
            </Tab>
          </Catalog>
        );
      })}
    </Wrapper>
  );
}

// 리스트클릭 -> 해당 강의 유닛 받아와서 -> url을 바꾸자(reload())
