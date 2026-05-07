import { patchStockPendingAction } from "@/app/admin/(main)/stocks/actions";

export default function PendingButton({ id }: { id: string | number }) {
    return (
        <form action={patchStockPendingAction} className="inline">
            <input type="hidden" name="id" value={String(id)} />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                再查詢
            </button>
        </form>
    );
}
