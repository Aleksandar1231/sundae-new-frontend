import {black, grey, purple, red, teal, white} from './colors';

const theme = {
    borderRadius: 12,
    color: {
        black,
        grey,
        purple,
        primary: {
            light: red[200],
            main: red[500],
        },
        secondary: {
            main: grey[400],
        },
        white,
        teal,
    },
    siteWidth: 1200,
    spacing: {
        1: 4,
        2: 8,
        3: 16,
        4: 24,
        5: 32,
        6: 48,
        7: 64,
    },
    topBarSize: 72,
};

export default theme;
