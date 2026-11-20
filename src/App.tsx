import { useMemo, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Building2, Check, ChevronDown, Compass, MapPin, Menu, Search,
  ShieldCheck, Sparkles, UsersRound, Wrench, X,
} from 'lucide-react'

type Language = 'bn' | 'en'
type Category = 'all' | 'jobs' | 'services' | 'businesses'

const copy = {
  bn: {
    tagline: 'আপনার চারপাশের সবকিছু, হাতের নাগালে।', location: 'আপনার এলাকা', searchPlaceholder: 'কী খুঁজছেন? চাকরি, সেবা, দোকান...',
    search: 'খুঁজুন', discover: 'আপনার এলাকার নতুন সুযোগ', heroTitleA: 'কাছেই আছে', heroTitleB: 'আপনার পরের সুযোগ।',
    heroDescription: 'কুলাউরার চাকরি, বিশ্বস্ত সেবা আর পছন্দের স্থানীয় ব্যবসা—সব এক জায়গায়।', explore: 'সুযোগগুলো দেখুন', howItWorks: 'কীভাবে কাজ করে', demo: 'ডেমো অভিজ্ঞতা', demoNote: 'এখানে দেখানো পোস্টগুলো নমুনা—বাস্তব বিজ্ঞাপন নয়।',
    quickTitle: 'আপনি কী খুঁজছেন?', quickSub: 'আপনার দরকারের পথটি বেছে নিন।', jobs: 'চাকরি', jobsSub: 'স্থানীয় কাজ ও ক্যারিয়ার', services: 'সেবা', servicesSub: 'দক্ষ মানুষ, কাছেই', businesses: 'স্থানীয় ব্যবসা', businessesSub: 'আপনার এলাকার প���ন্দের দোকান',
    fresh: 'কুলাউরায় নতুন', seeAll: 'সব দেখুন', all: 'সব', recent: 'সাম্প্রতিক সুযোগ', demoPill: 'নমুনা', fullTime: 'পূর্ণকালীন', partTime: 'খণ্ডকালীন', contract: 'চুক্তিভিত্তিক', salary: 'বেতন', negotiable: 'আলোচনা সাপেক্ষে',
    verified: 'পরিচয় যাচাইকৃত', viewListing: 'বিস্তারিত দেখুন', noResults: 'এই খোঁজে কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।', statsA: 'স্থানীয় সুযোগ', statsB: 'তিনটি বিভাগ', statsC: 'আপনার পাশেই', trustTitle: 'নিরাপদে খুঁজুন।', trustText: 'চাকরির জন্য আগে টাকা দেবেন না। সন্দেহজনক কিছু দেখলে রিপোর্ট করুন।', safety: 'নিরাপত্তা টিপস', join: 'আপনার সুযোগ শেয়ার করুন', joinText: 'আপনি কি স্থানীয় চাকরি দিচ্ছেন, সেবা দিচ্ছেন, বা ব্যবসা চালাচ্ছেন?', addDemo: 'শিগগিরই আসছে', footerLine: 'বাংলাদেশের স্থানীয় সুযোগ, সবার জন্য।',
    navExplore: 'এক্সপ্লোর', navJobs: 'চাকরি', navServices: 'সেবা', navBusinesses: 'ব্যবসা', navSaved: 'সংরক্ষিত', soon: 'শিগগিরই',
  },
  en: {
    tagline: 'Your Local World, Within Reach.', location: 'Your location', searchPlaceholder: 'Search jobs, services, local shops...',
    search: 'Search', discover: 'Discover what’s around you', heroTitleA: 'Your next opportunity', heroTitleB: 'is closer than you think.',
    heroDescription: 'Find work, trusted services, and local favorites around Kulaura—all in one place.', explore: 'Explore opportunities', howItWorks: 'How it works', demo: 'Demo experience', demoNote: 'Listings shown here are sample content—not real advertisements.',
    quickTitle: 'What are you looking for?', quickSub: 'Choose a path to get started.', jobs: 'Jobs', jobsSub: 'Local work & careers', services: 'Services', servicesSub: 'Skilled people, nearby', businesses: 'Local businesses', businessesSub: 'Neighborhood favorites',
    fresh: 'New around Kulaura', seeAll: 'View all', all: 'All', recent: 'Recent opportunities', demoPill: 'DEMO', fullTime: 'Full time', partTime: 'Part time', contract: 'Contract', salary: 'Salary', negotiable: 'Negotiable',
    verified: 'Identity checked', viewListing: 'View details', noResults: 'Nothing found for that search. Try another word.', statsA: 'Local opportunities', statsB: 'Easy-to-browse categories', statsC: 'Right around you', trustTitle: 'Explore with care.', trustText: 'Never pay upfront for a job. Report anything that feels suspicious.', safety: 'Safety tips', join: 'Share your opportunity', joinText: 'Hiring locally, offering a service, or running a neighborhood business?', addDemo: 'Coming soon', footerLine: 'Local opportunities in Bangladesh, for everyone.',
    navExplore: 'Explore', navJobs: 'Jobs', navServices: 'Services', navBusinesses: 'Businesses', navSaved: 'Saved', soon: 'Soon',
  },
}

