module.exports = {
  purge: [],
  theme: {
    fontSize: {
      '2xs': '.625rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontFamily:{
      "heading":['Montserrat', 'sans-serif'],
      "paras":['PT Sans Narrow', 'sans-serif']
    },
    inset:{
      '0':0,
      '1/2':'50%',
      '1/5':'20%',
      '2/5':'40%',
      '3/5':'60%',
      '4/5':'80%'
    },
    minWidth: {
      '0': '0',
      '1/3': '33.33%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '24':'6rem',
      '32':'8rem',
      },
    minHeight:{
      '24':'6rem',
      '32':'8rem',
      'screen':'100vh'
    },
    extend: {
      colors:{
        "gray-dark":"#1E1E1E",
        "gray-mid" :"#383838",
        "gray-light" :"#666666",
        "orange-mid" :"#FF7A00",
        "blue-logo" :"#43C7F1",
        "blue-tag" : "#12569E"
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20'
      },
    },
  },
  variants: {},
  plugins: [],
}
