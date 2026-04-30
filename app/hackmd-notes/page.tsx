import getHackMDNoteTags from "@/api/get-hackmd-note-tags";
import getHackMDNotes from "@/api/get-hackmd-notes";
import HackMDNotesWrapper from "@/components/hackmd/hackmd-notes-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HackMD Notes",
    description: "HackMD Notes",
};

export default async function HackMDNotes() {
    const [notes, tags] = await Promise.all([getHackMDNotes(), getHackMDNoteTags()]);

    return (
        <div className="w-full h-[calc(100svh-120px)] text-center overflow-auto">
            <HackMDNotesWrapper notes={notes} tags={tags} />
        </div>
    );
}
