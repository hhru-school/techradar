export const defaultRadarName = 'My-radar';
export const defaultVersionName = getVersionName();

export const defaultSectorNames = ['Languages & Frameworks', 'Libraries', 'Techniques', 'Tools & Environment'];
export const defaultRingNames = ['Adopt', 'Trial', 'Hold'];

function getVersionName(): string {
    const date = new Date();
    const month = date.getMonth();
    let quarter = 1;
    if (month >= 3 && month < 6) quarter = 2;
    if (month >= 6 && month < 9) quarter = 3;
    if (month >= 9 && month <= 11) quarter = 4;
    const year = date.getFullYear();

    return `Q${quarter}-${year}`;
}
