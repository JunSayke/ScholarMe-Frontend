/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				background: "var(--color-bg)",
				text: "var(--color-text)",
				primary: "var(--color-primary)",
			},
		},
	},
	plugins: [],
}
