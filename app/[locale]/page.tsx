import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export default function Home() {
  const t = useTranslations('common');

  return (
    <>
      <Link href="/" locale="tw">
        <button className="p-8 bg-slate-500 text-white border border-white">繁中</button>
      </Link>
      <Link href="/" locale="cn">
        <button className="p-8 bg-slate-500 text-white border border-white">簡中</button>
      </Link>
      <Link href="/" locale="en">
        <button className="p-8 bg-slate-500 text-white border border-white">英文</button>
      </Link>
      <div className="font bold text-center mt-[80px]">
        <h1>{t('company')}</h1>
      </div>
    </>
  );
}
