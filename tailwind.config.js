const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/common/**/*.{js,ts,jsx,tsx}",
        "./src/modules/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
                serif: ['Oswald', ...defaultTheme.fontFamily.serif]
            }
        },
    },
    plugins: [],
}
