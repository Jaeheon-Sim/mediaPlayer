import ReactPlayer from "react-player/lazy";
import { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CCAtom, FullAtom, RateAtom, SeekAtom, VideoAtom } from "../atom";
import Controller from "./Controller";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import screenfull from "screenfull";
import { STATICURL } from "../api.js";

const Splayer = styled(ReactPlayer)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* visibility: ${(props) =>
    props.first ? "hidden" : "visible"}; //props 활용 */
`;

const Clicker = styled.span`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const CControl = styled(motion.span)`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: relative;
  cursor: ${(props) => (props.mouse ? "default" : "none")}; //props 활용
`;
const PlayAni = styled(motion.div)`
  position: absolute;
  bottom: 38%;
  right: 42%;
`;
const Icon = styled(FontAwesomeIcon)`
  width: 150px;
  height: 150px;
  color: rgba(0, 0, 0, 0.5);
`;
const ControlTab = styled(motion.div)`
  z-index: 1;
`;
export default function Player() {
  const videoRef = useRef(null); //props로 컨트롤러로 슉 넘겨
  const fullRef = useRef(null);
  const videoVal = useRecoilValue(VideoAtom);
  const fullVal = useRecoilValue(FullAtom);
  const setVideoVal = useSetRecoilState(VideoAtom);
  const setRateVal = useSetRecoilState(RateAtom);
  const setCCVal = useSetRecoilState(CCAtom);
  const [controlOn, setControl] = useState(false);
  const [isBar, setIsBar] = useState(false);
  const seekVal = useRecoilValue(SeekAtom);
  let mouseX = 0;
  const cMoveHandeler = (e) => {
    setControl(true);
    if (!isBar) {
      let timeout;
      (() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (mouseX === e.clientX && !isBar) {
            setControl(false);
          } else {
            mouseX = e.clientX;
          }
        }, 4000);
      })();
    }
  };
  const cOnHandler = () => {
    setControl(true);
    if (!isBar) {
      let timeout;
      (() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setControl(false), 3000);
      })();
    }
  };

  const cOffHandler = () => {
    setControl(false);
    setRateVal(false);
    setCCVal(false);
  };

  const progressHandler = (changeState) => {
    if (!seekVal) {
      setVideoVal({
        ...videoVal,
        played: changeState.played,
        playedSec: changeState.playedSeconds.toFixed(),
      });
    } else {
      console.log("hello");
    }
  };

  // useEffect(() => {
  //   console.log(STATICURL);
  //   fetch(`${STATICURL}/hls`, {
  //     method: "GET",
  //     body: { fileName: "sample.mp4" },
  //   })
  //     .then((e) => e.json())
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    screenfull.toggle(fullRef.current);
  }, [fullVal]);
  console.log(isBar);
  return (
    <CControl
      mouse={controlOn}
      onMouseEnter={cOnHandler}
      onMouseMove={cMoveHandeler}
      onMouseLeave={cOffHandler}
    >
      <AnimatePresence>
        <PlayAni
          initial={{ opacity: 0 }}
          animate={{
            opacity: videoVal.playing && controlOn ? 1 : 0,
          }}
          exit={{ opacity: 0 }}
        >
          {!videoVal.playing ? (
            <Icon icon={faCirclePlay} />
          ) : (
            <Icon icon={faCirclePause} />
          )}
        </PlayAni>
      </AnimatePresence>

      <div ref={fullRef}>
        <Clicker
          onClick={() => {
            setVideoVal({ ...videoVal, playing: !videoVal.playing });
          }}
        >
          <Splayer
            ref={videoRef}
            // url={
            //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            // }
            url={
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            }
            // url={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}
            playing={videoVal.playing}
            muted={videoVal.muted}
            controls={false} // 플레이어 컨트롤 노출 여부
            pip={videoVal.pip} // pip 모드 설정 여부
            poster={
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            } // 플레이어 초기 포스터 사진
            // playing={playing} // true = 재생중 / false = 멈춤
            // controls={false} // 기본 컨트롤러 사용 x
            loop={false} // 반복안함
            volume={videoVal.volume} // 소리조절 기능
            playbackRate={videoVal.playbackRate} // 배속기능
            onProgress={progressHandler} // 재생 및 로드된 시점을 반환
            onEnded={() => {}}
            width="100%"
            height="100%"
          />
        </Clicker>
        <ControlTab
          onMouseEnter={() => {
            setIsBar(true);
          }}
          onMouseLeave={() => {
            setIsBar(false);
          }}
          animate={{ opacity: controlOn ? 1 : 0 }}
        >
          <Controller video={videoRef} fullR={fullRef} />
        </ControlTab>
      </div>
    </CControl>
  );
}
