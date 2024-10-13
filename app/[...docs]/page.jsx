'use client';
import { useTheme } from '@/components/themeProvider';
import { useState, useEffect } from 'react';
import findDoc from '@/lib/findDoc';

export default function Page({ params }) {
    const { theme } = useTheme();
    const [document, setDocument] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            const res = await findDoc(params.docs.join('/'));
            if (res == 'none') window.location.href = '/';
            setDocument(await JSON.parse(res));
        };

        fetchDocument();
    }, [theme]);

    if (!document) {
        return 'Loading...';
    }

    return JSON.stringify(document);
}
