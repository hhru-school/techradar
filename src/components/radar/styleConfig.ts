// export const defaultColorScheme = getColorScheme(10);

export const defaultGap = 15;
const colors = [
    'rgb(168, 168, 168)',
    'rgb(235, 240, 168)',
    'rgb(126, 163, 163)',
    'rgb(156, 126, 163)',
    'rgb(221, 173, 145)',
    'rgb(231, 202, 47)',
    'rgb(88, 118, 102)',
    'rgb(172, 227, 195)',
    'rgb(124, 144, 151)',
    'rgb(255, 129, 67)',
    'rgb(127, 214, 229)',
    'rgb(68, 168, 195)',
];

export const defaultRadarRadius = 300;

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
}

function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/
