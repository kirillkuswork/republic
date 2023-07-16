import React, { useEffect, useState } from 'react';
import styles from './DocumentsComponent.module.scss';
import apiUrls from '../../../../constants/API';
import axios from 'axios';
import DocumentsCard from './documents-card/DocumentsCard';

export interface IDocument {
    title: string;
    _id: string;
    category: {
        title: string;
        _id: string;
    };
    asOfDate: string;
    fileUrl: string;
    mimeType: string;
    fileSize: string;
    createdAt: string;
}

interface IResult {
    title: string;
    id: string;
    documents: IDocument[];
}

//сортировка документов по категориям, на случай если их несколько
const sortDocuments = (documents: IDocument[]) => {
    const result: IResult[] = [];
    if (!documents) return result;
    documents.forEach((document) => {
        const { title } = document.category;
        const currentCategory = result.find((category) => category.title === title);

        if (currentCategory) {
            currentCategory.documents.push(document);
        } else {
            result.push({
                title,
                id: document.category._id,
                documents: [document],
            });
        }
    });

    return result;
};

const DocumentsComponent = () => {
    const [currentDocuments, setCurrentDocuments] = useState<IResult[] | null>(null);

    useEffect(() => {
        axios.get(apiUrls.urlDocuments).then((resp) => {
            const documents = resp.data;
            if (documents) {
                setCurrentDocuments(sortDocuments(documents));
            }
        });
    }, []);

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Документы</h1>
            <p className={styles.desc}>
                Проектная декларация на сайте{' '}
                <a
                    className={styles.descLink}
                    href='https://наш.дом.рф/сервисы/каталог-новостроек/объект/46687'
                    target='_blank'
                    rel='noreferrer'
                >
                    наш.дом.рф.
                </a>
            </p>

            <div className={styles.documents}>
                {!!currentDocuments &&
                    currentDocuments.length > 0 &&
                    currentDocuments.map((category) => (
                        //map по категориям
                        <div className={styles.documentsCategory} key={category.id}>
                            <h2 className={styles.visuallyHidden}>{category.title}</h2>

                            {category.documents.map((document) => (
                                //map по документам категории
                                <DocumentsCard key={document._id} {...document} />
                            ))}
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default DocumentsComponent;
