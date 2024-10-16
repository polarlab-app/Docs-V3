'use client';
import { useTheme } from '@/components/themeProvider';
import { useState, useEffect } from 'react';
import findDoc from '@/lib/findDoc';
import styles from '@/src/css/docs/doc.module.scss';

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

	const parseContent = (content) => {
		const regex = /&(\w+);(.*?)&\/\1;/g;
		let match;
		const elements = [];

		while ((match = regex.exec(content)) !== null) {
			const [, elementType, innerContent] = match;

			if (elementType === 'h1') {
				elements.push(<h1 className={styles.heading}>{innerContent}</h1>);
			} else if (elementType === 'h1d') {
				elements.push(<hr className={styles.headingDivider}></hr>);
			} else if (elementType === 'p') {
				elements.push(<p className={styles.text}>{innerContent}</p>);
			}
		}

		return elements.length > 0 ? elements : content; // Return elements or original content if no match
	};

	return <div className={styles.container}>{document ? parseContent(document.content[0]) : null}</div>;
}
