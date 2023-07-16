import React, { useEffect } from 'react';
import styles from '../Breadcrumbs.module.scss';
import Link from 'next/link';

interface ICrumb {
    text: string;
    textGenerator: string;
    href: string;
    last: boolean;
}

const Crumb: React.FC<ICrumb> = ({ text: defaultText, textGenerator, href, last = false }) => {
    const [text, setText] = React.useState(defaultText);

    useEffect(() => {
        // If `textGenerator` is nonexistent, then don't do anything
        if (!Boolean(textGenerator)) {
            return;
        }
        // Run the text generator and set the text again
        const finalText = textGenerator;
        setText(finalText);
    }, [textGenerator]);

    if (text === '') {
        return null;
    }

    if (last) {
        return <p className={styles.LinkLast}>{text}</p>;
    }

    return (
        <p>
            <Link className={styles.Link} href={href}>
                {text}
            </Link>
            /
        </p>
    );
};

export default Crumb;
