'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const PHONE_DISPLAY = '(817) 555-0198'; // Replace with the client's phone number.
const PHONE_HREF = '+18175550198';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61588217677782';

const projects = ['Driveway', 'Patio', 'Sidewalk', 'Stamped Concrete', 'Concrete Slab', 'Other'];
const timelines = ['As soon as possible', 'Within 30 days', '1 to 3 months', 'More than 3 months', 'Just researching'];
const budgets = ['Under $5,000', '$5,000 to $10,000', '$10,000 to $20,000', '$20,000 or more', 'Not sure yet'];

const services = [
  { title: 'Concrete Driveways', desc: 'A durable driveway with a clean finish, built to handle Texas weather and sharpen your home’s curb appeal.', image: '/images/residential-driveway.webp' },
  { title: 'Concrete Patios', desc: 'A comfortable backyard foundation for grilling, gathering, and making more use of your outdoor space.', image: '/images/residential-patio.webp' },
  { title: 'Concrete Sidewalks', desc: 'Smooth, practical walkways that create a safer, better-looking path around your home.', image: '/images/residential-walkway.webp' },
  { title: 'Stamped Concrete', desc: 'Decorative color and texture that gives residential patios and paths a custom, finished look.', image: '/images/residential-stamped-concrete.webp' },
  { title: 'Concrete Slabs', desc: 'Dependable residential foundations for backyard sheds, workshops, additions, and more.', image: '/images/residential-concrete-slab.webp' },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', property:'', project:'', timeline:'', budget:'', details:'' });
  const update = (key:string, value:string) => setForm((current) => ({ ...current, [key]: value }));

  function nextStep() {
    if (step === 1 && (!form.firstName.trim() || !form.lastName.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.phone.replace(/\D/g,'').length < 10)) {
      setError('Please enter your name, a valid email, and a valid phone number.'); return;
    }
    if (step === 2 && (!form.property || !form.project)) { setError('Please choose a property type and project type.'); return; }
    if (step === 3 && (!form.timeline || !form.budget)) { setError('Please choose a timeline and budget range.'); return; }
    setError(''); setStep((current) => Math.min(4, current + 1));
  }

  function submit(e:FormEvent) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('fortWorthConcreteLeadSubmitted', { detail: { ...form, source: 'landing-page' } }));
    window.sessionStorage.setItem('fwc-lead-submitted', 'true');
    window.location.assign('/thank-you');
  }

  const quoteLink = (label:string, className='button primary') => <a className={className} href="#quote">{label} <span>→</span></a>;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fort Worth Concrete home"><Image className="brand-logo" src="/fort-worth-concrete-logo-tight.webp" width={152} height={148} priority alt="Fort Worth Concrete" /></a>
        <div className="header-actions"><span className="header-note">Free estimates in Fort Worth and Dallas</span><a className="phone-link" href={`tel:${PHONE_HREF}`}>Call {PHONE_DISPLAY}</a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-grid wrap">
          <div className="hero-copy">
            <span className="eyebrow">Residential concrete service across DFW</span>
            <h1>Concrete installation you can count on.</h1>
            <p className="hero-sub">Driveways, patios, sidewalks, stamped concrete and slabs built with care for homeowners in Fort Worth, Dallas and surrounding DFW communities.</p>
            <div className="offer"><strong>10% OFF</strong><span>Your concrete project</span></div>
            <ul className="trust-list"><li>Free estimates with no pressure</li><li>Experienced concrete crews</li><li>Clear communication</li></ul>
          </div>

          <Card className="lead-card"><form id="quote" onSubmit={submit} noValidate>
            <Progress value={step * 25} />
            <div className="step-label">Step {step} of 4</div>
            {step === 1 && <><h2>Let&apos;s get you a free estimate</h2><p>Start with your contact information. It only takes a minute.</p><div className="field-grid">
              <FieldLabel>First name<Input value={form.firstName} onChange={e=>update('firstName',e.target.value)} required autoComplete="given-name" placeholder="First name" /></FieldLabel>
              <FieldLabel>Last name<Input value={form.lastName} onChange={e=>update('lastName',e.target.value)} required autoComplete="family-name" placeholder="Last name" /></FieldLabel>
              <FieldLabel className="wide">Email<Input value={form.email} onChange={e=>update('email',e.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" /></FieldLabel>
              <FieldLabel className="wide">Phone number<Input value={form.phone} onChange={e=>update('phone',e.target.value)} required type="tel" inputMode="tel" autoComplete="tel" placeholder="(817) 555-0123" /></FieldLabel>
            </div></>}
            {step === 2 && <><h2>Tell us about the project</h2><Choice title="Is this a residential or commercial property?" name="property" options={['Residential','Commercial']} value={form.property} onChange={v=>update('property',v)} /><Choice title="What type of concrete project are you interested in?" name="project" options={projects} value={form.project} onChange={v=>update('project',v)} /></>}
            {step === 3 && <><h2>What&apos;s your project timing?</h2><Choice title="When are you looking to get this project done?" name="timeline" options={timelines} value={form.timeline} onChange={v=>update('timeline',v)} /><Choice title="Have you considered a budget for the project?" name="budget" options={budgets} value={form.budget} onChange={v=>update('budget',v)} /></>}
            {step === 4 && <><h2>One last thing</h2><p>Tell us anything else we should know about your project.</p><FieldLabel className="textarea-label">Project details<Textarea value={form.details} onChange={e=>update('details',e.target.value)} rows={6} placeholder="Approximate size, project location, special finish, access notes…" /></FieldLabel></>}
            <FieldError>{error}</FieldError>
            <div className="form-buttons">{step > 1 && <Button className="back-button" variant="secondary" type="button" onClick={()=>{setError('');setStep(step-1)}}>Back</Button>}<Button className="primary-button" type={step===4?'submit':'button'} onClick={step===4?undefined:nextStep}>{step===4?'Let’s Get You a Free Estimate':'Next'} {step < 4 && <span>→</span>}</Button></div>
            <small>By submitting, you agree to be contacted about your estimate. No spam.</small>
          </form></Card>
        </div>
      </section>

      <section className="proof-strip"><div className="wrap proof-grid"><span><b>FREE</b> estimates</span><span><b>LOCAL</b> DFW service</span><span><b>RESIDENTIAL</b> concrete specialists</span><span><b>10% OFF</b> current offer</span></div></section>

      <section className="section services"><div className="wrap"><div className="section-heading"><div><span className="eyebrow dark">Concrete services across DFW</span><h2>Built for the way you use your property.</h2></div>{quoteLink('Let’s Get You a Free Estimate')}</div><div className="service-grid">{services.map((service)=><article className="service-card" key={service.title}><Image src={service.image} alt={`${service.title} example`} width={900} height={600} unoptimized loading="lazy" /><div><h3>{service.title}</h3><p>{service.desc}</p><a href="#quote">Let’s get you a free estimate <span>→</span></a></div></article>)}</div></div></section>

      <section className="section why"><div className="wrap why-grid"><div className="why-photo" role="img" aria-label="Residential concrete crew finishing a backyard slab"><div className="photo-badge"><b>DFW focused</b><span>Concrete built for your home</span></div></div><div><span className="eyebrow dark">Why choose us</span><h2>Solid work. Straight answers.</h2><p className="section-intro">From your first estimate through the final walkthrough, the focus stays on dependable service, a clean residential worksite and communication you can follow.</p><div className="benefit-grid">{['Free Estimates','Quality Workmanship','Local DFW Service','Residential Specialists','Clear Communication','Reliable Scheduling'].map((item,i)=><div className="benefit" key={item}><span>{['$','✓','⌖','⌂','↔','◷'][i]}</span><b>{item}</b></div>)}</div>{quoteLink('Let’s Get You a Free Estimate')}</div></div></section>

      <section className="section reviews"><div className="wrap"><div className="center-heading"><span className="eyebrow dark">Customer feedback</span><h2>Trusted by DFW homeowners</h2><p>Real feedback from a happy Fort Worth Concrete customer.</p></div><article className="featured-review"><div className="stars" aria-label="Five star review">★★★★★</div><blockquote>“Fort Worth Concrete is it. You need not look any further. They are very professional and the job is top notch. I highly recommend them for your patio, driveway, sidewalk and more. My patio is exactly what I wanted, and they did not disappoint. The owner, Jack, is extremely nice and will oversee it all. I LOVE MY PATIO!”</blockquote><div className="review-source">Customer review</div></article></div></section>

      <section className="area"><div className="wrap area-grid"><div><span className="eyebrow">Proudly serving our community</span><h2>Your DFW concrete contractor.</h2><p>Fort Worth Concrete serves homeowners throughout Fort Worth, Dallas and surrounding DFW communities. We help you plan driveways, patios, sidewalks, stamped concrete and slab projects with confidence.</p>{quoteLink('Let’s Get You a Free Estimate')}</div><div className="area-card"><span className="map-pin">⌖</span><b>Fort Worth and Dallas, Texas</b><p>Local residential concrete service throughout the greater DFW area.</p><a href={`tel:${PHONE_HREF}`}>Call {PHONE_DISPLAY}</a></div></div></section>

      <section className="final-cta"><div className="wrap"><span className="eyebrow">Ready to get started?</span><h2>Let&apos;s talk about your concrete project.</h2><p>Start with a free estimate today and save 10% with our current offer.</p><div className="cta-row">{quoteLink('Let’s Get You a Free Estimate')}<a className="button secondary" href={`tel:${PHONE_HREF}`}>Call Now at {PHONE_DISPLAY}</a></div></div></section>

      <section className="social-section"><div className="wrap social-inner"><div><span className="eyebrow dark">Stay connected</span><h2>We’re Social</h2><p>Follow Fort Worth Concrete on Facebook for project updates, finished work and local concrete inspiration.</p></div><a className="facebook-button" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow Fort Worth Concrete on Facebook"><span aria-hidden="true">f</span> Follow us on Facebook</a></div></section>

      <footer><div className="wrap footer-grid"><a className="brand footer-brand" href="#top"><Image className="brand-logo footer-logo" src="/fort-worth-concrete-logo-tight.webp" width={152} height={148} alt="Fort Worth Concrete" /></a><p>Residential concrete installation in Fort Worth, Dallas and surrounding DFW communities.</p><div className="social-links"><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a></div><a className="footer-phone" href={`tel:${PHONE_HREF}`}>{PHONE_DISPLAY}</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Fort Worth Concrete</span><span>Proudly serving the greater DFW area.</span></div></footer>

      <div className="mobile-sticky"><a href={`tel:${PHONE_HREF}`}>Call Now</a><a href="#quote">Free Estimate</a></div>
    </main>
  );
}

function Choice({title,name,options,value,onChange}:{title:string;name:string;options:string[];value:string;onChange:(v:string)=>void}) {
  return <fieldset className="choice-group"><legend>{title}</legend><RadioGroup value={value} name={name} onValueChange={onChange}>{options.map(option=><RadioGroupItem id={`${name}-${option.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} value={option} label={option} key={option} />)}</RadioGroup></fieldset>;
}
