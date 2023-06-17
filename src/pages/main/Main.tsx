import { FC, useCallback } from 'react';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Link,
    SxProps,
    Typography,
} from '@mui/material';

import { setAuthFormOpen } from '../../store/authSlice/authSlice';
import { useAppDispatch } from '../../store/hooks';
import bachPic from './img/tech.png';

import styles from './main.module.less';

const style: Record<string, SxProps> = {
    title: { margin: '20px 0 0 0', fontWeight: '800' },
    madeBy: { margin: '2px 0 0 0' },
    link: { fontWeight: '600' },
    bgIMG: {
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bachPic}) no-repeat center center fixed`,
        padding: '30px 0 30px 0',
        marginTop: '30px',
    },
    boxHowUse: { display: 'flex', flexDirection: 'column', padding: '30px 0' },
    howUse: { marginBottom: '15px' },
    imgRadar: { display: 'flex', justifyContent: 'space-between', padding: '50px 0' },
    try: { maxWidth: '500px' },
};

const imgSrc = 'https://raw.githubusercontent.com/hhru-school/techradar/readme-asset/radarView.JPG';

const Main: FC = () => {
    const dispatch = useAppDispatch();

    const handleAuthFormOpen = useCallback(() => dispatch(setAuthFormOpen(true)), [dispatch]);

    return (
        <Box>
            <Typography variant="h2" component="h1" align="center" sx={style.title}>
                TechRadar
            </Typography>
            <Typography variant="body2" align="center" sx={style.madeBy}>
                made by{' '}
                <Link href="https://school.hh.ru/" variant="body2" underline="hover" sx={style.link}>
                    HH школа программистов
                </Link>
            </Typography>
            <Box sx={style.bgIMG}>
                <Container maxWidth="xl">
                    <Typography variant="h4" align="center" color={'secondary'}>
                        Сервис позволяющий оценить уровень адаптации технологии в&nbsp;Вашей компании. С&nbsp;помощью
                        радара можно выявить технологические тренды, которые могут повлиять
                        на&nbsp;конкурентоспособность компании и&nbsp;определить потенциальные возможности для
                        ее&nbsp;развития.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={style.imgRadar}>
                        {/* МЕСТО ДЛЯ ДЕМОНСТРАТИВНОГО РАДАРА ДЛЯ ПОТЫКАТЬ */}
                        <img className={styles.img} src={imgSrc}></img>
                    </Box>
                    <Typography paragraph={true} variant="h5" sx={style.try}>
                        <Button variant="contained" color="secondary" onClick={handleAuthFormOpen}>
                            Попробуйте
                        </Button>{' '}
                        создать свой радар с&nbsp;нуля в&nbsp;конструкторе или добавьте готовый в&nbsp;формате файла
                        .xlsx или .csv
                    </Typography>
                </Box>
            </Container>
            <Divider />
            <Container maxWidth="xl">
                <Box sx={style.boxHowUse}>
                    <Typography variant="h4" component="h1" sx={style.howUse} align={'center'}>
                        Как пользоваться?
                    </Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h5">Как читать информацию с радара?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Кольца в круге от центра до периферии означают статус использования технологии в
                                продукте: в центре — самые эффективные, на периферии — наименее эффективные. 'Куски
                                пирога' - технологий, инструментов, платформ, языков и фреймворков.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant="h5">Что нужно сделать в первую очередь?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Необходимо провести опрос среди разработчиков и&nbsp;собрать список потенциально
                                интересных технологий, которыми они в&nbsp;настоящее время пользуются. На&nbsp;этом
                                этапе достаточно просто составить список &laquo;как есть&raquo; без сортировки.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant="h5">Классификация технологий по категориям</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph={true}>
                                Область применения определяет, где конкретно используется каждая технология. Например,
                                для backend-разработчика это может быть инфраструктура, базы данных, шины данных, языки
                                программирования и&nbsp;фреймворки, протоколы и&nbsp;утилиты.
                            </Typography>
                            <Typography paragraph={true}>
                                Степень внедрения определяет, насколько близка технология к&nbsp;применению
                                в&nbsp;продукте. Всего существуют четыре уровня:
                            </Typography>
                            <ul>
                                <li>
                                    <Typography paragraph={true}>
                                        Adopt (Принято)&nbsp;&mdash; когда мы&nbsp;полностью уверены в&nbsp;данной
                                        технологии, умеем с&nbsp;ней работать и смело применяем
                                        ее&nbsp;в&nbsp;продукции. Это&nbsp;то, что точно будет успешным.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Trial (Испытание) &mdash; эффективные технологии. У&nbsp;них уже есть минимально
                                        жизнеспособный продукт (MVP), некоторые из&nbsp;них уже применяются
                                        в&nbsp;продукции. Они не&nbsp;несут большой нагрузки и&nbsp;не являются
                                        критическими для бизнеса проектами. Но&nbsp;они существуют, функционируют
                                        и&nbsp;в принципе могут быть отнесены к&nbsp;нашим технологиям.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Assess (Оценка)&nbsp;&mdash; эта технология вызывает наше интерес.
                                        Мы&nbsp;проводим исследования и&nbsp;возможно пробуем
                                        ее&nbsp;в&nbsp;пет-проектах. Но мы&nbsp;не&nbsp;рекомендуем внедрять
                                        ее&nbsp;в&nbsp;продукцию ни&nbsp;в&nbsp;коем случае.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Hold (Устаревшее)&nbsp;&mdash; это технологии, которые мы&nbsp;использовали
                                        ранее, но&nbsp;уже от&nbsp;них отошли. Они считаются устаревшими (legacy).
                                        Возможно, это старый язык программирования, который мы поддерживаем,
                                        но&nbsp;не&nbsp;используем для новых разработок. Не&nbsp;рекомендуется
                                        использовать эти технологии в&nbsp;продукции ни&nbsp;при каких обстоятельствах.
                                    </Typography>
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant="h5">Поддержка актуальности радара</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph={true}>
                                Если мы&nbsp;прекратим следить за&nbsp;обновлением технологического радара, возникнут
                                проблемы:
                            </Typography>
                            <ul>
                                <li>
                                    <Typography paragraph={true}>
                                        Неправильный выбор инструментов. Разработчики будут использовать микроскоп
                                        вместо молотка для забивания гвоздей. И&nbsp;у&nbsp;них будет основание для
                                        этого, так как они руководствуются технологическим радаром.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Наличие устаревших элементов для поддержки. Мы&nbsp;решим отказаться от
                                        использования MySQL, но&nbsp;не&nbsp;отметили этого в&nbsp;технологическом
                                        радаре. И&nbsp;разработчики будут продолжать использовать MySQL, что приведет
                                        к&nbsp;внедрению того, от&nbsp;чего хотели избавиться.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Устаревшие знания у&nbsp;сотрудников. Сотрудники будут использовать
                                        и&nbsp;учиться тому, что уже не&nbsp;является интересным для компании. Снова,
                                        это происходит из-за информации в технологическом радаре.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography paragraph={true}>
                                        Главное&nbsp;&mdash; потеря доверия. Если мы&nbsp;ввели процесс и&nbsp;забросили
                                        его, это является сигналом о&nbsp;разрушении процессов в&nbsp;компании.
                                    </Typography>
                                </li>
                            </ul>
                            <Typography paragraph={true}>
                                Поэтому технологический радар&nbsp;&mdash; это процесс. Он&nbsp;не&nbsp;является просто
                                картинкой, на&nbsp;которой нужно щелкать и&nbsp;наблюдать, как символы появляются.
                                Технологический радар определяет инструменты, и&nbsp;как любой процесс, он&nbsp;требует
                                действий. Радар должен быть интегрирован в рабочие процессы. Не&nbsp;нужно собираться
                                каждую среду для обзора радара. С&nbsp;вероятностью&nbsp;90% через месяц эти встречи
                                будут отменены. Нельзя забрасывать рабочие процессы, поэтому радар должен быть встроен
                                в&nbsp;них. Необходимо назначить ответственных за&nbsp;технологический радар.
                                Технологический радар, подобно любому продукту, требует развития. Без развития он станет
                                бесполезным. Зачем компании мертвое изображение радара?
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Container>
        </Box>
    );
};

export default Main;
