import React, { useRef } from 'react';
import { Slide } from 'transitions-kit';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import styles from './TeamCard.module.scss';

interface ITeamCard {
    description: string;
    logo: string;
    name: string;
    opened: boolean;
    onClick: () => void;
}
const TeamCard: React.FC<ITeamCard> = ({ description, logo, name, opened, onClick }) => {
    const refElem = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.block} ref={refElem}>
            {opened && (
                <>
                    <Slide in={true} direction='up' container={refElem.current}>
                        <p className={styles.description}>{description}</p>
                    </Slide>
                    <div className={styles.lowerBlockOpen}>
                        <AnimatedIconButton
                            type={'button'}
                            variant={'round'}
                            outline={false}
                            color={'brick'}
                            direction='up'
                            onClick={onClick}
                        >
                            <SvgIcons id={'close'} />
                        </AnimatedIconButton>
                    </div>
                </>
            )}

            {!opened && (
                <>
                    <div className={styles.logo}>
                        <div className={styles.logo_wrapper}>
                            <SvgIcons id={`${logo} team`} />
                        </div>
                    </div>
                    <div className={styles.lowerBlock}>
                        <p className={styles.name}>{name}</p>
                        <AnimatedIconButton
                            type={'button'}
                            variant={'round'}
                            outline={false}
                            color={'grey'}
                            direction='down'
                            onClick={onClick}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default TeamCard;
