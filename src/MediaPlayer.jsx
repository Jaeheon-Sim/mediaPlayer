import Player from "./components/Player";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CourseInfoAtom,
  CourseListAtom,
  OverlappingAtom,
  QueryListAtom,
  QuestionAtom,
  unitInfoAtom,
  UrlAtom,
  UserTokenAtom,
  VideoAtom,
} from "./atom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { STATICURL } from "./static";
import axios from "axios";

const Hm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
`;

const BlockCapBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
`;

const Wrapper = styled.div`
  display: grid;
  margin-top: -5vh;
  /* height: 95vh; */
  grid-template-columns: 79% 22%;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  width: 98%;
  max-height: 99vh;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 100%;
  }
  position: relative;
`;

const VideoTab = styled.div`
  min-height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-rows: 5% 95%;
`;
const BarTab = styled.div`
  height: 90vh;
  margin-left: 20px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 18vh;
  color: white;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 3vh;

  color: black;
`;

export default function MediaPlayer() {
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const accessToken = useRecoilValue(UserTokenAtom);
  const overlappingVal = useRecoilValue(OverlappingAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const setAccesToken = useSetRecoilState(UserTokenAtom);
  const videoVal = useRecoilValue(VideoAtom);
  const setMediaUrl = useSetRecoilState(UrlAtom);
  const queryList = useRecoilValue(QueryListAtom);
  const setCourseList = useSetRecoilState(CourseListAtom);
  const setQueryList = useSetRecoilState(QueryListAtom);
  const unitInfo = useRecoilValue(unitInfoAtom);
  const setUnitInfo = useSetRecoilState(unitInfoAtom);
  const setCourseInfo = useSetRecoilState(CourseInfoAtom);
  const wrapperRef = useRef();
  const [isCapture, setCapture] = useState(false);
  // 중복로그인 에러가 일어나면 이 아톰을 바꾸고, 알림창을 띄우자

  window.onbeforeunload = function (event) {
    exitPlayer();
  };

  const exitPlayer = () => {
    var isCheck = false;
    if (videoVal.duration == videoVal.playedSec) {
      isCheck = true;
    }

    fetch(`${STATICURL}/front/player/off`, {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        check: isCheck,
        time: videoVal.played,
        unitId: Number(queryList.unitId),
        userId: queryList.userId,
      }),
      keepalive: true,
    })
      .then((e) => console.log(e))
      .catch((err) => {
        alert(err);
      });
  };

  function getParams() {
    setQueryList((queryList) => ({ ...queryList, userId: getParam("userId") }));
    setQueryList((queryList) => ({
      ...queryList,
      courseId: getParam("courseId"),
    }));
    setQueryList((queryList) => ({ ...queryList, unitId: getParam("unitId") }));
  }

  const getParam = (code) => {
    return new URL(window.location.href).searchParams.get(code);
  };

  async function goRedirect() {
    try {
      const res = await fetch(`http://34.64.177.193/api/open/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "X-AUTH-TOKEN":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjY5ODEwMzE5LCJleHAiOjE3MDEzNDYzMTl9.VMylrRpDz6ilmdn6pPOr09cvYjXUP1CqhPEWc-hrzAc",
        },
        //토큰을 바꿔야지 중복로그인 체크댐 스웨거에서 로그인 새로해서 발급받아 토큰 그리고 여기 넣어
        body: JSON.stringify({ unitId: 1, courseId: 1 }),
      });
    } catch (error) {
      console.log(error); // 발생한 에러 표시
    }
  }

  async function login() {
    try {
      const res = await fetch(`${STATICURL}/front/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: getParam("userId"),
        }),
      });
      const json = await res.json(); // json으로 파싱할 수 없을 때
      console.log("로그인 성공");
      setAccesToken(json.accessToken);
      getCourseList(json.accessToken);
      getMediaUrl(json.accessToken);
    } catch (error) {
      alert(error); // 발생한 에러 표시
    }
  }

  async function getMediaUrl(accessToken) {
    try {
      const res = await axios.post(
        `${STATICURL}/front/play/units/${getParam("unitId")}/`,
        {
          complete: true,
          currentUnitId: -1,
          recordTime: 0,
        },
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setUnitInfo({
        title: res.data.title,
        unitId: res.data.unitId,
        time: res.data.time,
      });
      if (res.data.fileUrl.includes("http")) {
        setMediaUrl(`${res.data.fileUrl}`);
      } else {
        setMediaUrl(`http://34.64.177.193/${res.data.fileUrl}`);
      }
      questionDown();
    } catch (error) {
      if (error.response.status === 409) {
        setOverlappingVal(true);
      } else {
        alert(error);
      }
    }
  }

  const getCourseList = (accessToken) => {
    fetch(`${STATICURL}/front/courses/${getParam("courseId")}/units`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
        const list = [];
        res.map((e) => {
          list.push(e);
        });
        setCourseList(list);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const questionDown = () => {
    fetch(`${STATICURL}/front/unit/${getParam("unitId")}/questions`, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((res) => {
        setQuestionVal(res);
        getThisUnitRate();
      })
      .catch((err) => {
        alert(err);
      });
  };

  async function getThisUnitRate() {
    try {
      const res = await fetch(
        `${STATICURL}/front/units/${getParam("unitId")}/rating`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const json = await res.json();

      setUnitInfo((prev) => ({ ...prev, rating: json }));
      getCourseInfo();
    } catch (error) {
      alert(error);
    }
  }

  async function getCourseInfo() {
    const res = await axios.get(
      `${STATICURL}/front/courses/${getParam("courseId")}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setCourseInfo(res.data);
  }

  const keyUpHandler = (e) => {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 44) {
      stopPrntScr();
      setCapture(true);
      wrapperRef.current.focus();
      setTimeout(() => {
        setCapture(false);
      }, 10000);
    }
  };

  function stopPrntScr() {
    var inpFld = document.createElement("input");
    inpFld.setAttribute("value", ".");
    inpFld.setAttribute("width", "0");
    inpFld.style.height = "0px";
    inpFld.style.width = "0px";
    inpFld.style.border = "0px";
    document.body.appendChild(inpFld);
    inpFld.select();
    document.execCommand("copy");
    inpFld.remove(inpFld);
  }

  const duplicateLogin = () => {
    if (overlappingVal === true) {
      Swal.fire({
        title: "누군가가 로그인을 했어요",
        showCancelButton: true,
        confirmButtonText: "내가 쓸래요",
        cancelButtonText: "나가기",
        // 실행되는 동안 배경 누를때 모달창 안닫히도록 설정
        // isLoading() 즉, 로딩이 진행되는 동안 false를 리턴하게 해서 ousideClick을 안되게 하고, 로딩 상태가 아니면 ousideClick을 허용한다.
        allowOutsideClick: () => Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          duplicateLoginController(true);
        } else {
          window.open("", "_self").close();
        }
      });
    }
  };

  const duplicateLoginController = (keepGo) => {
    axios
      .post(
        `${STATICURL}/front/auth/resolve-conflict`,
        {
          accessToken: accessToken,
          keepGoing: keepGo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((e) => {
        setOverlappingVal(false);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getParams();
    // goRedirect();
    // setTimeout(() => login(), 1000);
    login();
  }, []);

  useEffect(duplicateLogin, [overlappingVal]);

  return (
    <Hm>
      <Wrapper tabIndex={0} onKeyUp={keyUpHandler} ref={wrapperRef}>
        {!isCapture ? null : (
          <BlockCapBox>
            <H1>캡쳐 금지</H1>
          </BlockCapBox>
        )}
        <VideoTab>
          <Title>{unitInfo?.title}</Title>
          <Player />
        </VideoTab>
        <BarTab>
          <SideBar />
        </BarTab>
      </Wrapper>
    </Hm>
  );
}
