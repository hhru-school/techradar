import { ApiData, DataBlip, DataQuadrant, DataRing } from '../../pages/techradar/api';
import { Blip } from './types';

/* {
    "id": 1,
    "name": "Backend Tech Radar - 2022Q4",
    "quadrants": [
        {
            "id": 1,
            "name": "first_quadrant_name",
            "position": 1
        },
        {
            "id": 2
            "name": "second_quadrant_name",
            "position": 2
        },
        {
            "id": 3
            "name": "third_quadrant_name",
            "position": 3
        },
        {
            "id": 4
            "name": "fourth_quadrant_name",
            "position": 4
        }
    ],
    "rings": [
        {
            "id": 1
            "name": "first_name",
            "position": 1
        },
        {
            "id": 2
            "name": "second_ring_name",
            "position": 2
        },
        {
            "id": 3
            "name": "third_ring_name",
            "position": 3
        },
        {
            "id": 4
            "name": "fourth_ring_name",
            "position": 4
        },
        {
            "id": 5
            "name": "fifth_ring_name",
            "position": 5
        }
    ],
    "blips": [
        {
            "id": 1,
            "name": "PostgreSQL",
            "description": "blah-blah-blah",
            "quadrantId": 1,
            "ringId": 1
        },
        {
            "id": 2,
            "name": "Cassandra",
            "description": "",
            "quadrantId": 2,
            "ringId": 3
        },
        {
            "id": 3,
            "name": "Redis",
            "description": "",
            "quadrantId": 4,
            "ringId": 5
        }
    ]
}*/

export const ringNames = ['Active', 'Test', 'Hold'];
export const sectorNames = [
    'Business Automation',
    'Trust & Cybersecurity',
    'Digital Business & Products',
    'Data-driven Intelligence',

    // 'bla bla bla',
    // 'sfafsfsf',
    // 'dsadasdadsa',
];

const random = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
};

const letters = 'abcdefghijklmnopqrstuvwxyz_- ';

const randomWord = (length: number): string => {
    let res = '';
    for (let i = 0; i < length; i++) {
        res += letters[random(0, letters.length - 1)];
    }
    return res;
};

const getQuadrants = (numOfQudrants: number): DataQuadrant[] => {
    const quadrants = new Array<DataQuadrant>();
    for (let i = 0; i < numOfQudrants; i++) {
        quadrants.push({
            id: i,
            name: sectorNames[i],
            position: i,
        });
    }
    return quadrants;
};

const getRings = (numOfRings: number): DataRing[] => {
    const rings = new Array<DataRing>();
    for (let i = 0; i < numOfRings; i++) {
        rings.push({
            id: i,
            name: ringNames[i],
            position: i,
        });
    }
    return rings;
};

const getBlips = (numOfBlips: number): DataBlip[] => {
    const blips = new Array<DataBlip>();
    for (let i = 0; i < numOfBlips; i++) {
        blips.push({
            id: i,
            name: randomWord(random(3, 10)),
            description: randomWord(random(5, 50)),
            quadrantId: random(0, sectorNames.length - 1),
            ringId: random(0, ringNames.length - 1),
        });
    }
    return blips;
};

export const generateApiData = (numOfBlips: number): ApiData => {
    return {
        id: random(0, random(0, 10000)),
        name: randomWord(8),
        quadrants: getQuadrants(sectorNames.length),
        rings: getRings(ringNames.length),
        blips: getBlips(numOfBlips),
    };
};

export const generateData = (num: number): Blip[] => {
    const res = new Array<Blip>();
    for (let i = 0; i < num; i++) {
        res.push({
            id: random(1, 99),
            name: randomWord(10),
            ringName: ringNames[random(0, ringNames.length - 1)],
            sectorName: sectorNames[random(0, sectorNames.length - 1)],
            description: `bla bla bla #${random(1, 99)}`,
        });
    }
    return res;
};
