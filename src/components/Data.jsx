import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CourseListAtom,
  QueryListAtom,
  QuestionAtom,
  unitInfoAtom,
  VideoAtom,
  VideoTimeCheckAtom,
} from "../atom";
import { useEffect, useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { faStar } from "@fortawesome/free-regular-svg-icons";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 15px;
  height: 98%;
`;

const TitleBox = styled.div`
  font-size: 25px;
`;
const PrepareBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: bolder;
`;
const DetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 95%;
  min-height: 3vh;
  margin-bottom: 20px;

  padding: 30px 0px 30px 0px;
  flex-direction: column;
`;

const DetailTab = styled.div`
  word-break: break-all;
  margin-left: 0px;
  font-weight: bold;
`;

const Detail = styled.div`
  width: 80%;
  margin-top: 10px;
  margin-left: 10px;
  background-color: #efefef;
  padding: 10px 10px 10px 5px;
  border-radius: 5px;
  font-weight: lighter;
  color: #3c3c3c;
`;

const Icon = styled(FontAwesomeIcon)`
  font-weight: bolder;
  margin-right: 2px;
`;
const PrepareTab = styled.li`
  margin-top: 15px;
  margin-left: 15px;
  color: #494646;
`;

export default function Data() {
  const queryList = useRecoilValue(QueryListAtom);
  const courseList = useRecoilValue(CourseListAtom);
  const unitInfo = useRecoilValue(unitInfoAtom);

  useEffect(() => {
    courseList.map((e) => {});
  }, [queryList.unitId]);

  return (
    <Wrapper>
      <TitleBox>
        <Title>{unitInfo.title}</Title>
      </TitleBox>
      <DetailBox>
        <DetailTab>강의 목표</DetailTab>
        <Detail>Test....</Detail>
        <br />
        <DetailTab>세부 내용</DetailTab>
        <Detail>Test....</Detail>
      </DetailBox>
      <PrepareBox>
        <Title>
          <Icon icon={faCheck} />
          무엇이 필요할까요?
        </Title>

        <PrepareTab>test </PrepareTab>
        <PrepareTab>test </PrepareTab>
      </PrepareBox>
    </Wrapper>
  );
}
