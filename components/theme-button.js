'use client'

export default function ThemeButton() {
    return (
        <button className="rounded-full bg-blue-300 py-8" onClick={changeTheme}>切換背景色</button>
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
