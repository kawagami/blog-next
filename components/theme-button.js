'use client'

export default function ThemeButton() {
    return (
        <button className="rounded-full bg-blue-300 py-8" onClick={changeTheme}>切換背景色</button>
    );
}

function changeTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
    }
}
