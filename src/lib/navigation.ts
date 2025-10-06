// Compatibility layer for Next.js navigation
'use client';

export { useRouter as useNavigate, useParams, usePathname as useLocation } from 'next/navigation';
export { default as Link } from 'next/link';
export { redirect as Navigate } from 'next/navigation';
