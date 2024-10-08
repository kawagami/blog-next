import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "sites",
    description: "sites",
};

export default function Sites() {
    return (
        <>
            <div className="flex items-center gap-4 p-4">

                <Link target="_blank" href="https://kawa.homes" className="hover:scale-110">
                    <div
                        className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/e63855a4-1381-45e3-a3f8-d9019cce1040.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                            ></Image>
                        </div>
                        <div className="p-6">
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                目前的二級域名 kawa.homes
                            </h4>
                            <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                最一開始練習 deploy 時的產物
                            </p>
                        </div>
                    </div>
                </Link>

                <Link target="_blank" href="https://sg-vite.kawa.homes" className="hover:scale-110">
                    <div
                        className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/4aabf7d8-1cf9-47bd-a63d-73a333c41bb8.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                            ></Image>
                        </div>
                        <div className="p-6">
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                後台頁面
                            </h4>
                            <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                使用 vite & vue 完成的 SPA 後台
                            </p>
                        </div>
                    </div>
                </Link>

                <Link target="_blank" href="https://axum.kawa.homes" className="hover:scale-110">
                    <div
                        className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/4aabf7d8-1cf9-47bd-a63d-73a333c41bb8.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                            ></Image>
                        </div>
                        <div className="p-6">
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                API 站點
                            </h4>
                            <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                <span>rust axum 建立的 API 站點</span>
                                <span>使用 docker multi-stage build 之後</span>
                                <span>於線上運行時大小僅 31.2 MB</span>
                            </p>
                        </div>
                    </div>
                </Link>

            </div>
        </>
    )
}

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}