import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import { useEffect, useRef, useState } from "react";
import { faCircle as circle } from "@fortawesome/free-solid-svg-icons";
import { AccessToken, STATICURL } from "../api";
import Swal from "sweetalert2";

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

const Div = styled.div`
  margin-top: 10vh;
  margin-bottom: 10px;
`;

const Form = styled.div`
  margin-top: 20px;
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

export default function Coding() {
  const videoVal = useRecoilValue(VideoAtom);
  const [check, setCheck] = useState(null);
  const [reviewC, setReviewC] = useState("");
  const reviewChecker = (e) => {
    setCheck(e);
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
        fetch(`${STATICURL}/front/course/rating`, {
          method: "post",
          headers: {
            "X-AUTH-TOKEN": AccessToken,
          },
          body: JSON.stringify({
            unitId: 1,
            score: check,
          }),
        })
          .then((e) => e.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(check);
        console.log(reviewC);
        Swal.fire({
          icon: "success",
          title: "감사합니다",
          text: "강의 품질 개선에 참고하겠습니다.",
          confirmButtonText: "확인",
        });
      }
    }
  };

  return (
    <Wrapper>
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
