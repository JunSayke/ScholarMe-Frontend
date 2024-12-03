/** @type {import('tailwindcss').Config} */
module.exports = {
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
		},
	},
	plugins: [],
}
