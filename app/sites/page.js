import SiteComponent from "@/components/site-component";

export const metadata = {
    title: "sites",
    description: "sites",
};

const data = [
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/e63855a4-1381-45e3-a3f8-d9019cce1040.png",
        href: "https://kawa.homes",
        alt: "level 2 domain",
        title: "目前的二級域名 kawa.homes",
        contents: [
            "最一開始練習 deploy 時的產物",
            "預計未來使用此 next 網站",
            "取代二級域名 kawa.homes"
        ]
    },
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/4aabf7d8-1cf9-47bd-a63d-73a333c41bb8.png",
        href: "https://sg-vite.kawa.homes",
        alt: "練習 vite vue 的後台頁面",
        title: "練習 vite vue 的後台頁面",
        contents: [
            "後台頁面",
            "使用 vite & vue 完成的 SPA 後台"
        ]
    },
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/f5cf1161-a26e-4caf-9ec6-3595579d686f.png",
        href: "https://axum.kawa.homes",
        alt: "後端 API 站點",
        title: "後端 API 站點",
        contents: [
            "rust axum 建立的 API 站點",
            "包括圖片處理功能",
            "將檔案上傳至 firebase",
            "使用 docker multi-stage build 之後",
            "於線上運行時大小僅 39.7 MB"
        ]
    }
];

export default function Sites() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.map((item, index) => (
                <SiteComponent
                    key={index}
                    src={item.src}
                    href={item.href}
                    alt={item.alt}
                    title={item.title}
                    contents={item.contents}
                />
            ))}
        </div>
    );
}
