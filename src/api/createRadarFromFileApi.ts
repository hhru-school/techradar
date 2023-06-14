import { apiSlice } from './authApi';

export interface UploadFileError {
    status: number;
    data: { message: string; status: string; timestamp: string; type: string };
}

export interface UploadFileResponse {
    radarId: number;
}

export interface UploadFileRequest {
    companyId: number;
    formdata: FormData;
}

export const createRadarFromFileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFromFile: builder.mutation<UploadFileResponse, UploadFileRequest>({
            query: ({ formdata, companyId }) => ({
                url: `/file-radars/upload?company-id=${companyId}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: ['Radar'],
        }),
    }),
});

export const { useCreateFromFileMutation } = createRadarFromFileApi;
