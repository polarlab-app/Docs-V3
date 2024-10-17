import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/themeProvider';
import Nav from '@/components/nav';
import Overview from '@/components/overview';

export async function generateMetadata({ params }) {
	return {
		title: `Polar Lab Docs | ${params.docs[0].charAt(0).toUpperCase() + params.docs[0].slice(1)} | 
			${params.docs[1].charAt(0).toUpperCase() + params.docs[1].slice(1)}
		  | ${params.docs[2].charAt(0).toUpperCase() + params.docs[2].slice(1)}`,
		description: '',
	};
}

export default async function PageLayout({ params, children }) {
	if (params.docs.length !== 3) {
		redirect('/');
	}

	return (
		<ThemeProvider>
			<Nav params={params} />
			{children}
			<Overview params={params} />
		</ThemeProvider>
	);
}
