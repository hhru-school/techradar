import { FC, useState, useRef, useCallback, DragEventHandler, ChangeEventHandler } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

import { UploadFileResponse, useCreateFromFileMutation } from '../../../../api/createRadarFromFileApi';
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

const DragDropFile: FC = () => {
    const [createFromFile, { isLoading }] = useCreateFromFileMutation();
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onUploadHandler = useCallback(
        async (file: Blob) => {
            const formdata = new FormData();
            formdata.append('file', file);
            await createFromFile(formdata)
                .unwrap()
                .then((res: UploadFileResponse) => {
                    setError(null);
                    setMessage(res.data.message);
                })
                .catch((e: UploadFileResponse) => setError(e.data.message));
        },
        [createFromFile]
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
                        <Typography>Перетащите свой файл (в формате .csv или .xls) сюда или</Typography>
                        <Button variant="contained" sx={styles.btn} onClick={onButtonClick} disabled={isLoading}>
                            Загрузите файл
                        </Button>
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
            {message && <Alert severity="warning">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
        </>
    );
};

export default DragDropFile;
