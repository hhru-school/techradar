// export const defaultColorScheme = getColorScheme(10);

export const defaultGap = 18;
const colors = [
    'rgb(236, 129, 67)',

    'rgb(231, 202, 47)',
    'rgb(172, 227, 195)',
    'rgb(68, 168, 195)',
    'rgb(96, 101, 112)',

    'rgb(92, 116, 104)',

    'rgb(225, 145, 156)',
    'rgb(206, 94, 176)',
    'rgb(127, 214, 229)',
    'rgb(221, 173, 145)',
    'rgb(124, 144, 151)',
];

export const defaultColorScheme = colors;

export const textOffsetY = 2;
export const sectorNameFontSize = 20;
export const sectorNameTextOffset = 15;

export const defaultBlipRadius = 8;

/* function getColorScheme(numOfSectors: number) {
    const res: string[] = [];
    for (let i = 0; i < numOfSectors; i++) {
        res.push(getRandomColor());
    }
    return res;
}*/

/* function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/
