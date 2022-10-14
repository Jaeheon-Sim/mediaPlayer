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
      alert("체크해요~");
    } else {
      if (videoVal.playedSec < videoVal.duration * (8 / 10)) {
        alert("강의를 80퍼이상 시청해요~.");
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
        alert("리뷰 등록");
      }
    }
  };

  return (
    <Wrapper>
      <Div>강의가 만족스러우셨나요?</Div>
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
          placeholder="불만을 적어줘용"
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
