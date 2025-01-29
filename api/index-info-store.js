const IndexInfoStore = [
    {
        href: "/",
        title: "關於本站",
        contents: [
            "後端 API 是使用 rust 的 axum 框架",
            "前端頁面是使用 react + next.js 框架",
            "頁面的 blogs 是想自己完成 hackmd 的方式作筆記生出來的相關內容",
            "目前使用 cherry-markdown 完成初期可使用的版本",
            "UI/UX 甚麼的還等待完善中",
            "其餘的想到甚麼就會加進來",
        ]
    },
    {
        href: "/hackmd-notes",
        title: "Notes 頁面",
        contents: [
            "使用 React Context 完成在 client component 間的 state 資訊共用",
            "搭配 rust 的後端 API 完成 axum + NextJS 的組合"
        ]
    },
    {
        href: "/ws",
        title: "WS chat 頁面",
        contents: [
            "使用 rust 建立的 ws server",
            "進行即時的交流"
        ]
    },
];

export default IndexInfoStore;