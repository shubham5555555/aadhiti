import { notFound } from 'next/navigation';
import { JOURNEYS } from '@/lib/journeys';
import JourneyPage from '@/components/JourneyPage';
export function generateStaticParams(){return JOURNEYS.map(({slug})=>({slug}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 if(!JOURNEYS.some(j=>j.slug===slug))notFound();
 return <JourneyPage slug={slug}/>;
}
