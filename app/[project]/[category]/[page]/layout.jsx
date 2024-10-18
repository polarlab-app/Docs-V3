import { ViewportProvider } from '@/components/viewportProvider';
import Overview from '@/components/overview';

export async function generateMetadata({ params }) {
    return {
        title: `Polar Lab Docs | ${params.project.charAt(0).toUpperCase() + params.project.slice(1)} | 
			${params.category.charAt(0).toUpperCase() + params.category.slice(1)}
		  | ${params.page.charAt(0).toUpperCase() + params.page.slice(1)}`,
        description: '',
    };
}

export default async function PageLayout({ children, params }) {
    return (
        <ViewportProvider>
            {children}
            <Overview params={[params.project, params.category, params.page].join('/')}></Overview>
        </ViewportProvider>
    );
}
