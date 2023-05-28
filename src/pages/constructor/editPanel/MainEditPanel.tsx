import { FC, useCallback } from 'react';
import { Button } from '@mui/material';

import { ConstructorMode, setShowSaveRadarDialog, setShowSwitchReleaseModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import EditCredetialContainer from '../editPanel/EditCredetionalContainer';
import VersionStatusContainer from './VersionStatusContainer';

import styles from './mainEditPanel.module.less';

type Props = {
    mode: ConstructorMode;
};

const MainEditPanel: FC<Props> = ({ mode }) => {
    const dispatch = useAppDispatch();

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const name = useAppSelector((state) => state.editRadar.radar.name);
    const currentVersionName = useAppSelector((state) => state.editRadar.currentVersionName);
    const version = useAppSelector((state) => state.editRadar.version);

    const saveBtnClickHandler = () => {
        dispatch(setShowSaveRadarDialog(true));
    };

    const isReleased = !isNewRadar && version?.release;
    const isDraft = !isNewRadar && !version?.release;

    const clickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(true));
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <EditCredetialContainer label={'Название радара'} value={name} />
            <EditCredetialContainer label={'Версия'} value={currentVersionName} />

            <div className={styles.spacer}></div>

            {!isNewRadar && version && <VersionStatusContainer release={version?.release} />}
            {isNewRadar && (
                <Button variant="contained" color="primary" onClick={saveBtnClickHandler}>
                    Сохранить
                </Button>
            )}
            {isReleased && (
                <Button variant="contained" color="error" onClick={clickHandler}>
                    Unpublish
                </Button>
            )}
            {isDraft && (
                <Button variant="contained" color="success" onClick={clickHandler}>
                    Опубликовать
                </Button>
            )}
        </div>
    );
};

export default MainEditPanel;
