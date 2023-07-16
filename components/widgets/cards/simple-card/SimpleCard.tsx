import styles from './SimpleCard.module.scss';

export interface ISimpleCard extends React.ComponentProps<'div'> {
    theme: 'light' | 'outline-dark-grey' | 'brick' | 'outline-brick';
}

const SimpleCard: React.FC<ISimpleCard> = ({ theme, className, children, ...p }) => {
    const finalClassName = !!className ? `${styles[theme]} ${className}` : styles[theme];
    return (
        <div className={finalClassName} {...p}>
            {children}
        </div>
    );
};

export default SimpleCard;
