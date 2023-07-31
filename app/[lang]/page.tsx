import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen flex-col justify-around">
      <div className="flex items-center justify-around">
        <Link href="/en-US" as="/en-US">
          <button className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center border-[2px] border-solid border-slate-950 bg-[#fff]">
            <h1 className="text-bol text-5xl font-bold">英文</h1>
          </button>
        </Link>
        <Link href="/zh-TW" as="/zh-TW">
          <button className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center border-[2px] border-solid border-slate-950 bg-[#fff]">
            <h1 className="text-bol text-5xl font-bold">繁中</h1>
          </button>
        </Link>
        <Link href="/zh-CN" as="/zh-CN">
          <button className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center border-[2px] border-solid border-slate-950 bg-[#fff]">
            <h1 className="text-bol text-5xl font-bold">簡中</h1>
          </button>
        </Link>
      </div>
      <div className="text-center text-5xl font-bold">
        {t('common:company')}
        <br />
        <br />
        {t('index:banner')}
      </div>
    </div>
  );
}
