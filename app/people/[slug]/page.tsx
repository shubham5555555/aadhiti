import {notFound} from 'next/navigation';
import {people} from '@/lib/people';
import PersonProfile from '@/components/PersonProfile';
export const dynamicParams=false;
export function generateStaticParams(){return people.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=people.find(p=>p.slug===slug);return {title:p?`${p.name.en} · AADHI TI`:'AADHI TI',description:p?.about.en};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const person=people.find(p=>p.slug===slug);if(!person)notFound();return <PersonProfile person={person}/>;}
