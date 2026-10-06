"use client";
import AuthGate from '@/components/AuthGate';
import AditiConversation from '@/components/AditiConversation';
export default function Page(){return <main className="mx-auto max-w-xl px-4 py-8"><AuthGate><AditiConversation/></AuthGate></main>;}
