import "./globals.css";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

export const metadata = {
  title: "禾一精機股份有限公司",
  description: "禾一精機股份有限公司是一家專注於精密機械加工的企業。",
  keywords: "精密機械加工, 機械零件, 解決方案, 客製化, 原型製作, 批量生產",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