const listings = [
  { id: 1, type: 'jobs' as const, categoryBn: 'চাকরি', categoryEn: 'JOB', titleBn: 'সেলস অ্যাসোসিয়েট', titleEn: 'Sales Associate', orgBn: 'নূর ফ্যাশন হাউস', orgEn: 'Noor Fashion House', locationBn: 'স্টেশন রোড, কুলাউরা', locationEn: 'Station Road, Kulaura', salaryBn: '৳১২,০০০–১৬,০০০ / মাস', salaryEn: '৳12,000–16,000 / month', timing: 'fullTime' as const, icon: BriefcaseBusiness, color: 'mint', initials: 'নূ', postedBn: '২ ঘণ্টা আগে', postedEn: '2 hours ago' },
  { id: 2, type: 'services' as const, categoryBn: 'সেবা', categoryEn: 'SERVICE', titleBn: 'বাসা ও অফিসের ইলেকট্রিক কাজ', titleEn: 'Home & office electrical work', orgBn: 'রহিম ইলেকট্রিক সার্ভিস', orgEn: 'Rahim Electric Service', locationBn: 'কুলাউরা পৌরসভা', locationEn: 'Kulaura Municipality', salaryBn: 'কাজ অনুযায়ী', salaryEn: 'Price per job', timing: 'contract' as const, icon: Wrench, color: 'lavender', initials: 'র', postedBn: '৫ ঘণ্টা আগে', postedEn: '5 hours ago' },
  { id: 3, type: 'jobs' as const, categoryBn: 'চাকরি', categoryEn: 'JOB', titleBn: 'জুনিয়র হিসাব সহকারী', titleEn: 'Junior Accounts Assistant', orgBn: 'গ্রিনলিফ ট্রেডার্স', orgEn: 'Greenleaf Traders', locationBn: 'কুলাউরা বাজার', locationEn: 'Kulaura Bazar', salaryBn: '৳১০,০০০–১৪,০০০ / মাস', salaryEn: '৳10,000–14,000 / month', timing: 'partTime' as const, icon: BriefcaseBusiness, color: 'peach', initials: 'গ', postedBn: '১ দিন আগে', postedEn: '1 day ago' },
  { id: 4, type: 'businesses' as const, categoryBn: 'ব্যবসা', categoryEn: 'LOCAL BUSINESS', titleBn: 'শাহীন বুক কর্নার', titleEn: 'Shaheen Book Corner', orgBn: 'বই, স্টেশনারি ও প্রিন্ট', orgEn: 'Books, stationery & printing', locationBn: 'কলেজ রোড, কুলাউরা', locationEn: 'College Road, Kulaura', salaryBn: 'আজ খোলা · রাত ৯টা পর্যন্ত', salaryEn: 'Open today · until 9 PM', timing: 'contract' as const, icon: Building2, color: 'blue', initials: 'শা', postedBn: 'গতকাল', postedEn: 'Yesterday' },
]

