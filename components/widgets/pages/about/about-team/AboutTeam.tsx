import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TeamCard from '../team-card/TeamCard';
import Slider from '../../../slider/Slider';
import { useAppSelector } from '../../../../../hook';
import styles from './AboutTeam.module.scss';

interface IAboutTeam {}

const teamInfo = [
    {
        id: 'forma',
        logo: 'forma',
        name: 'Девелопер',
        description:
            'Forma создает дома и районы бизнес и премиум-класса, соответствующие духу и истории места. Используя методики дизайн-мышления, Forma изучает потребности людей в городском контексте – и предлагает в ответ функциональные дизайнерские и технологические решения, эстетически безупречную архитектуру, востребованные жителями опции и возможности.',
    },
    {
        id: 'tsentsiper',
        logo: 'tsentsiper',
        name: 'Концепция общественной жизни',
        description:
            'С 2014 года консалтинговая компания «Ценципер» занимается сервисным дизайном и проектированием потребительского опыта, созданием новых продуктов и брендов в России и за рубежом.',
    },
    {
        id: 'gillespies',
        logo: 'gillespies',
        name: 'Благоустройство',
        description:
            'Репутация бюро ландшафтной архитектуры Gillespies, основанного в 1962 в Глазго, опирается на высококлассный дизайн и умение создавать среду, которая точно транслирует дух места, повышает благополучие жителей и вдохновляет на жизнь, работу и отдых.',
    },
    {
        id: 'meganom',
        logo: 'meganom',
        name: 'Концепция архитектурного парка',
        description:
            'Бюро «Меганом» специализируется на архитектуре и градостроительстве, уделяя при этом много внимания прикладным и теоретическим исследованиям. С 1998 года «Меганом» помогает российской архитектуре сохранить традиционный смысл общественного служения и роль ключевого общественного института.',
    },
];

const AboutTeam: React.FC<IAboutTeam> = () => {
    const { mobile } = useAppSelector((state) => state.main.breakpoint);
    const width = useAppSelector((state) => state.main.width);
    const [teamCardState, setTeamCardState] = useState<{ [key: string]: boolean }>({});
    const titleRef = useRef<HTMLElement | null>(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.4 });

    const onClickTeamCard = (id: string) => {
        setTeamCardState({ ...teamCardState, [id]: !teamCardState[id] });
    };

    return (
        <div className={styles.team}>
            <motion.section ref={titleRef} className={styles.titleBlock}>
                <motion.div
                    className={`${styles.title} ${styles.text1}`}
                    style={{ transform: isTitleInView ? 'none' : 'translateX(-500px)' }}
                >
                    Команда
                </motion.div>
                <motion.div
                    className={`${styles.title} ${styles.text2}`}
                    style={{ transform: isTitleInView ? 'none' : 'translateX(500px)' }}
                >
                    проекта
                </motion.div>
            </motion.section>
            <div className={styles.container}>
                {teamInfo.map((team) => (
                    <TeamCard
                        key={team.id}
                        description={team.description}
                        logo={team.logo}
                        name={team.name}
                        opened={teamCardState[team.id]}
                        onClick={() => onClickTeamCard(team.id)}
                    />
                ))}
            </div>
            <div className={styles.slider}>
                <Slider
                    size='default'
                    arrow={true}
                    isLoop={true}
                    slideWidth={width > mobile ? '33.9vw' : '68.5vw'}
                    uniqueKey='team'
                    firstSlide={0}
					navigationColor='dark-grey-brick'
                >
                    {teamInfo.map((team) => (
                        <TeamCard
                            key={team.id}
                            description={team.description}
                            logo={team.logo}
                            name={team.name}
                            opened={teamCardState[team.id]}
                            onClick={() => onClickTeamCard(team.id)}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default AboutTeam;
