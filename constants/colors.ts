export const Colors = {
  primary: '#1a1a1a',
  secondary: '#c9a962',
  accent: '#d4af37',
  background: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  text: '#1a1a1a',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#e0e0e0',
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
} as const;

export const Gradients = {
  gold: ['#c9a962', '#d4af37'],
  dark: ['#1a1a1a', '#0a0a0a'],
} as const;

// Image resize modes for consistent image handling
export const ResizeMode = {
  cover: 'cover' as const,
  contain: 'contain' as const,
  stretch: 'stretch' as const,
  center: 'center' as const,
} as const;
