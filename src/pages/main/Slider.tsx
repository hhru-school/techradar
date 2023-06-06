import { FC, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';

import styles from './slider.module.less';

const steps = [
    {
        label: 'Непрерывное отслеживание',
        description: 'Статус технологии в компании под постоянным наблюдением.',
    },
    {
        label: 'Единство подхода',
        description: 'Все технологии в одном месте.',
    },
    {
        label: 'Удобство и простота',
        description: 'Инструменты для создания собстевнного радара.',
    },
];

const Slider: FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.label}>{steps[activeStep].label}</h3>
            <div className={styles.description}>{steps[activeStep].description}</div>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    );
};

export default Slider;
