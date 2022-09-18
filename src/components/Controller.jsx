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
import ProgressBar from "react-animated-progress-bar";

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
  font-size: 2vw;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 5px;
`;
const ProgressBars = styled.div`
  width: 100%;
  height: 1vh;
  background-color: grey;
`;
export default function Controller() {
  return (
    <BarWarpper>
      <ProgressTab>
        <ProgressBars />
      </ProgressTab>
      <ControlTab>
        <div>
          <Icon icon={faBackwardStep}></Icon>
          <Icon icon={faPlay}></Icon>
          <Icon icon={faForwardStep}></Icon>
          <Icon icon={faVolumeUp} onClick={() => {}} />
          시간 : 시간
        </div>
        <div>
          <Icon icon={faGear}></Icon>
          pip 자막 배속
          <Icon icon={faExpand}></Icon>
        </div>
      </ControlTab>
    </BarWarpper>
  );
}
