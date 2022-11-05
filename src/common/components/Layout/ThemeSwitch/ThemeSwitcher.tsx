import {useTheme} from "next-themes";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return (
        <button
            onClick={onThemeChange}
            className={"rounded-full dark:bg-gray-700 hover:bg-gray-200 bg-gray-100 p-3"}>
            {theme === "dark" ? (
                <MoonIcon className={"w-5 h-5"}/>
            ) : (
                <SunIcon className={"w-5 h-5"}/>
            )}
        </button>
    )
}

export default ThemeSwitcher;