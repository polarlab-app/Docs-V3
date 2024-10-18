'use client';
import findDoc from '@/lib/findDoc';
import { useEffect, useState } from 'react';
import styles from '@/src/css/docs/overview.module.scss';
import Link from 'next/link';
import { useViewport } from './viewportProvider';
import { useTheme } from './themeProvider';

export default function Overview({ params }) {
    const [doc, setDoc] = useState(null);
    const { currentView } = useViewport();
    const { theme } = useTheme();

    useEffect(() => {
        const fetchDocs = async () => {
            const res = await findDoc(params);
            if (res == 'none') window.location.href = '/';
            setDoc(await JSON.parse(res));
        };

        fetchDocs();
    }, [params]);

    const extractSubheadings = (content) => {
        const pattern = /&h2;(.*?)&\/h2;/g;
        const matches = [];
        let match;
        while ((match = pattern.exec(content)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    };

    return (
        <div className={`${styles.container} ${styles[theme]}`}>
            <p className={styles.title}>
                <i className={`icon-align-left ${styles.icon}`}></i>Page Content
            </p>
            <div className={styles.list}>
                <div
                    className={styles.slider}
                    style={{
                        top: doc
                            ? `calc( ${
                                  extractSubheadings(doc.content).findIndex(
                                      (subheading) => subheading.toLowerCase().replace(' ', '-') === currentView
                                  ) * 30
                              }px)`
                            : '98px',
                    }}
                ></div>
                <div className={styles.border}></div>
                {doc &&
                    extractSubheadings(doc.content).map((subheading, index) => {
                        const id = subheading.toLowerCase().replace(' ', '-');
                        const isActive = id == currentView;
                        return (
                            <div key={index} className={`${styles.item} ${isActive ? styles.active : null}`}>
                                <Link className={styles.link} href={'#' + subheading.toLowerCase().replace(' ', '-')}>
                                    {subheading}
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
