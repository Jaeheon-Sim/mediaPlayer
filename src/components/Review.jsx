import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  OverlappingAtom,
  QueryListAtom,
  QuestionAtom,
  unitInfoAtom,
  UserTokenAtom,
  VideoAtom,
} from "../atom";
import { useEffect, useRef, useState } from "react";
import { faCircle as circle } from "@fortawesome/free-solid-svg-icons";
import { STATICURL, TESTTOKEN, TESTUNIT } from "../static";
import Swal from "sweetalert2";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const ReviewIconTab = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  svg {
    &:nth-child(1) {
      height: 15vh;
    }
    &:nth-child(2) {
      height: 5vh;
    }
    &:nth-child(3) {
      height: 4vh;
    }
    &:nth-child(4) {
      height: 5vh;
    }
    &:nth-child(5) {
      height: 15vh;
    }
  }
`;

const DivTab = styled(ReviewIconTab)`
  margin-top: -30px;
`;

const BtnTab = styled.div`
  margin-top: 5px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 2.5vw;
  height: 13vh;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const Star = styled(Icon)`
  cursor: default;
`;

const Div = styled.div`
  margin-bottom: 10px;
`;

const Form = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.textarea`
  width: 90%;
  height: 10vh;
`;
const Btn = styled(motion.button)`
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bolder;
`;

const StartTitle = styled(Title)`
  margin-left: 2vw;
`;

const StartTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Coding() {
  const videoVal = useRecoilValue(VideoAtom);
  const [check, setCheck] = useState(null);
  const [reviewC, setReviewC] = useState("");
  const reviewChecker = (e) => {
    setCheck(e);
  };
  const accessToken = useRecoilValue(UserTokenAtom);
  const queryList = useRecoilValue(QueryListAtom);
  const unitInfo = useRecoilValue(unitInfoAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const [starList, setStarList] = useState({
    starCnt: 0,
    isHalf: false,
  });

  const fetchReview = () => {
    axios
      .post(
        `${STATICURL}/front/course/unit/${queryList.unitId}/rating`,
        { score: check },
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "감사합니다",
            text: "강의 품질 개선에 참고하겠습니다.",
            confirmButtonText: "확인",
          });
        } else {
          alert("알 수없는 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setOverlappingVal(true);
        } else {
          alert(err);
        }
      });
  };

  const goReview = (e) => {
    e.preventDefault();
    //강의를 80퍼 이상 봐야지 보낼 수 있게
    if (check === null) {
      Swal.fire({
        icon: "error",
        title: "아직 평가를 못해요!",
        text: "별점을 부탁드릴게요.",
        confirmButtonText: "확인",
      });
    } else {
      if (videoVal.playedSec < videoVal.duration * (8 / 10)) {
        Swal.fire({
          icon: "error",
          title: "아직 평가를 못해요!",
          text: "강의를 80% 이상 수강하신 뒤 평가가 가능합니다.",
          confirmButtonText: "확인",
        });
      } else {
        fetchReview();
      }
    }
  };

  const makeRateStarList = () => {
    const rate = unitInfo.rating;

    const starCnt = parseInt(rate % 5);
    var isStarHalf = true;
    if (Number((rate - starCnt).toFixed(1)) < 0.5) {
      isStarHalf = false;
    }

    setStarList({
      starCnt: starCnt,
      isHalf: isStarHalf,
    });
  };

  useEffect(makeRateStarList, []);

  return (
    <Wrapper>
      <StartTab>
        {[...Array(starList.starCnt).keys()].map((e) => {
          return <Star icon={faStar} />;
        })}
        {starList.isHalf ? (
          <Star icon={faStarHalfStroke} />
        ) : (
          <Star icon={emptyStar} />
        )}
        <StartTitle>{unitInfo.rating}</StartTitle>
      </StartTab>
      <Div>
        <Title>강의가 만족스러우셨나요?</Title>
      </Div>
      <ReviewIconTab>
        {[1, 2, 3, 4, 5].map((e, idx) => {
          if (check && check === idx + 1) {
            return (
              <Icon
                onClick={() => {
                  reviewChecker(idx + 1);
                }}
                key={e}
                id={e}
                icon={circle}
              ></Icon>
            );
          } else {
            return (
              <Icon
                onClick={() => {
                  reviewChecker(idx + 1);
                }}
                key={e}
                id={e}
                icon={faCircle}
              ></Icon>
            );
          }
        })}
      </ReviewIconTab>
      <DivTab>
        <div>불만족</div>
        <div></div>
        <div></div>
        <div></div>
        <div>만족</div>
      </DivTab>
      <Form>
        <Input
          value={reviewC}
          onChange={(e) => {
            setReviewC(e.target.value);
          }}
          placeholder="개선사항을 적어주세요!"
        />
        <BtnTab>
          <div />
          <Btn
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={goReview}
          >
            보내기
          </Btn>
        </BtnTab>
      </Form>
    </Wrapper>
  );
}
