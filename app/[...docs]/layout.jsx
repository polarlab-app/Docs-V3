import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/themeProvider';
import Nav from '@/components/nav';

export async function generateMetadata({ params }) {
    return {
        title: `Polar Lab Docs | ${params.docs[0]} | ${params.docs[1]} | ${params.docs[2]}`,
        description: '',
    };
}

export default async function PageLayout({ params, children }) {
    if (params.docs.length !== 3) {
        redirect('/');
    }

    return (
        <ThemeProvider>
            <Nav />
            {children}
        </ThemeProvider>
    );
}
