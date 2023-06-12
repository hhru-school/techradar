import { apiSlice } from './authApi';

export interface UploadFileResponse {
    status: number;
    data: { message: string; status: string; timestamp: string; type: string };
}

export const createRadarFromFileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFromFile: builder.mutation<UploadFileResponse, FormData>({
            query: (formdata) => ({
                url: `/file-radars/upload?company-id=1`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: ['CreateRadarByFile'],
        }),
    }),
});

export const { useCreateFromFileMutation } = createRadarFromFileApi;
