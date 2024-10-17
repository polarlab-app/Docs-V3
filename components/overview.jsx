'use client';
import findDoc from '@/lib/findDoc';
import { useEffect, useState } from 'react';
import styles from '@/src/css/docs/overview.module.scss';
import Link from 'next/link';

export default function Overview({ params, theme }) {
	const [doc, setDoc] = useState(null);

	useEffect(() => {
		const fetchDocs = async () => {
			const res = await findDoc(params.docs.join('/'));
			if (res == 'none') window.location.href = '/';
			setDoc(await JSON.parse(res));
		};

		fetchDocs();
	}, [params.docs]);

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
		<div className={styles.container}>
			<div className={styles.slider}></div>
			<div className={styles.border}></div>
			<ul className={styles.list}>
				{doc &&
					extractSubheadings(doc.content).map((subheading, index) => (
						<li key={index} className={styles.item}>
							<Link className={styles.link} href={'#' + subheading.toLowerCase().replace(' ', '-')}>
								{subheading}
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
}
