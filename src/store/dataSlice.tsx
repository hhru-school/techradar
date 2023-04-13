import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConstructorInputs = Array<{ label: string; id: string; name: string; type: string; autoComplete: string }>;

interface CounterState {
    value: number;
    techContructorInputs: ConstructorInputs;
    radarConstructorInputs: ConstructorInputs;
}

const initialState: CounterState = {
    value: 0,
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
            id: 'cercle-count',
            name: 'cercle-count',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Комментарий',
            id: 'name-cercle',
            name: 'name-cercle-1',
            type: 'text',
            autoComplete: 'off',
        },
    ],
    radarConstructorInputs: [
        {
            label: 'Название радара',
            id: 'name',
            name: 'name',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название квадранта 1',
            id: 'name-quadrant-1',
            name: 'name-quadrant-1',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название квадранта 2',
            id: 'name-quadrant-2',
            name: 'name-quadrant-2',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название квадранта 3',
            id: 'name-quadrant-3',
            name: 'name-quadrant-3',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название квадранта 4',
            id: 'name-quadrant-4',
            name: 'name-quadrant-4',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название кольца 1',
            id: 'name-cercle-1',
            name: 'name-cercle-1',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название кольца 2',
            id: 'name-cercle-2',
            name: 'name-cercle-2',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название кольца 3',
            id: 'name-cercle-3',
            name: 'name-cercle-3',
            type: 'text',
            autoComplete: 'off',
        },
        {
            label: 'Название кольца 4',
            id: 'name-cercle 4',
            name: 'name-cercle-4',
            type: 'text',
            autoComplete: 'off',
        },
    ],
};

export const counterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;