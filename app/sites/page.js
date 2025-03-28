import SiteComponent from "@/components/site-component";

export const metadata = {
    title: "sites",
    description: "sites",
};

const data = [
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/website/5b1ab20d-fa21-48ba-beb6-673056fa9b3b.png",
        href: "https://kawa.homes",
        alt: "level 2 domain",
        title: "目前的二級域名 kawa.homes",
        contents: [
            "最一開始練習 deploy 時",
            "用 laravel 建立的網站",
            "目前使用之前是",
            "next-blog.kawa.homes",
            "的 next.js 專案替換掉了"
        ]
    },
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/website/94536f30-8f7d-4d2a-891f-b2bf52d78a8d.png",
        href: "#",
        alt: "fastapi",
        title: "python firebase service",
        contents: [
            "python 的 firebase lib 很方便使用",
            "一開始就用 flask 建立了 service",
            "後來測試後發現 fastapi 速度快了一倍",
            "就再用 fastapi 建立一個 ver2 service",
            "用來簡化圖片上傳的流程"
        ]
    },
    {
        src: "https://storage.googleapis.com/fir-test-a67eb.appspot.com/website/578586a8-db2a-484a-b839-fcb78a794603.png",
        href: "https://axum.kawa.homes",
        alt: "後端 API 站點",
        title: "後端 API 站點",
        contents: [
            "rust axum 建立的 API 站點",
            "包括圖片處理功能",
            "將檔案上傳至 google firebase",
            "使用 docker multi-stage build",
            "且換成 google 發布的 cc-debian12",
            "於線上運行時 rust service 大小為 40.9 MB"
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
