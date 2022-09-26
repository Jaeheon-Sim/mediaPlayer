import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning as regular } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding-top: 15px;
  margin-bottom: 15px;
`;

const CateTab = styled.div`
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.type ? "teal" : "white")}; //props 활용
  /* background-color: #9f9e9e; */
`;

const Input = styled.input`
  height: 250px;
  width: 80%;
`;

export default function Question() {
  // 질문 보내는 시간을 getCurrentTime를 이용해 저장해서 백으로 쏴
  const videoVal = useRecoilValue(VideoAtom);
  const [type, setType] = useState(false);

  return (
    <Wrapper>
      <CateBox>
        <CateTab
          type={!type}
          onClick={() => {
            setType(false);
          }}
        >
          등록된 질문들
        </CateTab>
        <CateTab
          type={type}
          onClick={() => {
            setType(true);
          }}
        >
          질문 등록
        </CateTab>
      </CateBox>
      {type ? (
        <>
          <label for="title">제목</label>
          <input id="title" placeholder="제목을 입력해주세요" />
          <Input placeholder="강좌를 잠시 멈추고 질문을 등록해주세요" />
          <button>질문하기</button>
        </>
      ) : (
        [1, 2, 3, 4, 5].map((e) => {
          return <div className={e}>질문 {e}</div>;
        })
      )}
    </Wrapper>
  );
}
