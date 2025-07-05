
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// TrendVibe Threads brand colors
				navy: {
					DEFAULT: '#1C2526',
					50: '#f7f8f8',
					100: '#edeef0',
					200: '#d7dadd',
					300: '#b5bcc2',
					400: '#8c96a0',
					500: '#6f7b87',
					600: '#5a6671',
					700: '#4a545d',
					800: '#40484f',
					900: '#1C2526',
				},
				ivory: {
					DEFAULT: '#F8F1E9',
					50: '#FFFFFF',
					100: '#F8F1E9',
					200: '#F0E2D0',
					300: '#E8D3B7',
					400: '#E0C49E',
					500: '#D8B585',
					600: '#D0A66C',
					700: '#C89753',
					800: '#C0883A',
					900: '#B87921',
				},
				gold: {
					DEFAULT: '#D4A373',
					50: '#F7F2EC',
					100: '#F0E5D6',
					200: '#E9D8C0',
					300: '#E2CBAA',
					400: '#DBBD94',
					500: '#D4A373',
					600: '#CC8F5C',
					700: '#B87B45',
					800: '#A4672E',
					900: '#905317',
				},
				burgundy: {
					DEFAULT: '#6D8299',
					50: '#F4F6F8',
					100: '#E9ECF1',
					200: '#D3D9E3',
					300: '#BDC6D5',
					400: '#A7B3C7',
					500: '#6D8299',
					600: '#5A6F8B',
					700: '#475C7D',
					800: '#34496F',
					900: '#213661',
				},
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
