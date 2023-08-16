module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      letterSpacing: {
        wider : '.2em',
        widest : '.4em',
      }, 
      fontSize:{
        '4xl' : '2.5rem'
      },
      borderWidth:{
        DEFAULT : '1px'
      }, 
      margin:{
        '7' : '1.6rem'
      }
    },
    fontFamily:{
      josefinSans:['"Josefin Sans"', 'san-serif'],
    },
    colors:{
      'bright-blue':'#3a7bfd',
      'gradient-blue':'#57ddff',
      'gradient-purple':'#c058f3',
      'white':'#ffffff',
      'gray':'#fafafa',
      'very-light-grayish-blue':'#e4e5f1',
      'light-grayish-blue':'#d2d3db',
      'dark-grayish-blue':'#9394a5',
      'very-dark-grayish-blue':'#484b6a',

      'very-dark-blue': '#161722',
      'very-dark-desaturated-blue': '#25273c',
      'light-grayish-blue-dark': '#cacde8',
      'light-grayish-blue-dark-hover': '#e4e5f1',
      'dark-grayish-blue-dark': '#777a92',
      'very-dark-grayish-blue-dark': '#4d5066',
      'darkest-grayish-blue': '#393a4c',
      'transparent':'transparent',
    }
  },
  plugins: [],
}