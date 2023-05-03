import { Blip } from '../components/radar/types';
import { GridRadarObj } from '../pages/admin/myRadars/myRadarsDataGrid/MyRadarsDataGrid';
import { GridTech } from '../pages/admin/myTechnologies/myTechDataGrid/MyTechDataGrid';
// import { GridRadarConstructor } from '../pages/admin/radarConstructor/radarConstructorGrid/RadarConstructorGrid';

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
    authentificationFormData: AuthFormInputs;
    techGrid: GridTech;
    radarGrid: GridRadarObj;
    // radarConstructorGrid: GridRadarConstructor;
    countRingInputs: number;
    countSectorInputs: number;
    showAuthentificationForm: boolean;
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
    authentificationFormData: { email: null, password: null },
    techGrid: [
        {
            id: 1,
            techName: 'babel',
            link: 'babel',
            relevantAt: '01.01.2023',
            lastVersion: '01.01.2023',
            comment: 'preset-env на уровне ES2018',
        },
        {
            id: 2,
            techName: 'Typescript',
            relevantAt: '01.05.2023',
            lastVersion: '01.05.2023',
            comment: 'Планируем внедрять, есть чемпионское направление.',
        },
        {
            id: 3,
            techName: 'Less',
            relevantAt: '01.05.2023',
            lastVersion: '01.05.2023',
            comment: 'Только без фанатизма и вложенных &, их сложнее грепать.',
        },
    ],
    // radarConstructorGrid: [
    //     {
    //         id: 1,
    //         techName: 'babel',
    //         ringName: 1,
    //         sector: 2,
    //     },
    //     {
    //         id: 2,
    //         techName: 'react',
    //         ringName: 3,
    //         sector: 4,
    //     },
    //     {
    //         id: 3,
    //         techName: 'JS',
    //         ringName: 2,
    //         sector: 4,
    //     },
    // ],
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
    showAuthentificationForm: false,
    showRadarsCreateModal: false,
    showTechCreateModal: false,
    showRadarConstrTechModal: false,
    countRingInputs: defaultRingNumber,
    countSectorInputs: defaultSectorNumber,
    ringNames: defaultRingsNames,
    sectorNames: defaultSectorNames,
    blips: [],
};
