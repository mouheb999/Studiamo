import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			bg: '#F0F8F8',
  			ink: '#053D4E',
  			primary: '#007A8A',
  			accent: '#00BCD4',
  			mist: '#E0F4F7',
  			'italian-red': '#8B1A2A',
  			'italian-green': '#006B3C',
  			'dark-bg': '#042D3A'
  		},
  		fontFamily: {
  			display: [
  				'Playfair Display',
  				'serif'
  			],
  			body: [
  				'DM Sans',
  				'sans-serif'
  			],
  			mono: [
  				'DM Mono',
  				'monospace'
  			]
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
}
export default config
