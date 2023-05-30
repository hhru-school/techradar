export const ringNames = ['Active', 'Test', 'Hold'];
export const sectorNames = [
    'Business Automation',
    'Trust & Cybersecurity',
    'Digital Business & Products',
    'Data-driven Intelligence',
];

export function getColorScheme(numOfSectors: number): string[] {
    const res: string[] = [];
    for (let i = 0; i < numOfSectors; i++) {
        res.push(getRandomColor());
    }
    return res;
}

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
