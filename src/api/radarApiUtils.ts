import { RadarInterface, Ring, Sector } from '../components/radar/types';

export const getUrl = (url: string, hostUrl = ''): string => hostUrl.concat(url);

// Пример запроса радара
// http://localhost:3000/techradar/company/123/radar/123/version/123

export const buildRadarUrl = (companyId: number, radarId: number, versionId?: number): string => {
    const version = versionId ? `${versionId}` : 'latest';
    return `/techradar/company/${companyId}/radar/${radarId}/version/${version}`;
};

// export interface BasicRadarData {
//     blips: Blip[];
//     sectorNames: string[];
//     ringNames: string[];
// }

// export interface CreateRadarApiRequest {
//     name: string;
//     companyId: number;
//     authorId: number;
// }

export interface CreateRadarApiRequest {
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
    blipEventId: number | null;
    radar: {
        id: number;
        name: string;
        authorId: number;
        companyId: number;
    };
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

export interface UpdateVersionRequest {
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export const formatApiData = (apiData: RadarApiDataResponse): RadarInterface => {
    const sectors = apiData.quadrants
        .sort((quadrant1, quadrant2) => quadrant1.position - quadrant2.position)
        .map((quadrant) => ({ id: quadrant.id, name: quadrant.name }));

    const rings = apiData.rings
        .sort((ring1, ring2) => ring1.position - ring2.position)
        .map((ring) => ({ id: ring.id, name: ring.name }));

    const blips = apiData.blips
        .sort((blip1, blip2) => (blip1.name < blip2.name ? -1 : 1))
        .map((blip) => ({
            id: blip.id,
            legendId: -1,
            name: blip.name,
            description: blip.description,
            sector: apiData.quadrants.find((quadrant) => blip.quadrantId === quadrant.id) as Sector,
            ring: apiData.rings.find((ring) => blip.ringId === ring.id) as Ring,
        }));

    const groupedByRings = rings.map((ring) =>
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
            .filter((blip) => blip.ring.name === ring.name)
    );

    const sortedBlips = sectors
        .map((sector) => groupedByRings.map((group) => group.filter((blip) => blip.sector.name === sector.name)))
        .flat(2)
        .map((blip, i) => ({ ...blip, label: i + 1 }));

    return {
        id: apiData.radar.id,
        name: apiData.radar.name,
        companyId: apiData.radar.companyId,
        authorId: apiData.radar.companyId,
        sectors,
        rings,
        blips: sortedBlips,
    };
};

export const formatCreateRadarData = (radar: RadarInterface): CreateRadarApiRequest => {
    const quadrants = radar.sectors.map((sector, i) => ({ name: sector.name, position: i + 1 }));
    const rings = radar.rings.map((ring, i) => ({ name: ring.name, position: i + 1 }));
    const blips = radar.blips.map((blip) => ({
        name: blip.name,
        description: blip.description || '',
        quadrant: {
            name: blip.sector.name,
        },
        ring: {
            name: blip.ring.name,
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
