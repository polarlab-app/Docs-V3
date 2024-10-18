'use client';
import findDocs from '@/lib/findDocs';
import { useEffect, useState } from 'react';
import styles from '@/src/css/docs/nav.module.scss';
import { useTheme } from './themeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav({ project }) {
    const params = usePathname();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState([]);
    const [sortedDocs, setSortedDocs] = useState({});
    const [activeDoc, setActiveDoc] = useState(params.slice(1));

    useEffect(() => {
        setActiveDoc(params.slice(1));
    }, [params]);

    useEffect(() => {
        const fetchDocs = async () => {
            const res = await findDocs(project + '/');
            if (res == 'none') window.location.href = '/';
            const parsedDocs = await JSON.parse(res);

            function sortDocs(docs) {
                return docs.reduce((acc, doc) => {
                    const pathParts = doc.path.split('/');
                    const category = pathParts[1] || 'Uncategorized';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(doc);
                    return acc;
                }, {});
            }
            setSortedDocs(sortDocs(parsedDocs));
        };

        fetchDocs();
    }, [theme]);

    if (!docs) {
        return 'Loading...';
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.header}>
                <h1 className={styles.heading}>{params.docs[1].toUpperCase()}</h1>
                <hr className={styles.headerDivider}></hr>
                <p className={styles.category}>Docs</p>
                <div
                    className={styles.toggle}
                    onClick={() => {
                        if (theme == 'dark') {
                            setTheme('light');
                        } else {
                            setTheme('dark');
                        }
                    }}
                >
                    <i className={`${styles.toggleIcon} icon-moon ${theme == 'dark' ? styles.active : null}`}></i>
                    <i
                        className={`${styles.toggleIcon} icon-brightness ${theme == 'light' ? styles.active : null}`}
                    ></i>
                </div>
            </div>
            <div className={styles.search}>
                <input type='string' className={styles.searchInput} placeholder='Search Docs...'></input>
            </div>
            <div className={styles.linksWrapper}>
                {Object.entries(sortedDocs).map(([category, docs]) => (
                    <div
                        key={category}
                        className={`${styles.linksContainer} ${open.includes(category) ? styles.active : null}`}
                    >
                        <div
                            className={styles.mainLink}
                            onClick={() => {
                                if (open.includes(category)) {
                                    setOpen(open.filter((item) => item !== category));
                                } else {
                                    setOpen([...open, category]);
                                }
                            }}
                        >
                            <p className={styles.mainLinkText}>{category}</p>
                            <i className={`${styles.linkIcon} icon-angle-up`}></i>
                        </div>
                        <ul className={styles.links}>
                            {docs.map((doc, index) => (
                                <Link
                                    key={index}
                                    className={`${styles.link} ${activeDoc == doc.path ? styles.active : null}`}
                                    href={`/${doc.path}`}
                                >
                                    <i className={`${styles.linkIcon} icon-moon`}></i>
                                    <p className={styles.linkText}>{doc.path.split('/')[2]}</p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className={styles.support}>
                <div className={styles.supportLink}>
                    <i className={`${styles.linkIcon} icon-moon`}></i>
                    <p className={styles.linkText}>Sign up</p>
                </div>
                <div className={styles.supportLink}>
                    <i className={`${styles.linkIcon} icon-envelope`}></i>
                    <p className={styles.linkText}>Contact Us</p>
                </div>
            </div>
        </nav>
    );
}
