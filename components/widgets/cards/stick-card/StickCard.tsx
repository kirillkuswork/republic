import styles from './StickCard.module.scss';

export interface IStickCard {
    children?: React.ReactNode;
}

const StickCard: React.FC<IStickCard> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default StickCard;
