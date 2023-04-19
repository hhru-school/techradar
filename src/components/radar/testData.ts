import { Blip } from './types';

export const ringNames = ['Active', 'Test', 'Hold'];
export const sectorNames = [
    'Business Automation',
    'Trust & Cybersecurity',
    'Digital Business & Products',
    'Data-driven Intelligence',
];

const random = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
};

const letters = 'abcdefghijklmnopqrstuvwxyz';

const randomWord = (length: number): string => {
    let res = '';
    for (let i = 0; i < length; i++) {
        res += letters[random(0, 25)];
    }
    return res;
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
