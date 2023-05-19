import { Blip } from '../components/radar/types';

export const getUrl = (url: string, hostUrl = ''): string => hostUrl.concat(url);

// Пример запроса радара
// http://localhost:3000/techradar/company/123/radar/123/version/123

export const buildRadarUrl = (companyId: number, radarId: number, versionId?: number): string => {
    const version = versionId ? `${versionId}` : 'latest';
    return `/techradar/company/${companyId}/radar/${radarId}/version/${version}`;
};

export interface Sector {
    id: number;
    name: string;
}

export interface Ring {
    id: number;
    name: string;
}

export interface BasicRadarData {
    blips: Blip[];
    sectorNames: string[];
    ringNames: string[];
}

export interface RadarData extends BasicRadarData {
    id: number;
    name: string;
    sectors: Sector[];
    rings: Ring[];
    companyId: number;
    authorId: number;
}

export interface CreateRadarData extends BasicRadarData {
    name: string;
    companyId: number;
    authorId: number;
}

export interface CreateRadarApiData {
    radar: {
        name: string;
        companyId: number;
        authorId: number;
    };
    quadrants: { name: string; position: number }[];

    rings: { name: string; position: number }[];
    blips: {
        name: string;
        description: string;
        quadrant: {
            name: string;
        };
        ring: {
            name: string;
        };
    }[];
}

export interface RadarApiDataResponse {
    blipEventId: number;
    radarId: number;
    quadrants: {
        id: number;
        name: string;
        position: number;
        radarId: number;
    }[];
    rings: {
        id: number;
        name: string;
        position: number;
        radarId: number;
    }[];
    blips: {
        id: number;
        name: string;
        description: string;
        quadrantId: number;
        ringId: number;
        radarId: number;
    }[];
}

export interface CreateRadarVersionDataApi {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export interface CreateBlipApiRequest {
    name: string;
    description: string;
    radarId: number;
}

export interface CreateBlipApiResponse {
    id: number;
    name: string;
    description: string;
    radarId: number;
}

export interface CreateVersionApiRequest {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export interface VersionApiResponse {
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
    creationTime: string;
    lastChangeTime: string;
}

export interface CreateBlipEventApiRequest {
    comment: string;
    parentId: number;
    blipId: number;
    quadrantId: number;
    ringId: number;
    authorId: number;
}

export interface CreateBlipEventApiResponse {
    id: number;
    comment: string;
    parentId: number;
    creationTime: string;
    lastChangeTime: string;
}

export const formatApiData = (apiData: RadarApiDataResponse): RadarData => {
    const sectors = apiData.quadrants
        .sort((quadrant1, quadrant2) => quadrant1.position - quadrant2.position)
        .map((quadrant) => ({ id: quadrant.id, name: quadrant.name }));

    const sectorNames = sectors.map((sector) => sector.name);
    const rings = apiData.rings
        .sort((ring1, ring2) => ring1.position - ring2.position)
        .map((ring) => ({ id: ring.id, name: ring.name }));

    const ringNames = rings.map((ring) => ring.name);

    const blips = apiData.blips
        .sort((blip1, blip2) => (blip1.name < blip2.name ? -1 : 1))
        .map((blip) => ({
            id: -1,
            name: blip.name,
            description: blip.description,
            sectorName: apiData.quadrants.find((quadrant) => blip.quadrantId === quadrant.id)?.name || '',
            ringName: apiData.rings.find((ring) => blip.ringId === ring.id)?.name || '',
        }));

    const groupedByRings = ringNames.map((ringName) =>
        blips
            .sort((blipA, blipB) => {
                if (blipA.name < blipB.name) {
                    return -1;
                }
                if (blipA.name > blipB.name) {
                    return 1;
                }
                return 0;
            })
            .filter((blip) => blip.ringName === ringName)
    );

    const sortedBlips = sectorNames
        .map((sectorName) => groupedByRings.map((group) => group.filter((blip) => blip.sectorName === sectorName)))
        .flat(2)
        .map((blip, i) => ({ ...blip, id: i + 1 }));

    return {
        id: apiData.radar.id,
        name: apiData.radar.name,
        companyId: apiData.radar.companyId,
        authorId: apiData.radar.companyId,
        sectorNames,
        sectors,
        ringNames,
        rings,
        blips: sortedBlips,
    };
};

export const formatCreateRadarData = (radar: CreateRadarData): CreateRadarApiData => {
    const quadrants = radar.sectorNames.map((name, i) => ({ name, position: i + 1 }));
    const rings = radar.ringNames.map((name, i) => ({ name, position: i + 1 }));
    const blips = radar.blips.map((blip) => ({
        name: blip.name,
        description: blip.description || '',
        quadrant: {
            name: blip.sectorName,
        },
        ring: {
            name: blip.ringName,
        },
    }));
    return {
        radar: {
            name: radar.name,
            companyId: radar.companyId,
            authorId: radar.authorId,
        },
        quadrants,
        rings,
        blips,
    };
};
