import { RadarInterface } from '../../components/radar/types';

const defaultRadarName = 'My-radar';

const defaultSectorNames = ['Languages & Frameworks', 'Libraries', 'Techniques', 'Tools & Environment'];
const defaultRingNames = ['Adopt', 'Trial', 'Hold'];

export const defaultVersionName = getVersionName();
export const defaultRadarAsset: RadarInterface = {
    id: -1,
    name: defaultRadarName,
    sectors: defaultSectorNames.map((sectorName, i) => ({ id: i, name: sectorName })),
    rings: defaultRingNames.map((ringName, i) => ({ id: i, name: ringName })),
    companyId: 1,
    authorId: 1,
    blips: [],
};

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
