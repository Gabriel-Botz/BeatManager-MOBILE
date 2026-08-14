import { Platform } from 'react-native';
import { Cores } from './colors';

export type ThemeColor = keyof typeof Cores;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Espacamento = {
  metade: 2,
  um: 4,
  dois: 8,
  tres: 16,
  quatro: 24,
  cinco: 32,
  seis: 64,
} as const;

export const InsetTab = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const LarguraMaxima = 800;
