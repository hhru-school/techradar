import { Blip } from '../../components/radar/types';

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

export interface ApiData {
    id: number;
    name: string;
    quadrants: DataQuadrant[];
    rings: DataRing[];
    blips: DataBlip[];
}

export interface FormattedData {
    blips: Blip[];
    sectorNames: string[];
    ringNames: string[];
}

export const formatApiData = (apiData: ApiData): FormattedData => {
    return {
        sectorNames: apiData.quadrants
            .sort((quadrant1, quadrant2) => quadrant1.position - quadrant2.position)
            .map((quadrant) => quadrant.name),
        ringNames: apiData.rings.sort((ring1, ring2) => ring1.position - ring2.position).map((ring) => ring.name),

        blips: apiData.blips
            .sort((blip1, blip2) => (blip1.name < blip2.name ? -1 : 1))
            .map((blip, i) => ({
                id: i,
                name: blip.name,
                description: blip.description,
                sectorName: apiData.quadrants.find((quadrant) => blip.quadrantId === quadrant.id)?.name || '',
                ringName: apiData.rings.find((ring) => blip.ringId === ring.id)?.name || '',
            })),
    };
};
