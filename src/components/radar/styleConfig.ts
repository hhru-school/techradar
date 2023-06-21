export const defaultGap = 15;
const hhColors = [
    'rgb(127, 24, 27)',
    'rgb(242, 123, 42)',
    'rgb(251, 176, 52)',
    'rgb(255, 221, 0)',
    'rgb(193, 216, 47)',
    'rgb(80, 158, 47)',
    'rgb(0, 146, 157)',
    'rgb(0, 131, 202)',
    'rgb(111, 74, 179)',
    'rgb(138, 121, 103)',
];

export const defaultRadarRadius = 300;

export const defaultColorScheme = [hhColors[1], hhColors[3], hhColors[4], hhColors[5], hhColors[6], hhColors[7]];
export const defaultBaseColor = '#FFFFFF';

export const textOffsetY = 2;
export const sectorNameFontSize = 16;
export const sectorNameTextOffset = 15;

export const defaultBlipRadius = 10;
export const defaultBlipColor = 'rgb(255, 244, 40)';
export const defaultBlipLabelColorDark = 'rgb(86, 86, 86)';
export const defaultBlipLabelColorLight = '#FFFFFF';

export const getlabelColor = (baseColor: string): string => {
    switch (baseColor) {
        case hhColors[3] || hhColors[4]: {
            return defaultBlipLabelColorDark;
        }
        default: {
            return defaultBlipLabelColorLight;
        }
    }
};
