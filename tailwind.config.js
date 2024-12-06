const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		fontFamily: {
			poppins: ["Poppins_400Regular"],
		},
		extend: {
			// - https://gist.github.com/cvan/47455a4f8aaa22e73e54253954635dc5
			// References used:
			// - https://yesviz.com/devices.php
			// - https://ricostacruz.com/til/css-media-query-breakpoints
			// - https://tailwindcss.com/docs/responsive-design/#customizing-breakpoints
			screens: {
				"2xs": { min: "300px" },
				xs: { max: "575px" }, // Mobile (iPhone 3 - iPhone XS Max).
				sm: { min: "576px", max: "897px" }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
				md: { min: "898px", max: "1199px" }, // Tablet (matches max: iPad Pro @ 1112px).
				lg: { min: "1200px" }, // Desktop smallest.
				xl: { min: "1259px" }, // Desktop wide.
				"2xl": { min: "1359px" }, // Desktop widescreen.
			},
			// - https://rnr-docs.vercel.app/getting-started/initial-setup/
			colors: {
				app: {
					bg: "hsl(var(--app-bg))",
				},
				// react-native-reusables
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
