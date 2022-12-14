import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  OverlappingAtom,
  QueryListAtom,
  unitInfoAtom,
  UserTokenAtom,
  VideoAtom,
} from "../atom";
import { useEffect, useState } from "react";
import { faCircle as circle } from "@fortawesome/free-solid-svg-icons";
import { STATICURL } from "../static";
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
  margin-top: -30px;
`;

const DivTab = styled(ReviewIconTab)``;

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
  margin-top: 30px;
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
  margin-bottom: 40px;
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
        `${STATICURL}/front/units/${queryList.unitId}/rating`,
        { comment: reviewC, score: Number(check) },
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
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "???????????????",
            text: "?????? ?????? ????????? ?????????????????????.",
            confirmButtonText: "??????",
          });
        } else {
          alert("??? ????????? ????????? ??????????????????.");
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
    //????????? 80??? ?????? ????????? ?????? ??? ??????
    if (check === null) {
      Swal.fire({
        icon: "error",
        title: "?????? ????????? ?????????!",
        text: "????????? ??????????????????.",
        confirmButtonText: "??????",
      });
    } else {
      if (videoVal.playedSec < videoVal.duration * (8 / 10)) {
        Swal.fire({
          icon: "error",
          title: "?????? ????????? ?????????!",
          text: "????????? 80% ?????? ???????????? ??? ????????? ???????????????.",
          confirmButtonText: "??????",
        });
      } else {
        fetchReview();
      }
    }
  };

  const makeRateStarList = () => {
    const rate = unitInfo?.rating?.score;
    var starCnt = 5;
    var isStarHalf = true;
    if (rate !== 5) {
      starCnt = parseInt(rate % 5);
      if (Number((rate - starCnt)?.toFixed(1)) < 0.5) {
        isStarHalf = false;
      }
    }
    setStarList({
      starCnt: starCnt,
      isHalf: isStarHalf,
    });
  };

  const checkIsHalf = () => {
    if (starList.isStarHalf) {
      setStarList((prev) => ({
        ...prev,
        isHalf: false,
      }));
      return true;
    }
    return false;
  };

  useEffect(makeRateStarList, []);

  return (
    <Wrapper>
      <StartTab>
        {[...Array(starList?.starCnt)?.keys()]?.map((e) => {
          return <Star icon={faStar} />;
        })}
        {[...Array(5 - starList?.starCnt)?.keys()]?.map((e) => {
          if (checkIsHalf()) {
            return <Star icon={faStarHalfStroke} />;
          }
          return <Star icon={emptyStar} />;
        })}
        <StartTitle>{unitInfo?.rating?.score?.toFixed(1)}</StartTitle>
      </StartTab>
      <Div>
        <Title>????????? ????????? ?????????.</Title>
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
        <div>?????????</div>
        <div></div>
        <div></div>
        <div></div>
        <div>??????</div>
      </DivTab>
      <Form>
        <Input
          value={reviewC}
          onChange={(e) => {
            setReviewC(e.target.value);
          }}
          placeholder="??????????????? ???????????????!"
        />
        <BtnTab>
          <div />
          <Btn
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={goReview}
          >
            ?????????
          </Btn>
        </BtnTab>
      </Form>
    </Wrapper>
  );
}
