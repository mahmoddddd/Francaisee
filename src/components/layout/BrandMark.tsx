import { cn } from '@/lib/utils';

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-brand-600', className)}
      aria-hidden
    >
      <rect x="2" y="2" width="44" height="44" rx="10" className="fill-gray-900" />
      <path
        d="M15 30V18h5M33 30V18h-5M20 24h8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="1.3" fill="currentColor" />
    </svg>
  );
}
