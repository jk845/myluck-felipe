import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => {
        throw new Error("setTheme was called outside of ThemeProvider context")
    },
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                              }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(storageKey) as Theme | null
        return storedTheme || defaultTheme
    })

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme])

    const setTheme = (newTheme: Theme) => {
        try {
            localStorage.setItem(storageKey, newTheme)
            setThemeState(newTheme)
        } catch (error) {
            console.error("Failed to set theme in localStorage:", error)
        }
    }

    const value = {
        theme,
        setTheme,
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
