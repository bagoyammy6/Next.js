import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export default function Home() {
  const t = useTranslations('common');

  return (
    <>
      <Link href="/" locale="tw">
        <button className="border border-white bg-slate-500 p-8 text-white">繁中</button>
      </Link>
      <Link href="/" locale="cn">
        <button className="border border-white bg-slate-500 p-8 text-white">簡中</button>
      </Link>
      <Link href="/" locale="en">
        <button className="border border-white bg-slate-500 p-8 text-white">英文</button>
      </Link>
      <div className="font bold mt-[80px] text-center">
        <h1>{t('company')}</h1>
      </div>
    </>
  );
}
