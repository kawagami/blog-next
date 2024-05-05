import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">

      <div className="p-4 border-4 rounded-2xl border-double border-gray-800">
        <div className="text-4xl p-4">
          <Link
            href="/blogs"
            className="text-blue-400"
          >
            Blog 頁面
          </Link>
          簡介
        </div>
        <div>偶爾想到就記錄一下的頁面</div>
      </div>

      <div className="p-4 border-4 rounded-2xl border-double border-gray-800">
        <div className="text-4xl p-4">
          <Link
            href="/hackmd-notes"
            className="text-blue-400"
          >
            HackMD 頁面
          </Link>
          簡介
        </div>
        <div>使用 React Context 完成在 client component 間的 state 資訊共用</div>
        <div>搭配 rust 的後端 API 完成 axum + NextJS 的組合</div>
      </div>

      {/* <div>
        <div>link 3</div>
        <div>todo</div>
      </div>

      <div>
        <div>link 4</div>
        <div>todo</div>
      </div> */}

    </div>
  );
}
