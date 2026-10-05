"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useLang} from '@/lib/i18n';
import {people} from '@/lib/people';
export default function PersonProfile({person:p}:{person:(typeof people)[number]}){
 const {t}=useLang();
 return <article className="mx-auto min-w-0 max-w-5xl py-4 sm:py-10">
 <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-kokum-700">← {t({en:'Back to home',mr:'मुख्यपृष्ठावर परत',hi:'मुख्यपृष्ठ पर वापस'})}</Link>
 <div className="mt-4 grid min-w-0 gap-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
 <div><div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden sm:max-w-[240px] lg:max-w-[280px] rounded-3xl bg-kokum-50"><Image src={p.image} alt={t(p.name)} fill priority sizes="(min-width: 1024px) 280px, (min-width: 640px) 240px, 200px" className="object-cover" style={{objectPosition:p.position}}/></div></div>
 <div><p className="inline-flex min-h-11 items-center text-sm font-semibold text-kokum-600">{t(p.role)}</p><h1 className="mt-3 font-display text-2xl leading-snug font-bold text-kokum-800 sm:text-3xl lg:text-4xl">{t(p.name)}</h1><h2 className="mt-8 font-display text-xl font-bold">{t({en:'About',mr:'परिचय',hi:'परिचय'})}</h2><p className="mt-3 text-base leading-8 text-ink-soft">{t(p.about)}</p><p className="mt-4 text-base leading-8 text-ink-soft">{t(p.detail)}</p>
 <section className="mt-8 border-t border-kokum-100 pt-6"><h2 className="font-bold text-kokum-800">{t({en:'Sources and further reading',mr:'स्रोत आणि अधिक माहिती',hi:'स्रोत और अधिक जानकारी'})}</h2><ul className="mt-3 space-y-3">{p.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center break-words py-2 text-sm text-kokum-700 underline underline-offset-4">{s.label} ↗</a></li>)}</ul><p className="mt-4 text-xs text-ink-soft">{t({en:'Sources checked: 6 October 2026.',mr:'स्रोत तपासले: 6 ऑक्टोबर 2026.',hi:'स्रोत जाँचे: 6 अक्टूबर 2026.'})}</p></section></div></div>
 <nav aria-label="Other profiles" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 border-t border-kokum-100 pt-6">{people.filter(x=>x.slug!==p.slug).map(x=><Link key={x.slug} href={`/people/${x.slug}`} className="flex min-h-12 items-center rounded-2xl border border-kokum-200 px-4 py-3 text-sm font-semibold text-kokum-700">{t(x.name)} →</Link>)}</nav>
 </article>
}
