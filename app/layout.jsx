import '@/src/css/global/icons.css';

export default async function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className='body' id='body'>
                {children}
            </body>
        </html>
    );
}
