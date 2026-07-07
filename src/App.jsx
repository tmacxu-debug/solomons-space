import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Copy,
  Mail,
  Menu,
  Pause,
  Phone,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import { cases, contact, profileCards, skills } from './data/portfolio.js';

const navItems = [
  ['角色介绍', 'profile'],
  ['作品案例', 'work'],
  ['互动体验', 'experience'],
  ['联系方式', 'contact'],
];

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const scrolled = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);
  const [copied, setCopied] = useState('');
  useReveal();

  const copyValue = async (label, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1600);
  };

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#hero" aria-label="回到首页">
          <span className="brand-mark">S</span>
          <span>Solomon&apos;s space</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <button className="icon-button menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="打开导航">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section className="hero" id="hero" aria-label="Solomon's space 首屏">
          <video
            className="hero-video"
            src="/assets/hero-video.mp4"
            poster="/assets/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-film" />
          <div className="ambient-orbit" aria-hidden="true" />
          <div className="hero-inner" data-reveal>
            <p className="kicker">
              <Sparkles size={16} />
              Business operator portfolio
            </p>
            <h1>
              新媒体电商全案运营操盘手
              <span>让内容、流量与成交形成增长闭环</span>
            </h1>
            <p className="hero-copy">
              Solomon&apos;s space 聚焦全域运营、账号孵化、流量变现与商业增长，为品牌与项目提供从策略到执行的高阶操盘能力。
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">
                查看作品案例
                <ArrowUpRight size={18} />
              </a>
              <a className="secondary-action" href="#contact">
                商务对接
              </a>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            Scroll
          </div>
        </section>

        <section className="section profile-section" id="profile">
          <div className="section-heading" data-reveal>
            <p className="section-label">角色介绍</p>
            <h2>以操盘手视角整合商业增长的关键变量</h2>
          </div>

          <div className="profile-grid">
            {profileCards.map((card, index) => (
              <article className="glass-card profile-card" key={card.title} data-reveal style={{ '--delay': `${index * 90}ms` }}>
                <p>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <span>{card.body}</span>
              </article>
            ))}
          </div>

          <div className="skill-panel" data-reveal>
            <div>
              <p className="section-label">Core skills</p>
              <h3>从定位到成交的完整运营能力</h3>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <span key={skill}>
                  <BadgeCheck size={15} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading" data-reveal>
            <p className="section-label">作品案例</p>
            <h2>为视频、海报与真实项目成果预留的案例矩阵</h2>
          </div>

          <div className="case-grid">
            {cases.map((item, index) => (
              <button
                className="case-card"
                key={item.title}
                onClick={() => setActiveCase(item)}
                data-reveal
                style={{ '--delay': `${index * 80}ms` }}
              >
                <span className="case-media">
                  <span className="case-placeholder">
                    {item.type === 'video' ? <Play size={32} /> : <BriefcaseBusiness size={32} />}
                  </span>
                </span>
                <span className="case-meta">
                  <span>{item.tag}</span>
                  <strong>{item.title}</strong>
                  <small>{item.result}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="experience-track">
            <div className="experience-copy" data-reveal>
              <p className="section-label">互动体验</p>
              <h2>轻量沉浸式增长叙事</h2>
              <p>
                这里预留后续交互模块：案例数据滚动、项目时间线、运营方法论、客户行业筛选等。当前基础版已加入滚动渐入与光影流动。
              </p>
            </div>
            <div className="flow-board" data-reveal>
              {['定位', '内容', '流量', '成交', '复盘'].map((step, index) => (
                <span key={step} style={{ '--delay': `${index * 120}ms` }}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card" data-reveal>
            <p className="section-label">联系方式</p>
            <h2>商务对接</h2>
            <p>电话和邮箱为素材替换位，可直接改为你的真实联系方式。</p>

            <div className="contact-actions">
              <button onClick={() => copyValue('电话', contact.phone)}>
                <Phone size={18} />
                <span>{contact.phone}</span>
                {copied === '电话' ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <button onClick={() => copyValue('邮箱', contact.email)}>
                <Mail size={18} />
                <span>{contact.email}</span>
                {copied === '邮箱' ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Solomon&apos;s space</span>
        <span>Commercial operator portfolio</span>
      </footer>

      {activeCase && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${activeCase.title} 预览`}>
          <div className="modal-card">
            <button className="icon-button modal-close" onClick={() => setActiveCase(null)} aria-label="关闭预览">
              <X size={20} />
            </button>
            <div className="modal-media">
              {activeCase.type === 'video' ? (
                <video src={activeCase.preview} controls poster={activeCase.cover}>
                  <track kind="captions" />
                </video>
              ) : (
                <div className="poster-preview">
                  <Pause size={34} />
                  <span>海报素材预览位</span>
                </div>
              )}
            </div>
            <div className="modal-copy">
              <p>{activeCase.tag}</p>
              <h3>{activeCase.title}</h3>
              <span>{activeCase.result}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
