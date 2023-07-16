import React from 'react';
import styles from './DocumentsCard.module.scss';
import { IDocument } from '../DocumentsComponent';
import SvgIcons from '../../../../svgs/SvgIcons';
import getDate from '../../../../../tools/get-date';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type DocumentsCard = Omit<IDocument, 'category'>;

const DocumentsCard: React.FC<DocumentsCard> = (document) => {
    return (
        <article className={styles.card}>
            <div>
                <h5 className={styles.cardTitle}>{document.title}</h5>
                <p className={styles.cardSubtitle}>По состоянию на {document.asOfDate}</p>
            </div>
            <div className={styles.cardBottom}>
                {document.mimeType === 'application/pdf' && (
                    <AnimatedIconButton
                        type={'link'}
                        variant='round'
                        outline={true}
                        color={'brick'}
                        direction='up'
                        href={`/public/documents/${document.fileUrl}`}
                        className={styles.pdfButton}
                    >
                        <SvgIcons id={'pdf'} />
                    </AnimatedIconButton>
                )}

                <p>
                    <span>{`${document.fileSize} МБ`}</span>
                    <span className={styles.cardDate}>{getDate(document.createdAt)}</span>
                </p>
            </div>
        </article>
    );
};

export default DocumentsCard;
