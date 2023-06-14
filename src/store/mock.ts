import { Blip } from '../components/radar/types';

const defaultRingsNames = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
const defaultSectorNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const defaultRingNumber = 4;
const defaultSectorNumber = 4;

interface State {
    countRingInputs: number;
    countSectorInputs: number;
    showTechCreateModal: boolean;
    showRadarConstrTechModal: boolean;
    ringNames: string[];
    sectorNames: string[];
    blips: Blip[];
}

export const initialState: State = {
    showTechCreateModal: false,
    showRadarConstrTechModal: false,
    countRingInputs: defaultRingNumber,
    countSectorInputs: defaultSectorNumber,
    ringNames: defaultRingsNames.slice(0, defaultRingNumber),
    sectorNames: defaultSectorNames.slice(0, defaultSectorNumber),
    blips: [],
};
