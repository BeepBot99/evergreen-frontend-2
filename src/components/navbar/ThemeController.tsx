import {useEffect, useState} from "react";
import clsx from "clsx";
import {ChevronDown} from "lucide-react";

const themes = ["forest", "night", "winter", "lemonade"] as const
type Theme = typeof themes[number]

function themeOrNull(value: string | null): Theme | null {
    if (value === null) return null;
    if (themes.includes(value as Theme)) return value as Theme;
    else return null;
}

export default function ThemeController() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => themeOrNull(localStorage.getItem("theme")) ?? "forest")

    useEffect(() => {
        localStorage.setItem("theme", currentTheme)
    }, [currentTheme])

    return (
        <div className="dropdown mr-5">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <ChevronDown className="size-3"/>
            </div>
            <ul className="dropdown-content bg-base-300 w-30 rounded-box z-1 p-2 shadow-2xl">
                {themes.map(theme => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className={clsx("theme-controller btn btn-sm btn-ghost justify-start", currentTheme === theme && "btn-active")}
                            aria-label={theme[0].toUpperCase() + theme.slice(1)}
                            value={theme}
                            checked={currentTheme === theme}
                            onChange={e => {
                                setCurrentTheme(e.target.value as Theme)
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}