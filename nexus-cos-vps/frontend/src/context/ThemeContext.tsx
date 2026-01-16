import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'nexus-dark' | 'nexus-light' | 'neon-grid' | 'monochrome';

interface Theme {
    id: ThemeType;
    name: string;
    colors: {
        background: string;
        surface: string;
        primary: string;
        text: string;
        border: string;
        accent: string;
    };
}

const themes: Record<ThemeType, Theme> = {
    'nexus-dark': {
        id: 'nexus-dark',
        name: 'Deep Space',
        colors: {
            background: '#0f172a',
            surface: '#1e293b',
            primary: '#2563eb',
            text: '#ffffff',
            border: '#334155',
            accent: '#3b82f6'
        }
    },
    'nexus-light': {
        id: 'nexus-light',
        name: 'Daylight Protocol',
        colors: {
            background: '#f8fafc',
            surface: '#ffffff',
            primary: '#0284c7',
            text: '#0f172a',
            border: '#e2e8f0',
            accent: '#0ea5e9'
        }
    },
    'neon-grid': {
        id: 'neon-grid',
        name: 'Cyber Grid',
        colors: {
            background: '#09090b',
            surface: '#18181b',
            primary: '#d946ef',
            text: '#e4e4e7',
            border: '#27272a',
            accent: '#f472b6'
        }
    },
    'monochrome': {
        id: 'monochrome',
        name: 'Obsidian',
        colors: {
            background: '#000000',
            surface: '#111111',
            primary: '#ffffff',
            text: '#ffffff',
            border: '#333333',
            accent: '#cccccc'
        }
    }
};

interface ThemeContextType {
    theme: Theme;
    setTheme: (id: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeId, setThemeId] = useState<ThemeType>('nexus-dark');

    useEffect(() => {
        const saved = localStorage.getItem('nexus_theme') as ThemeType;
        if (saved && themes[saved]) {
            setThemeId(saved);
        }
    }, []);

    const handleSetTheme = (id: ThemeType) => {
        setThemeId(id);
        localStorage.setItem('nexus_theme', id);
    };

    const value = {
        theme: themes[themeId],
        setTheme: handleSetTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            <div style={{ 
                '--nexus-dark': value.theme.colors.background,
                '--nexus-darker': value.theme.colors.surface,
                '--nexus-primary': value.theme.colors.primary,
                '--nexus-text': value.theme.colors.text,
                '--nexus-border': value.theme.colors.border,
                '--nexus-accent': value.theme.colors.accent,
                // Legacy support if needed
                '--bg-color': value.theme.colors.background,
                '--surface-color': value.theme.colors.surface,
                '--primary-color': value.theme.colors.primary,
                '--text-color': value.theme.colors.text,
                '--border-color': value.theme.colors.border,
                '--accent-color': value.theme.colors.accent,
                transition: 'all 0.5s ease',
                minHeight: '100vh',
                background: value.theme.colors.background,
                color: value.theme.colors.text
            } as React.CSSProperties}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
