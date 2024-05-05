import getHackMDNoteTags from "@/api/get-hackmd-note-tags";
import getHackMDNotes from "@/api/get-hackmd-notes";
import HackMDNotesComponent from "@/components/hackmd-notes";
import HackmdNoteTagButtons from "@/components/hackmd-note-tag-buttons";

export const metadata = {
    title: "HackMD Notes",
    description: "HackMD Notes",
};

export default async function HackMDNotes() {
    const notes = await getHackMDNotes();
    const tags = await getHackMDNoteTags();
    let defaultOpenArray = tags.map(tag => tag.name);

    return (
        <>
            <HackmdNoteTagButtons tags={tags} />

            <HackMDNotesComponent notes={notes} defaultOpenArray={defaultOpenArray} />
        </>
    )
}