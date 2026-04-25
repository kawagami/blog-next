const IndexInfoStore = [
    {
        href: "/",
        title: "關於本站",
        contents: [
            "後端 API 是使用 rust 的 axum 框架",
            "前端頁面是使用 react + next.js 框架",
            "blogs 頁面使用自製 markdown 編輯器（react-markdown）",
            "UI/UX 持續完善中",
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
            "使用 rust 建立的 ws server 進行即時的交流",
            "重構中"
        ]
    },
];

export default IndexInfoStore;
