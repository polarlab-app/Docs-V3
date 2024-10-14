'use client';
import findDocs from '@/lib/findDocs';
import { useEffect, useState } from 'react';
import styles from '@/src/css/docs/nav.module.scss';
import { useTheme } from './themeProvider';

export default function Nav({ params }) {
    const [docs, setDocs] = useState(null);
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const res = await findDocs('components');
            if (res == 'none') window.location.href = '/';
            setDocs(await JSON.parse(res));
        };

        fetchDocs();
    }, []);

    if (!docs) {
        return 'Loading...';
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Polar Lab</h1>
                <p className={styles.category}>{params.docs[0].toUpperCase()}</p>
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
                <div className={`${styles.linksContainer} ${open.includes('link') ? styles.active : null}`}>
                    <div
                        className={styles.mainLink}
                        onClick={() => {
                            if (open.includes('link')) {
                                setOpen(open.filter((item) => item !== 'link'));
                            } else {
                                setOpen([...open, 'link']);
                            }
                        }}
                    >
                        <p className={styles.mainLinkText}>Terms of Service</p>
                        <i className={`${styles.linkIcon} icon-moon`}></i>
                    </div>
                    <ul className={styles.links}>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                    </ul>
                </div>
                <div className={`${styles.linksContainer} ${open.includes('link2') ? styles.active : null}`}>
                    <div
                        className={styles.mainLink}
                        onClick={() => {
                            if (open.includes('link2')) {
                                setOpen(open.filter((item) => item !== 'link2'));
                            } else {
                                setOpen([...open, 'link2']);
                            }
                        }}
                    >
                        <p className={styles.mainLinkText}>Terms of Service</p>
                        <i className={`${styles.linkIcon} icon-moon`}></i>
                    </div>
                    <ul className={styles.links}>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                        <li className={styles.link}>
                            <i className={`${styles.linkIcon} icon-moon`}></i>
                            <p className={styles.linkText}>Terms of Service</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.support}>
                <div className={styles.supportLink}>
                    <i className={`${styles.linkIcon} icon-moon`}></i>
                    <p className={styles.linkText}>Sign up</p>
                </div>
                <div className={styles.supportLink}>
                    <i className={`${styles.linkIcon} icon-moon`}></i>
                    <p className={styles.linkText}>Contact Us</p>
                </div>
            </div>
        </nav>
    );
}
