import { Blip } from '../components/radar/types';

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
    showRadarsCreateModal: false,
    showTechCreateModal: false,
    showRadarConstrTechModal: false,
    countRingInputs: defaultRingNumber,
    countSectorInputs: defaultSectorNumber,
    ringNames: defaultRingsNames.slice(0, defaultRingNumber),
    sectorNames: defaultSectorNames.slice(0, defaultSectorNumber),
    blips: [],
};
