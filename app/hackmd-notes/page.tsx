import getHackMDNoteTags from "@/api/get-hackmd-note-tags";
import getHackMDNotes from "@/api/get-hackmd-notes";
import HackMDNotesComponent from "@/components/hackmd-notes";
import HackmdNoteTagButtons from "@/components/hackmd-note-tag-buttons";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HackMD Notes",
    description: "HackMD Notes",
};

export default async function HackMDNotes() {
    const notes = await getHackMDNotes();
    const tags = await getHackMDNoteTags();
    const defaultOpenArray = tags.map(tag => tag.name);

    return (
        <div className="w-full h-[calc(100svh-120px)] text-center overflow-auto">
            <HackmdNoteTagButtons tags={tags} />
            <HackMDNotesComponent notes={notes} defaultOpenArray={defaultOpenArray} />
        </div>
    );
}
