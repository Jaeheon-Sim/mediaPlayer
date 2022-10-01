export function CategoryList(courseidx) {
  return {
    1: "제목1",
    2: "제목2",
    3: "제목3",
  };
}
export function wishList() {}

export function Quest() {
  const ques = [
    {
      title: "1",
      content: "이 내용 몰라요",
      reply: true,
      replyContent: "어쩌구저쩌구",
      time: 0,
    },
    {
      title: "2",
      content: "이 내용 몰라요",
      reply: true,
      replyContent: "어쩌구저쩌구",
      time: 0,
    },

    {
      title: "3",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 1,
    },
    {
      title: "4",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 1,
    },
    {
      title: "5",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 2,
    },
    {
      title: "6",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 3,
    },
  ];
  return ques;
}
