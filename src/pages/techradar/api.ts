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

// Все радары компании:
// http://localhost:8080/api/radars?companyId=1
// Конкретный радар:
// http://localhost:8080/api/radars/1

async function getData(url: string): Promise<unknown> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            mode: 'cors',
        },
    }).then((res) => {
        if (!res.ok) {
            console.error(res);
            throw new Error(res.statusText);
        }
        return res;
    });
    return response.json();
}

export async function loadRadar(id: string): Promise<ApiData> {
    const data = await getData(`/api/radars/${id}`);
    return data as ApiData;
}
