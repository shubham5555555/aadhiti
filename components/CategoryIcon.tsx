import {
  Backpack,
  CircleHelp,
  GraduationCap,
  Hand,
  HeartHandshake,
  HeartPulse,
  House,
  Scale,
  Shield,
  Smartphone,
  Sprout,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { CategoryIcon as IconId } from "@/lib/kb";

const icons: Record<IconId, LucideIcon> = {
  shield: Shield,
  health: HeartPulse,
  study: GraduationCap,
  rights: Scale,
  income: Wallet,
  family: House,
  mind: HeartHandshake,
  unsure: CircleHelp,
  growing: Sprout,
  boundaries: Hand,
  school: Backpack,
  digital: Smartphone,
};

export default function CategoryIcon({ icon, size = 20, className = "" }: { icon: IconId; size?: number; className?: string }) {
  const Icon = icons[icon];
  return <Icon size={size} strokeWidth={2} className={className} aria-hidden />;
}
