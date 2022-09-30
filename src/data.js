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
      time: 1.3,
    },
    {
      title: "2",
      content: "이 내용 몰라요",
      reply: true,
      replyContent: "어쩌구저쩌구",
      time: 12,
    },

    {
      title: "3",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 123,
    },
    {
      title: "4",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 140,
    },
    {
      title: "5",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 230,
    },
    {
      title: "6",
      content: "이 내용 몰라요",
      reply: false,
      replyContent: "",
      time: 340,
    },
  ];
  return ques;
}
