import { Blip } from '../components/radar/types';
import { GridRadarObj } from '../pages/admin/myRadars/myRadarsDataGrid/MyRadarsDataGrid';

type Input = { label: string; id: string; name: string; type: string; autoComplete: string };

type ConstructorInputs = Array<Input>;

const defaultRingsNames = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
const defaultSectorNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const defaultRingNumber = 4;
const defaultSectorNumber = 4;

export interface AuthFormInputs {
    email: string | null;
    password: string | null;
}

interface State {
    techContructorInputs: ConstructorInputs;
    radarGrid: GridRadarObj;
    // radarConstructorGrid: GridRadarConstructor;
    countRingInputs: number;
    countSectorInputs: number;
    showRadarsCreateModal: boolean;
    showTechCreateModal: boolean;
    showRadarConstrTechModal: boolean;
    ringNames: string[];
    sectorNames: string[];
    blips: Blip[];
}

export const initialState: State = {
    techContructorInputs: [
        {
            label: 'Название',
            id: 'name',
            name: 'name',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Ссылка на доку',
            id: 'name-quadrant-1',
            name: 'name-quadrant-1',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Где применяется?',
            id: 'name-quadrant-3',
            name: 'name-quadrant-3',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Преимущества',
            id: 'name-quadrant-4',
            name: 'name-quadrant-4',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Недостатки',
            id: 'Circle-count',
            name: 'Circle-count',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Комментарий',
            id: 'name-Circle',
            name: 'name-Circle-1',
            type: 'text',
            autoComplete: 'off',
        },
    ],
    radarGrid: {
        android: [
            {
                id: 1,
                radarName: '2023Q1',
                link: 'android-radar',
                relevantAt: '01.01.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
            {
                id: 2,
                radarName: '2023Q2',
                relevantAt: '01.05.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        backend: [
            {
                id: 1,
                radarName: '2023Q4',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        data: [
            {
                id: 1,
                radarName: '2023',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        frontend: [
            {
                id: 1,
                radarName: '2023',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        ios: [
            {
                id: 1,
                radarName: '2023',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        qa: [
            {
                id: 1,
                radarName: '2023',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
        datawarehouse: [
            {
                id: 1,
                radarName: '2023',
                relevantAt: '01.04.2023',
                lastUpdate: '16 апреля 2023 20:55',
                status: 'Опубликовано',
            },
        ],
    },
    showRadarsCreateModal: false,
    showTechCreateModal: false,
    showRadarConstrTechModal: false,
    countRingInputs: defaultRingNumber,
    countSectorInputs: defaultSectorNumber,
    ringNames: defaultRingsNames.slice(0, defaultRingNumber),
    sectorNames: defaultSectorNames.slice(0, defaultSectorNumber),
    blips: [],
};
