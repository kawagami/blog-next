import IndexInfo from "@/components/index-info";
import IndexInfoStore from "@/api/index-info-store";

export default function About() {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      {
        IndexInfoStore.map((info, index) => <IndexInfo key={`index_info_${index}`} href={info.href} title={info.title} contents={info.contents} />)
      }
    </div>
  );
}
