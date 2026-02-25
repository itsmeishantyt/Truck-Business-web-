/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/apply-form/**/*.{html,js}",
    ],
    theme: {
        extend: {
            colors: {
                orange: {
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                }
            }
        },
    },
    plugins: [],
}
