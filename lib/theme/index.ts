// Theme configuration
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    sidebar: {
      bg: '#0A3776', // Updated to exact color requested
      bgHover: '#0D418A',
      text: '#e2e8f0',
      textHover: '#ffffff',
      border: '#0C3E84',
      active: '#0052cc',
    },
    background: {
      main: '#f8fafc',
      card: '#ffffff',
      hover: '#f1f5f9',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
      disabled: '#cbd5e1',
    },
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  spacing: {
    sidebar: {
      width: '280px',
      widthCollapsed: '80px',
    },
    header: {
      height: '64px',
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
} as const;

export type Theme = typeof theme;
