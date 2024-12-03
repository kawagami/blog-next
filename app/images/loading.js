import loading from "@/assets/loading.svg"
import Image from "next/image";

export default function Loading() {
  return <Image src={loading} width={300} height={300} alt="loading" />;
}
