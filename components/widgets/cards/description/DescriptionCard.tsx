import styles from './DescriptionCard.module.scss';
import SvgIcons from '../../../svgs/SvgIcons';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

export interface IDescriptionCard {
    children?: React.ReactNode;
    link?: string;
    linkText?: string;
}

const DescriptionCard: React.FC<IDescriptionCard> = ({ children, link, linkText = 'O проекте' }) => {
    return (
        <div className={styles.card}>
            {children}{' '}
            {link && (
                <div className={styles.button}>
                    <AnimatedSimpleButton text={linkText} link={link} theme='light-grey-outline' withIcon>
                        <SvgIcons id='arrow right' />
                    </AnimatedSimpleButton>
                </div>
            )}
        </div>
    );
};

export default DescriptionCard;
