import { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';

import { setRadarName, setVersionName } from '../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';

interface Properties {
    name: string;
    version: string;
}

function isFormValues(values: unknown): values is Properties {
    return typeof values === 'object' && values !== null && 'name' in values && 'version' in values;
}

const SaveRadarFormObserver: FC = () => {
    const { values } = useFormikContext();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFormValues(values)) {
            dispatch(setRadarName(values.name));
            dispatch(setVersionName(values.version));
        }
    }, [values, dispatch]);

    return null;
};

export default SaveRadarFormObserver;
