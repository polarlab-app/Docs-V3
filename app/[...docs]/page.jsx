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
			} else if (elementType == 'h2') {
				elements.push(<h2 className={styles.subheading}>{innerContent}</h2>);
			} else if (elementType == 'h2d') {
				elements.push(<hr className={styles.subheadingDivider}></hr>);
			} else if (elementType == 'ul') {
				const listItems = innerContent.split(':').map((item, index) => (
					<li className={styles.listItem} key={index}>
						{item}
					</li>
				));
				elements.push(<ul className={styles.list}>{listItems}</ul>);
			}
		}

		return elements.length > 0 ? elements : content;
	};

	return <div className={styles.container}>{document ? parseContent(document.content[0]) : null}</div>;
}
