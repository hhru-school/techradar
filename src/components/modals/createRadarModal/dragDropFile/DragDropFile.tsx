import { FC, useState, useRef, useCallback, DragEventHandler, ChangeEventHandler } from 'react';
import { Box, Typography, Button, Alert, SxProps } from '@mui/material';

import { UploadFileError, useCreateFromFileMutation } from '../../../../api/createRadarFromFileApi';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setCreateRadarModalOpen } from '../../../../store/myRadarsSlice';
import { styles } from '../CreateRadarModal';

import './DragDropFile.less';

// type FileData = {
//     lastModified: number;
//     lastModifiedDate: object;
//     name: string;
//     size: number;
//     type: string;
//     webkitRelativePath: string;
// };

const stylesDnd: Record<string, SxProps> = {
    warning: { width: '300px', margin: '10px auto' },
};

const DragDropFile: FC = () => {
    const dispatch = useAppDispatch();
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const [createFromFile, { isLoading }] = useCreateFromFileMutation();
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef(null);

    const onUploadHandler = useCallback(
        async (file: Blob) => {
            if (currentCompany) {
                const formdata = new FormData();
                formdata.append('file', file);
                await createFromFile({ formdata, companyId: currentCompany.id })
                    .unwrap()
                    .then(() => {
                        setError(null);
                        dispatch(setCreateRadarModalOpen(false));
                    })
                    .catch((e: UploadFileError) => {
                        setError(e.data.message);
                    });
            }
        },

        [createFromFile, currentCompany, dispatch]
    );

    const handleDrag: DragEventHandler<HTMLDivElement | HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
        async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                await onUploadHandler(e.dataTransfer.files[0]);
            }
        },
        [onUploadHandler]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        async (e) => {
            e.preventDefault();
            if (e.target.files && e.target.files[0]) {
                await onUploadHandler(e.target.files[0]);
            }
        },
        [onUploadHandler]
    );

    const onButtonClick = useCallback(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLButtonElement).click();
        }
    }, []);

    return (
        <>
            <form id="form-file-upload" onDragEnter={handleDrag}>
                <input ref={inputRef} type="file" id="input-file-upload" onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>
                    <Box>
                        <Typography>Перетащите свой файл (в формате .csv или .xlsx) сюда или</Typography>
                        <Button variant="contained" sx={styles.btn} onClick={onButtonClick} disabled={isLoading}>
                            Загрузите файл
                        </Button>
                        <Alert severity="warning" sx={stylesDnd.warning}>
                            Внимание! В файле формата .xlsx вкладки необходимо расположить последовательно от поздней
                            версии к ранней
                        </Alert>
                    </Box>
                </label>
                {dragActive && (
                    <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    ></div>
                )}
            </form>
            {error && <Alert severity="error">{error}</Alert>}
        </>
    );
};

export default DragDropFile;
