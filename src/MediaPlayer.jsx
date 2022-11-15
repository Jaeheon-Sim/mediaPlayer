import Controller from "./components/Controller";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  CourseListAtom,
  OverlappingAtom,
  QueryListAtom,
  QuestionAtom,
  UrlAtom,
  UserTokenAtom,
  VideoAtom,
} from "./atom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Manager from "./components/Manager";
import { STATICURL, TESTCOURSE, TESTTOKEN, TESTUNIT } from "./static";
// import withReactContent from "sweetalert2-react-content";

const Hm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
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
  /* height: 95vh; */
  grid-template-columns: 78% 22%;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  width: 98%;
  @media screen and (max-width: 1500px) {
    grid-template-columns: 100%;
  }
  position: relative;
`;

const VideoTab = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
const BarTab = styled.div`
  margin-left: 10px;
  height: 100%;
  @media screen and (max-width: 1500px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 18vh;
  color: white;
`;

export default function MediaPlayer() {
  const setQuestionVal = useSetRecoilState(QuestionAtom);
  const accessToken = useRecoilValue(UserTokenAtom);
  const overlappingVal = useRecoilValue(OverlappingAtom);
  const setOverlappingVal = useSetRecoilState(OverlappingAtom);
  const setAccesToken = useSetRecoilState(UserTokenAtom);
  const mediaUrl = useRecoilValue(UrlAtom);
  const setMediaUrl = useSetRecoilState(UrlAtom);
  const queryList = useRecoilValue(QueryListAtom);
  const setCourseList = useSetRecoilState(CourseListAtom);
  const setQueryList = useSetRecoilState(QueryListAtom);
  const searchParams = new URLSearchParams(window.location.search);

  const wrapperRef = useRef();
  const [isUser, setUser] = useState(null);
  const [isCapture, setCapture] = useState(false);
  // 중복로그인 에러가 일어나면 이 아톰을 바꾸고, 알림창을 띄우자

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

  async function login() {
    try {
      const res = await fetch(`${STATICURL}/front/player/on`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "4247e6b6-c014-45a6-8f9d-c766819a6f2f",
        }),
      });
      const json = await res.json(); // json으로 파싱할 수 없을 때
      console.log(json.accessToken);
      setAccesToken(json.accessToken);
      getCourseList();
      getMediaUrl(json.accessToken);
    } catch (error) {
      console.log(error); // 발생한 에러 표시
    }
  }

  // async function login() {
  //   fetch(`${STATICURL}/front/player/on`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: "4247e6b6-c014-45a6-8f9d-c766819a6f2f",
  //     }),
  //   })
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((data) => {
  //       // setAccesToken(data.accestoken);
  //       // getCourseList();
  //       // getMediaUrl();
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }

  const getMediaUrl = (accessToken) => {
    fetch(`${STATICURL}/front/course/unit/${TESTUNIT}`, {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        complete: true,
        currentUnitId: -1,
        recordTime: 0,
      }),
    })
      .then((e) => e.json())
      .then((res) => {
        setMediaUrl(`${STATICURL}${res.fileUrl}`);

        questionDown();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCourseList = () => {
    fetch(`${STATICURL}/open/course/${TESTCOURSE}/unit`, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((res) => {
        const list = [];
        res.map((e) => {
          list.push(e);
        });
        setCourseList(list);
        // console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const questionDown = () => {
    fetch(`${STATICURL}/front/course/unit/${TESTUNIT}/question/`, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
        setQuestionVal(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const keyUpHandler = (e) => {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 44) {
      stopPrntScr();
      setCapture(true);
      wrapperRef.current.focus();
      setTimeout(() => {
        setCapture(false);
      }, 3000);
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

  useEffect(() => {
    getParams();
    login();
  }, []);

  // useEffect(() => {
  //   console.log("WWWWWW");
  // }, [queryList]);

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
        setOverlappingVal(false);
      } else {
        alert("연결 종료");
      }
    });
  }

  // 어떤 강의랑 연결되었는지를 딱 판단해서 아톰값 수정해야함

  return (
    <Hm>
      {/* {isUser === null ? (
        <CheckBox>
          <CheckTab
            initial={{ backgroundColor: "#000000", color: "#000000" }}
            animate={{
              backgroundColor: "#0000007f",
              color: "#9c9c9c",
              transition: { duraiton: 1 },
            }}
            whileHover={{
              backgroundColor: "#d8d8d8",
              transition: { duration: 0.3 },
              color: "#000000",
            }}
            onClick={() => {
              setUser(true);
            }}
          >
            <H1>플레이어</H1>
          </CheckTab>
          <CheckTab
            initial={{ backgroundColor: "#ffffff", color: "#000000" }}
            animate={{
              backgroundColor: "#0000007f",
              color: "#626262",
              transition: { duraiton: 1 },
            }}
            whileHover={{
              backgroundColor: "#d8d8d8",
              transition: { duration: 0.3 },
              color: "#000000",
            }}
            onClick={() => {
              setUser(false);
            }}
          >
            <H1>임시 플랫폼</H1>
          </CheckTab>
        </CheckBox>
      ) : isUser ? (
        <Wrapper>
          <VideoTab>
            <Player />
          </VideoTab>
          <BarTab>
            <SideBar />
          </BarTab>
        </Wrapper>
      ) : (
        <Manager />
      )} */}

      <Wrapper tabIndex={0} onKeyUp={keyUpHandler} ref={wrapperRef}>
        {!isCapture ? null : (
          <BlockCapBox>
            <H1>캡쳐 금지</H1>
          </BlockCapBox>
        )}
        <VideoTab>
          <Player />
        </VideoTab>
        <BarTab>
          <SideBar />
        </BarTab>
      </Wrapper>
    </Hm>
  );
}
