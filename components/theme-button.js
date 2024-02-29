'use client'

export default function ThemeButton() {
    return (
        <button className="rounded-lg bg-blue-300 dark:bg-yellow-300 hover:scale-125 hover:bg-red-800 hover:ring" onClick={changeTheme}>切換背景色</button>
        // <input type="checkbox" />
    );
}

function changeTheme() {
    const htmlClass = document.documentElement.classList;
    if (htmlClass.contains('dark')) {
        htmlClass.remove('dark')
    } else {
        htmlClass.add('dark')
    }
}
