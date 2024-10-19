const IndexInfoStore = [
    {
        href: "/",
        title: "關於本站",
        contents: [
            "基於學習 rust & react 下的產物",
            "後端 API 是使用 rust 的 axum 框架",
            "前端頁面是使用 next.js 框架",
            "目前頁面有基本的黑暗模式切換",
            "HackMD note 頁面完成初步的分類按鈕功能",
            "My Sites 頁面是稍微介紹一下目前使用的 domain",
            "WS 頁面是簡易聊天室",
            "慢慢建構中",
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