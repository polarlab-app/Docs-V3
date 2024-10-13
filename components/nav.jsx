'use client';
import findDocs from '@/lib/findDocs';
import { useEffect, useState } from 'react';
import styles from '@/src/css/docs/nav.module.scss';
import { useTheme } from './themeProvider';

export default function Nav() {
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
            <div className={styles.navHeader}>
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
                    <i className={`${styles.toggleIcon} icon-moon-stars ${theme == 'dark' ? styles.active : null}`}></i>
                    <i className={`${styles.toggleIcon} icon-sun ${theme == 'light' ? styles.active : null}`}></i>
                </div>
            </div>
        </nav>
    );
}
