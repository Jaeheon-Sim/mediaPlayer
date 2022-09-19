import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faexpand } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-animated-progress-bar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import screenfull from "screenfull";
import pip from "../images/pip.png";

const BarWarpper = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
`;

const ProgressTab = styled.div``;
const ControlTab = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 1vw;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 10px;
  margin-right: 5px;
  width: 2.5vh;
  height: 2.5vh;
`;
const ProgressBars = styled.div`
  width: 100%;
  height: 1vh;
  background-color: grey;
`;

const Img = styled.img`
  cursor: pointer;
  margin-left: 10px;
  margin-right: 5px;
  width: 2.5vh;
  height: 2.5vh;
`;

const IconTab = styled.div`
  display: flex;
  align-items: center;
`;
export default function Controller(vRef) {
  const videoRef = vRef;
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);

  const playHandler = () => {
    setVideoVal({ ...videoVal, playing: !videoVal.playing });
  };

  const fullHandler = () => {
    //커지면 다른것도 다커짐 그러니 state 이용해 css 변경하자
    screenfull.toggle(videoRef.current);
  };

  const muteHandler = () => {
    setVideoVal({ ...videoVal, muted: !videoVal.muted });
  };

  const pipHandler = () => {
    setVideoVal({ ...videoVal, pip: !videoVal.pip });
  };

  return (
    <BarWarpper>
      <ProgressTab>
        <ProgressBars />
      </ProgressTab>
      <ControlTab>
        <IconTab>
          <Icon icon={faBackwardStep}></Icon>
          {!videoVal.playing ? (
            <Icon icon={faPlay} onClick={playHandler}></Icon>
          ) : (
            <Icon icon={faPause} onClick={playHandler}></Icon>
          )}
          <Icon icon={faForwardStep}></Icon>
          {!videoVal.muted ? (
            <Icon icon={faVolumeXmark} onClick={muteHandler} />
          ) : (
            <Icon icon={faVolumeUp} onClick={muteHandler} />
          )}
          시간 : 시간
        </IconTab>
        <IconTab>
          <Img src={pip} alt="no" onClick={pipHandler} />
          자막 배속
          <Icon icon={faGear}></Icon>
          <Icon icon={faExpand} onClick={fullHandler}></Icon>
        </IconTab>
      </ControlTab>
    </BarWarpper>
  );
}
