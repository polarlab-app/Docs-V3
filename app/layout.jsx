import '@/src/css/global/global.scss';
import '@/src/css/global/icons.css';
import { ThemeProvider } from '@/components/themeProvider';

export default async function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className='body' id='body'>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