function App() {
  const [language, setLanguage] = useState<Language>('bn')
  const [category, setCategory] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]
  const isBn = language === 'bn'

  const filteredListings = useMemo(() => listings.filter((item) => {
    const matchesCategory = category === 'all' || item.type === category
    const query = search.trim().toLocaleLowerCase()
    const text = `${item.titleBn} ${item.titleEn} ${item.orgBn} ${item.orgEn} ${item.locationBn} ${item.locationEn}`.toLocaleLowerCase()
    return matchesCategory && (!query || text.includes(query))
  }), [category, search])

  const notifySoon = () => {
    setToast(isBn ? 'এই সুবিধাটি পরবর্তী ধাপে যোগ হবে।' : 'This feature is planned for a later stage.')
    window.setTimeout(() => setToast(''), 2600)
  }

  const chooseCategory = (next: Category) => {
    setCategory(next)
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-shell">
      <div className="announcement"><span className="announcement-dot" />{t.demo}<span className="announcement-separator">·</span><span>{t.demoNote}</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Bazar Dekho home">
          <span className="brand-mark"><Compass size={23} strokeWidth={2.2} /><i /></span>
          <span className="brand-copy"><strong>বাজার দেখো</strong><small>BAZAR DEKHO</small></span>
        </a>
        <nav className="desktop-nav" aria-label={isBn ? 'প্রধান নেভিগেশন' : 'Main navigation'}>
          <a className="nav-link active" href="#home">{t.navExplore}</a>
          <button className="nav-link" onClick={() => chooseCategory('jobs')}>{t.navJobs}</button>
          <button className="nav-link" onClick={() => chooseCategory('services')}>{t.navServices}</button>
          <button className="nav-link" onClick={() => chooseCategory('businesses')}>{t.navBusinesses}</button>
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={() => setLanguage(isBn ? 'en' : 'bn')} aria-label={isBn ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}><span>{isBn ? 'EN' : 'বাং'}</span><ChevronDown size={13} /></button>
          <button className="header-cta" onClick={notifySoon}><span>{t.join}</span><ArrowUpRight size={16} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu"><button onClick={() => { chooseCategory('jobs'); setMenuOpen(false) }}>{t.navJobs}</button><button onClick={() => { chooseCategory('services'); setMenuOpen(false) }}>{t.navServices}</button><button onClick={() => { chooseCategory('businesses'); setMenuOpen(false) }}>{t.navBusinesses}</button></div>}

      <main id="home">
        <section className="hero-section page-width">
          <div className="hero-copy">
            <div className="location-chip"><MapPin size={14} fill="currentColor" /><span>{t.location}</span><strong>{isBn ? 'কুলাউরা, সিলেট' : 'Kulaura, Sylhet'}</strong><ChevronDown size={14} /></div>
            <p className="eyebrow"><Sparkles size={14} />{t.discover}</p>
            <h1>{isBn ? <>{t.heroTitleA}<br /><span>{t.heroTitleB}</span></> : <>{t.heroTitleA}<br /><span>{t.heroTitleB}</span></>}</h1>
            <p className="hero-description">{t.heroDescription}</p>
            <form className="search-box" onSubmit={(event) => { event.preventDefault(); chooseCategory('all') }}>
              <Search size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} /><button type="submit">{t.search}<ArrowRight size={16} /></button>
            </form>
            <div className="hero-footnote"><ShieldCheck size={15} /><span>{isBn ? 'স্থানীয়ভাবে খুঁজুন, সচেতনভাবে বেছে নিন' : 'Discover locally. Choose confidently.'}</span><span className="footnote-dot">·</span><span>{isBn ? 'কুলাউরা থেকে শুরু' : 'Starting in Kulaura'}</span></div>
          </div>
          <div className="hero-art" aria-label={isBn ? 'কুলাউরার স্থানীয় সুযোগ' : 'Local opportunities in Kulaura'}>
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-land land-back" /><div className="art-land land-front" />
            <div className="art-town-label"><MapPin size={14} />{isBn ? 'কুলাউরা, বাংলাদেশ' : 'Kulaura, Bangladesh'}</div>
            <div className="floating-card float-card-top"><span className="float-icon"><BriefcaseBusiness size={17} /></span><span><b>{isBn ? 'নতুন সুযোগ' : 'New opportunity'}</b><small>{isBn ? 'আপনার পাশেই' : 'Right around you'}</small></span><span className="float-ping" /></div>
            <div className="floating-card float-card-bottom"><span className="avatar-stack"><i>ন</i><i>র</i><i>শ</i></span><span><b>{isBn ? 'স্থানীয় মানুষের জন্য' : 'Made for local people'}</b><small>{isBn ? 'একসাথে এগিয়ে যাই' : 'Growing together'}</small></span></div>
            <span className="art-sparkle sparkle-a">✳</span><span className="art-sparkle sparkle-b">✳</span>
          </div>
        </section>

        <section className="quick-section page-width" aria-labelledby="quick-heading">
          <div className="section-heading quick-heading"><div><p className="eyebrow">01 / {isBn ? 'শুরু করুন' : 'GET STARTED'}</p><h2 id="quick-heading">{t.quickTitle}</h2><p>{t.quickSub}</p></div><span className="heading-flourish">✳</span></div>
          <div className="category-grid">
            <button className="category-card category-jobs" onClick={() => chooseCategory('jobs')}><span className="category-icon"><BriefcaseBusiness size={22} /></span><span className="category-content"><strong>{t.jobs}</strong><small>{t.jobsSub}</small></span><span className="category-arrow"><ArrowUpRight size={18} /></span><span className="category-count">01</span></button>
            <button className="category-card category-services" onClick={() => chooseCategory('services')}><span className="category-icon"><Wrench size={22} /></span><span className="category-content"><strong>{t.services}</strong><small>{t.servicesSub}</small></span><span className="category-arrow"><ArrowUpRight size={18} /></span><span className="category-count">02</span></button>
            <button className="category-card category-business" onClick={() => chooseCategory('businesses')}><span className="category-icon"><Building2 size={22} /></span><span className="category-content"><strong>{t.businesses}</strong><small>{t.businessesSub}</small></span><span className="category-arrow"><ArrowUpRight size={18} /></span><span className="category-count">03</span></button>
          </div>
        </section>

        <section className="listings-section" id="opportunities">
          <div className="page-width">
            <div className="section-heading listings-heading"><div><p className="eyebrow">02 / {t.fresh}</p><h2>{t.recent}<span className="listing-count">{filteredListings.length.toString().padStart(2, '0')}</span></h2></div><button className="text-link" onClick={() => { setCategory('all'); setSearch('') }}>{t.seeAll}<ArrowRight size={16} /></button></div>
            <div className="filter-row" role="group" aria-label={isBn ? 'বিভাগ অনুযায়ী ফিল্টার' : 'Filter by category'}>{(['all', 'jobs', 'services', 'businesses'] as Category[]).map((value) => <button key={value} className={`filter-chip ${category === value ? 'selected' : ''}`} onClick={() => setCategory(value)}>{value === 'all' ? t.all : value === 'jobs' ? t.jobs : value === 'services' ? t.services : t.businesses}</button>)}</div>
            <div className="listing-grid">
              {filteredListings.map((item) => {
                const Icon = item.icon
                return <article className="listing-card" key={item.id}><div className="listing-top"><span className={`listing-avatar ${item.color}`}><Icon size={20} /><i>{item.initials}</i></span><span className="listing-category">{isBn ? item.categoryBn : item.categoryEn}</span><span className="demo-label">{t.demoPill}</span></div><h3>{isBn ? item.titleBn : item.titleEn}</h3><p className="listing-company">{isBn ? item.orgBn : item.orgEn}<span class="verified-check" title={t.verified}><Check size={10} /></span></p><div className="listing-meta"><span><MapPin size={13} />{isBn ? item.locationBn : item.locationEn}</span><span><BriefcaseBusiness size={13} />{t[item.timing]}</span></div><div className="listing-bottom"><strong>{isBn ? item.salaryBn : item.salaryEn}</strong><span>{isBn ? item.postedBn : item.postedEn}</span></div><button className="listing-open" onClick={notifySoon} aria-label={`${t.viewListing}: ${isBn ? item.titleBn : item.titleEn}`}><ArrowUpRight size={17} /></button></article>
              })}
              {filteredListings.length === 0 && <div className="empty-state"><Search size={24} /><p>{t.noResults}</p><button onClick={() => { setSearch(''); setCategory('all') }}>{t.seeAll}</button></div>}
            </div>
            <div className="listings-note"><span className="note-mark">i</span>{t.demoNote}</div>
          </div>
        </section>

        <section className="trust-section page-width"><div className="trust-emblem"><ShieldCheck size={24} /></div><div className="trust-copy"><p className="eyebrow">{isBn ? 'নিরাপত্তা সবার আগে' : 'SAFETY FIRST'}</p><h2>{t.trustTitle}</h2><p>{t.trustText}</p></div><button onClick={notifySoon}>{t.safety}<ArrowUpRight size={16} /></button></section>
        <section className="join-section page-width"><div className="join-copy"><span className="join-kicker"><UsersRound size={15} />{isBn ? 'স্থানীয় কমিউনিটি' : 'LOCAL COMMUNITY'}</span><h2>{t.join}</h2><p>{t.joinText}</p></div><button onClick={notifySoon}>{t.addDemo}<ArrowRight size={16} /></button><div className="join-decoration">✳</div></section>
      </main>

      <footer className="site-footer page-width"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Compass size={22} /><i /></span><span className="brand-copy"><strong>বাজার দেখো</strong><small>BAZAR DEKHO</small></span></a><p>{t.footerLine}</p><span className="footer-location"><MapPin size={13} />{isBn ? 'কুলাউরা, বাংলাদেশ' : 'Kulaura, Bangladesh'}</span><small className="copyright">© 2026 Bazar Dekho · {t.demo}</small></footer>
      <nav className="mobile-bottom-nav" aria-label={isBn ? 'মোবাইল নেভিগেশন' : 'Mobile navigation'}><a className="bottom-nav-item active" href="#home"><Compass size={19} /><span>{t.navExplore}</span></a><button className="bottom-nav-item" onClick={() => chooseCategory('jobs')}><BriefcaseBusiness size={19} /><span>{t.navJobs}</span></button><button className="bottom-nav-item" onClick={() => chooseCategory('services')}><Wrench size={19} /><span>{t.navServices}</span></button><button className="bottom-nav-item" onClick={notifySoon}><UsersRound size={19} /><span>{t.navSaved}</span></button></nav>
      {toast && <div className="toast" role="status"><Sparkles size={16} />{toast}</div>}
    </div>
  )
}

export default App
