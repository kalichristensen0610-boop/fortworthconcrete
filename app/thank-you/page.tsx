import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const PHONE_DISPLAY = '(817) 555-0198'; // Replace with the client's phone number.
const PHONE_HREF = '+18175550198';

export const metadata: Metadata = {
  title: 'Thank You | Fort Worth Concrete',
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return <main className="thanks-page"><header className="topbar"><Link className="brand" href="/" aria-label="Fort Worth Concrete home"><Image className="brand-logo" src="/fort-worth-concrete-logo-tight.webp" width={152} height={148} priority alt="Fort Worth Concrete" /></Link><a className="phone-link" href={`tel:${PHONE_HREF}`}>Call {PHONE_DISPLAY}</a></header><section className="thanks-content"><div className="checkmark">✓</div><span className="eyebrow dark">Request received</span><h1>Thank you — we received your request.</h1><p>A member of the Fort Worth Concrete team will be reaching out shortly to learn more about your project and help with your free estimate.</p><div className="thanks-card"><span>Need to speak with someone sooner?</span><a className="button primary" href={`tel:${PHONE_HREF}`}>Call Now · {PHONE_DISPLAY}</a></div><Link className="back-home" href="/">← Back to Fort Worth Concrete</Link></section></main>;
}
