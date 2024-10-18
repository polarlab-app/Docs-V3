'use server';
import { ThemeProvider } from '@/components/themeProvider';
import { ViewportProvider } from '@/components/viewportProvider';
import Nav from '@/components/nav';

export default async function ProjectLayout({ params, children }) {
    return (
        <ThemeProvider>
            <Nav project={params.project} />
            <ViewportProvider>{children}</ViewportProvider>
        </ThemeProvider>
    );
}
