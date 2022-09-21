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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VideoAtom } from "../atom";
import screenfull from "screenfull";
import pip from "../images/pip.png";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";

const BarWarpper = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background-color: transparent;
  @media screen and (max-width: 1000px) {
    bottom: 5px;
  }
  bottom: -5px;
  color: white;
`;

const ProgressTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
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
  margin-left: 15px;
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

const VolumnTab = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;

const VolumeBar = styled(motion.div)`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4vw;
`;

const RateTab = styled(motion.div)`
  margin-left: 15px;
  margin-right: 15px;
  height: 100%;
  position: relative;
`;

const RateBar = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 3vh;
  background-color: black;
  text-align: center;
`;

const Rate = styled.div`
  border-bottom: 1px solid white;
  width: 100%;
  padding: 5px;
`;

const TimeTab = styled.div`
  margin-left: 15px;
  margin-right: 5px;
`;

export default function Controller(vRef) {
  const videoRef = vRef;
  const videoVal = useRecoilValue(VideoAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const [rateOn, setRate] = useState(false);
  const [barOn, setBar] = useState(false);
  const playHandler = () => {
    setVideoVal({ ...videoVal, playing: !videoVal.playing });
  };

  const fullHandler = () => {
    //커지면 다른것도 다커짐 그러니 state 이용해 css 변경하자
    setVideoVal({ ...videoVal, muted: !videoVal.full });
    screenfull.toggle(videoRef.current);
  };

  const muteHandler = () => {
    setVideoVal({ ...videoVal, muted: !videoVal.muted });
  };

  const volumeChangeHandler = (e, newValue) => {
    setVideoVal({
      ...videoVal,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const volumeSeekUpHandler = (e, newValue) => {
    setVideoVal({
      ...videoVal,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const rewindHandler = () => {
    videoRef.video.current.seekTo(videoRef.video.current.getCurrentTime() - 5);
  };

  const forwardHandler = () => {
    videoRef.video.current.seekTo(videoRef.video.current.getCurrentTime() + 5);
  };

  const pipHandler = () => {
    setVideoVal({ ...videoVal, pip: !videoVal.pip });
  };

  const playBackChangeHandler = (rate) => {
    setVideoVal({
      ...videoVal,
      playbackRate: rate,
    });
  };

  const BarOff = () => {
    setBar(false);
  };

  const BarOn = () => {
    setBar(true);
  };

  const TabVari = {
    hover: {
      scale: "1.1",
    },
    // tap: { scale: 1 },
    // push: (i) => ({
    //   backgroundColor: i ? "rgb(69, 90, 228)" : "rgb(217, 217, 217)",
    //   color: i ? "white" : "black",
    // }),
  };

  return (
    <BarWarpper>
      <ProgressTab>
        <ProgressBars />
        <TimeTab>0:00/0:00</TimeTab>
      </ProgressTab>
      <ControlTab>
        <IconTab>
          <motion.div variants={TabVari} whileHover="hover" whileTap="tap">
            <Icon icon={faBackwardStep} onClick={rewindHandler}></Icon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            {!videoVal.playing ? (
              <Icon icon={faPlay} onClick={playHandler}></Icon>
            ) : (
              <Icon icon={faPause} onClick={playHandler}></Icon>
            )}
          </motion.div>
          <Icon icon={faForwardStep} onClick={forwardHandler}></Icon>
          <VolumnTab onMouseEnter={BarOn} onMouseLeave={BarOff}>
            {videoVal.muted ? (
              <Icon icon={faVolumeXmark} onClick={muteHandler} />
            ) : (
              <Icon icon={faVolumeUp} onClick={muteHandler} />
            )}
            <VolumeBar animate={{ scale: barOn ? 1 : 0 }}>
              <Slider
                min={0}
                max={100}
                value={
                  videoVal.muted
                    ? 0
                    : !videoVal.muted && videoVal.volume === 0
                    ? 50
                    : videoVal.volume * 100
                }
                onChange={volumeChangeHandler}
                aria-label="Default"
                // onMouseDown={onSeekMouseDown}
                onChangeCommitted={volumeSeekUpHandler}
                valueLabelDisplay="off"
              />
            </VolumeBar>
          </VolumnTab>
        </IconTab>
        <IconTab>
          <Img src={pip} alt="no" onClick={pipHandler} />
          자막
          <RateTab
            onClick={() => {
              setRate((prev) => !prev);
            }}
          >
            {videoVal.playbackRate}X
            {rateOn ? (
              <RateBar>
                {[0.5, 0.75, 1, 1, 1.25, 1.5, 2].map((rate) => {
                  return (
                    <Rate
                      onClick={() => {
                        playBackChangeHandler(rate);
                      }}
                      key={rate}
                    >
                      {rate}x
                    </Rate>
                  );
                })}
              </RateBar>
            ) : null}
          </RateTab>
          <Icon icon={faGear}></Icon>
          <Icon icon={faExpand} onClick={fullHandler}></Icon>
        </IconTab>
      </ControlTab>
    </BarWarpper>
  );
}
