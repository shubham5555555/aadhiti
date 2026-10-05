import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { journeyPages } from '@/lib/journeyPages';
import { getTopic } from '@/lib/kb';
import { SCHEMES } from '@/lib/schemes';
import { helplines } from '@/lib/data';
import JourneyDetail from '@/components/JourneyDetail';
export const dynamicParams = false;
export function generateStaticParams(){return journeyPages.map(j=>({slug:j.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const j=journeyPages.find(j=>j.slug===slug);
 return {title:j ? `${j.name.en} · ${j.title.en} | AADHI TI`:'AADHI TI',description:j?.body.en};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const journey=journeyPages.find(j=>j.slug===slug);if(!journey)notFound();
 const topics=journey.topics.map(getTopic).filter((t):t is NonNullable<typeof t>=>!!t);
 return <JourneyDetail journey={journey} topics={topics} schemes={SCHEMES.filter(s=>journey.schemes.includes(s.id))} numbers={helplines.filter(h=>journey.numbers.includes(h.number))} navigation={journeyPages.map(j=>({slug:j.slug,name:j.name,index:j.index}))}/>;
}
