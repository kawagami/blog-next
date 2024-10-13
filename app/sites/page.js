import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "sites",
    description: "sites",
};

export default function Sites() {
    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-50 max-w-full h-auto">

                {/* Site 1 */}
                <Link target="_blank" href="https://kawa.homes" className="hover:scale-105 transition-transform w-full max-w-xs">
                    <div className="relative flex flex-col overflow-hidden rounded-lg bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs">
                        <div className="relative m-0 overflow-hidden rounded-t-lg">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/e63855a4-1381-45e3-a3f8-d9019cce1040.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                                className="hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-xl font-bold text-blue-gray-900 mb-2">
                                目前的二級域名 kawa.homes
                            </h4>
                            <p className="text-base text-gray-600">
                                最一開始練習 deploy 時的產物
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Site 2 */}
                <Link target="_blank" href="https://sg-vite.kawa.homes" className="hover:scale-105 transition-transform w-full max-w-xs">
                    <div className="relative flex flex-col overflow-hidden rounded-lg bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs">
                        <div className="relative m-0 overflow-hidden rounded-t-lg">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/4aabf7d8-1cf9-47bd-a63d-73a333c41bb8.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                                className="hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-xl font-bold text-blue-gray-900 mb-2">
                                後台頁面
                            </h4>
                            <p className="text-base text-gray-600">
                                使用 vite & vue 完成的 SPA 後台
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Site 3 */}
                <Link target="_blank" href="https://axum.kawa.homes" className="hover:scale-105 transition-transform w-full max-w-xs">
                    <div className="relative flex flex-col overflow-hidden rounded-lg bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs">
                        <div className="relative m-0 overflow-hidden rounded-t-lg">
                            <Image
                                src="https://storage.googleapis.com/fir-test-a67eb.appspot.com/images/f5cf1161-a26e-4caf-9ec6-3595579d686f.png"
                                width={500}
                                height={500}
                                alt="kawa homes"
                                className="hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-xl font-bold text-blue-gray-900 mb-2">
                                API 站點
                            </h4>
                            <p className="text-base text-gray-600">
                                <span>rust axum 建立的 API 站點</span><br />
                                <span>使用 docker multi-stage build 之後</span><br />
                                <span>於線上運行時大小僅 31.2 MB</span>
                            </p>
                        </div>
                    </div>
                </Link>

            </div>
        </>
    );
}
