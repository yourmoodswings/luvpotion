export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            scrollbarWidth: {
                hide: 'none'
            },
            colors: {
                museumBlack: '#181911',
            },
            backgroundImage: {
                'museum-combo': "url('/assets/museum_home_texture.jpg'), url('/assets/museum_home_texture2.jpg'), url('/assets/museum_home_texture3.jpg')",
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')

    ]
}