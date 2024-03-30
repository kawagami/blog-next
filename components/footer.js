export default function Footer() {
    return (
        <footer className="min-h-[50px] bg-yellow-300 dark:bg-teal-300 dark:text-white overflow-hidden grid grid-cols-5 gap-4 text-center">
            <div className="bg-slate-200 col-start-2">block 1</div>
            <div className="bg-slate-400">block 2</div>
            <div className="bg-slate-600">block 3</div>
        </footer>
    );
}