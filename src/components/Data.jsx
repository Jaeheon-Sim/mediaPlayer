import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { QuestionAtom, VideoAtom, VideoTimeCheckAtom } from "../atom";
import { useEffect, useRef, useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 20px;
  height: 100%;
`;

const TitleBox = styled.div``;
const PrepareBox = styled.div``;
const DetailBox = styled.div``;
export default function Data() {
  return (
    <Wrapper>
      <TitleBox>강의 제목</TitleBox>
      <DetailBox>이거이거 배워요</DetailBox>
      <PrepareBox>이거 이거 필요해요</PrepareBox>
    </Wrapper>
  );
}
