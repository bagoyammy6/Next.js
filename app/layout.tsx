import './globals.css';
import type { Metadata } from 'next';
import GoogleAnalytics from './[lang]/components/GoogleAnalytics';
import CookieBanner from './[lang]/components/Cookiebanner';
import useTranslation from 'next-translate/useTranslation';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useTranslation();

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="./images/favicon.ico" sizes="any" />
      </head>
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <body className="bg-yellow-100">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
