
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
				love: {
					pink: "#FFDEE2",
					peach: "#FDE1D3",
					lavender: "#E5DEFF",
					purple: "#9b87f5",
					magenta: "#D946EF",
				}
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
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-heart': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
				},
				'sparkle': {
					'0%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-love': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
				'stars': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23FFFFFF\' stroke-opacity=\'0.2\'%3E%3Ccircle r=\'1\' cx=\'100\' cy=\'100\'/%3E%3Ccircle r=\'1\' cx=\'200\' cy=\'150\'/%3E%3Ccircle r=\'1\' cx=\'300\' cy=\'250\'/%3E%3Ccircle r=\'1\' cx=\'400\' cy=\'50\'/%3E%3Ccircle r=\'1\' cx=\'500\' cy=\'350\'/%3E%3Ccircle r=\'1\' cx=\'600\' cy=\'150\'/%3E%3Ccircle r=\'1\' cx=\'700\' cy=\'400\'/%3E%3Ccircle r=\'1\' cx=\'150\' cy=\'450\'/%3E%3Ccircle r=\'1\' cx=\'250\' cy=\'550\'/%3E%3Ccircle r=\'1\' cx=\'350\' cy=\'650\'/%3E%3Ccircle r=\'1\' cx=\'450\' cy=\'400\'/%3E%3Ccircle r=\'1\' cx=\'550\' cy=\'500\'/%3E%3Ccircle r=\'1\' cx=\'650\' cy=\'600\'/%3E%3Ccircle r=\'1\' cx=\'750\' cy=\'700\'/%3E%3C/g%3E%3C/svg%3E")',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
