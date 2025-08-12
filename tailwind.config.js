export default {
    darkMode: 'class', // not 'media'
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {

        extend: {
            animation: {
                'slide-up': 'slideUp 0.7s ease-out forwards',
              },
              keyframes: {
                slideUp: {
                  '0%': { transform: 'translateY(40px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
                },
              },
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

