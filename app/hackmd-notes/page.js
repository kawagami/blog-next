import HackMDNotesComponent from "@/components/hackmd-notes";
import HackmdNoteTagButtons from "@/components/hackmd-note-tag-buttons";

export const metadata = {
    title: "HackMD Notes",
    description: "HackMD Notes",
};

export default function HackMDNotes() {

    return (
        <>
            <HackmdNoteTagButtons />
            <HackMDNotesComponent />
        </>
    );
}
