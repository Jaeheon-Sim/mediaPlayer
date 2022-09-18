import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Coding from "./Coding";
import Data from "./Data";
import List from "./List";
import Question from "./Question";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const NoticeTab = styled(motion.div)`
  border-bottom: 1px solid;
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Notice = styled(motion.div)`
  width: 25%;
  height: 100%;
  border: 1px solid;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
`;

const ListTab = styled(motion.ol)`
  width: 100%;
  height: 2.5vh;
`;

export default function SideBar() {
  const menuList = {
    0: <List />,
    1: <Data />,
    2: <Question />,
    3: <Coding />,
  };

  const [menu, setMenu] = useState(0);

  return (
    <BarWrapper>
      <NoticeTab>
        <Notice
          onClick={() => {
            setMenu(0);
          }}
        >
          강의 목록
        </Notice>
        <Notice
          onClick={() => {
            setMenu(1);
          }}
        >
          수업 자료
        </Notice>
        <Notice
          onClick={() => {
            setMenu(2);
          }}
        >
          수업 질문
        </Notice>
        <Notice
          onClick={() => {
            setMenu(3);
          }}
        >
          과제
        </Notice>
      </NoticeTab>
      <ListTab>{menuList[menu]}</ListTab>
    </BarWrapper>
  );
}
