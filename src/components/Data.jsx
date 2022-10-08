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
  align-items: center;
  justify-content: flex-start;

  height: 100%;
`;

export default function Data() {
  return (
    <Wrapper>
      <div>하이</div>
    </Wrapper>
  );
}
