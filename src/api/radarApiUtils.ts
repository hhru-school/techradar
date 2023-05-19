import { Blip } from '../components/radar/types';

export interface DataQuadrant {
    id: number;
    name: string;
    position: number;
}

export interface DataRing {
    id: number;
    name: string;
    position: number;
}

export interface DataBlip {
    id: number;
    name: string;
    description: string;
    quadrantId: number;
    ringId: number;
}

export interface ApiRadarData {
    id: number;
    name: string;
    quadrants: DataQuadrant[];
    rings: DataRing[];
    blips: DataBlip[];
}

export interface FormattedRadarData {
    blips: Blip[];
    sectorNames: string[];
    ringNames: string[];
}

export interface CreateRadarData extends FormattedRadarData {
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
        radarId: number;
    }[];
}

export interface CreateRadarVersionDataApi {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export interface CreateRadarVersionDataApiResponse extends CreateRadarVersionDataApi {
    id: number;
}

export const formatApiData = (apiData: ApiRadarData): FormattedRadarData => {
    const sectorNames = apiData.quadrants
        .sort((quadrant1, quadrant2) => quadrant1.position - quadrant2.position)
        .map((quadrant) => quadrant.name);
    const ringNames = apiData.rings.sort((ring1, ring2) => ring1.position - ring2.position).map((ring) => ring.name);

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
        sectorNames,
        ringNames,
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
