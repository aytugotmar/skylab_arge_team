import { useRef, useState } from 'react'
import './App.css'

const teams = [
  {
    id: 'airlab',
    logo: '/public/assets/airlab-logo.png',
    name: 'AIRLAB',
    tagline: 'Yapay Zeka Takımı',
    description:
      'AIRLAB ekibi olarak yapay zeka alanında çalışmalar yapıyoruz. Makine öğrenmesi, derin öğrenme gibi konularla uğraşmakta ve bu yönde yarışmalara katılmaktayız. Şu anda alt ekip olarak ulaşımda yapay zeka yarışmasında yer alıyoruz. Hedefimiz SKY LAB\'i teknofestte en iyi şekilde temsil etmek. Bu sene ek olarak iki yarışmaya daha katılmak istiyoruz, bunlar türkçe doğal dil işleme ve sağlıkta yapay zeka. Aynı şekilde kaggle gibi platformlardan datathonlara katılmaya devam edeceğiz. Yaz döneminde ise ekipçe kendimizi geliştirmek adına eğitimler alacağız ve ARTLAB\'de sergilemek istediğimiz projelerin üretimine başlayacağız.',
    skills: ['AI', 'Python', 'Makine Öğrenmesi'],
    accent: 'linear-gradient(140deg, rgba(75, 141, 255, 0.85), rgba(123, 79, 255, 0.8))',
    visual: 'radial-gradient(circle at 20% 20%, rgba(123, 79, 255, 0.55), transparent 55%), radial-gradient(circle at 80% 80%, rgba(75, 141, 255, 0.6), transparent 60%)',
  },
  {
    id: 'algolab',
    logo: '/public/assets/algolab-logo.png',
    name: 'ALGOLAB',
    tagline: 'Algoritma Takımı',
    description:
      'ALGOLAB ekibi olarak algoritma ve programlama konusunda kendimizi geliştiren, temel ve orta düzeyde algoritma/CPP eğitimleri veren, insanları yazılım ve algoritma dünyasına hazırlayan bir ekibiz. Bu süreçte ekip olarak çalışmayı da öğreniyoruz. Ekip olarak competitive programming dünyasında emin adımlarla ilerliyoruz. Zaman zaman İnzva\'nın veya diğer okulların yarışmalarına katılıyoruz. Ayrıca, her hafta AGC (Algorithm Games Challenge) isminde bir algoritma yarışması da düzenliyoruz. ALGOLAB, üç temel alt ekipten oluşur: Beginner: Başlangıç seviyesinde CPP ve algoritma eğitimi verir. Algolearning: Orta düzey algoritma eğitimi sağlar. Algostdy: Algoritma ve yarışmalar konusunda ekip çalışması odaklı bir eğitim sunar. Bu ekipler sayesinde hem bireysel hem de ekip olarak yeteneklerimizi geliştiriyoruz.',
    skills: ['Algoritma'],
    accent: 'linear-gradient(145deg, rgba(255, 133, 82, 0.85), rgba(255, 80, 121, 0.75))',
    visual: 'radial-gradient(circle at 15% 30%, rgba(255, 152, 94, 0.6), transparent 55%), radial-gradient(circle at 85% 70%, rgba(255, 80, 121, 0.55), transparent 60%)',
  },
  {
    id: 'chainlab',
    logo: '/public/assets/chainlab-logo.png',
    name: 'CHAINLAB',
    tagline: 'Blockchain Teknolojileri Takımı',
    description:
      'ChainLab ekibi olarak blokchain ve teknolojisini anlayarak web1 web2 web3 alanlarında kendimizi geliştirmeyi, projeler çıkarmayı, hackathonlara katılmayı ve daha fazla insanın bu ekosistemi tanımasını sağlamayı amaçlıyoruz. Önümüzdeki hackathonlara hazırlanıyoruz ve ekipler çıkarmaya ve adımızı daha çok duyurmaya çalışıyoruz.',
    skills: ['Blockchain'],
    accent: 'linear-gradient(150deg, rgba(74, 222, 222, 0.85), rgba(68, 197, 157, 0.8))',
    visual: 'radial-gradient(circle at 25% 25%, rgba(74, 222, 222, 0.55), transparent 50%), radial-gradient(circle at 75% 75%, rgba(68, 197, 157, 0.55), transparent 55%)',
  },
  {
    id: 'gamelab',
    logo: '/public/assets/gamelab-logo.png',
    name: 'GAMELAB',
    tagline: 'Oyun Geliştirme Takımı',
    description:
      'GAMELAB ekibi olarak oyun geliştirme alanında çalışmalar yapıyoruz. Etkinlikler ve eğitimlerle, insanların bu alana girmesine vesile olup bir arada toplanabilecekleri ekip ortamı sağlıyoruz. Alt ekiplere bölünmüş şekilde çeşitli platformlar için oyunlar geliştiriyoruz. Bu sene oyun geliştirme yarışmalarına ekipçe veya bölünmüş birkaç ekip olarak katılmayı planlıyoruz.',
    skills: ['Unity', 'Blender'],
    accent: 'linear-gradient(155deg, rgba(161, 122, 255, 0.85), rgba(90, 203, 255, 0.8))',
    visual: 'radial-gradient(circle at 30% 20%, rgba(161, 122, 255, 0.55), transparent 55%), radial-gradient(circle at 70% 80%, rgba(90, 203, 255, 0.55), transparent 60%)',
  },
  {
    id: 'mobilab',
    logo: '/public/assets/mobilab-logo.png',
    name: 'MOBILAB',
    tagline: 'Mobil Uygulama Takımı',
    description:
      'MOBILAB ekibi olarak SKY LAB Kulübünün ve okulumuzun mobil uygulama ihtiyaçlarını karşılamak için Flutter ile mobil uygulama projeleri yürütüyoruz. Aynı zamanda mobil programlamaya ilgi duyan ve bu alanda yeni olan arkadaşlarımızı projelerde yer almaya hazır olacak şekilde yetiştirerek yeni ekip arkadaşları edinmeye can atıyoruz. Okulumuzu ve kulübümüzü Teknofest gibi ulusal ve uluslararası yarışma ve etkinliklerde en iyi şekilde temsil etmeyi ve yaratıcı uygulama fikirlerini hayata geçirmeyi hedefliyoruz.',
    skills: ['Flutter'],
    accent: 'linear-gradient(140deg, rgba(255, 197, 91, 0.85), rgba(255, 113, 91, 0.75))',
    visual: 'radial-gradient(circle at 20% 25%, rgba(255, 197, 91, 0.55), transparent 50%), radial-gradient(circle at 80% 75%, rgba(255, 113, 91, 0.55), transparent 55%)',
  },
  {
    id: 'skysec',
    logo: '/public/assets/skysec-logo.png',
    name: 'SKYSEC',
    tagline: 'Siber Güvenlik Takımı',
    description:
      'SKY-SEC ekibi olarak biz 2020 den beri legal olarak ondan önce 2018 yılından beri ekip olmadan siber güvenlik alanında araştırma ekipleri olarak ilerlemekteydi. Şu anda ekip dinamiklerine yeni katılan biri pentesting, local pentesting (sızma testi ve kapalı ağ sızma testi) çalışmalarına ardından red teaming (saldırı senaryolarına) ardından blue team senaryoları (savunma senaryoları) üzerine çalışıyor. Sosyallik olarak Tryhackme hackthebox stackoverflow, wireshark forum ve underground platformlarda skydays ctf çağrılarıyla Türkiye de hacktrickten sonra siber güvenliğin merkezini İstanbula çekmeyi başardık. bu platformlarda dünyada ve Türkiyede ytü temsilciliği yapmaktayız. Bunların yanında SKY LAB ekipleri ve çalışmaları üzerine otomasyon güvenlik sistemi yazmaktayız. ismimiz siber güvenlik çalışma alanımız Bilgisayar bilimleri diyerek ilerleyen Mottomuz var.',
    skills: ['Linux', 'Network'],
    accent: 'linear-gradient(135deg, rgba(109, 236, 130, 0.85), rgba(56, 197, 151, 0.75))',
    visual: 'radial-gradient(circle at 35% 25%, rgba(109, 236, 130, 0.5), transparent 55%), radial-gradient(circle at 70% 70%, rgba(56, 197, 151, 0.55), transparent 55%)',
  },
  {
    id: 'skysis',
    logo: '/public/assets/skysis-logo.png',
    name: 'SKYSIS',
    tagline: 'Gömülü Sistemler Takımı',
    description:
      'SKYSIS ekibi olarak gömülü sistemler üzerine projeler geliştirip çeşitli yarışmalara katılıyoruz. Şu anda TEKNOFEST’te son aşamasında olan Skylite ve Çedar ekibimiz büyük bir heyecanla çalışmaya devam ediyor. Ekibimizde farklı bölümlerden insanlara yer vererek, disiplinler arası bir çalışma ortamı yaratıyoruz. Hep birlikte gömülü sistemler alanında gömülü yazılım, donanım ve mekanik tasarımı alt başlıklarında kendimizi geliştiriyor bu alanlarda araştırma yazıları yazarak teknolojiyi takip ediyoruz. Temel amacımız, gömülü sistemlere ilgi duyan veya henüz bu alanda bilgi sahibi olmayan kişiler için bir topluluk oluşturmak. Ekip üyelerimiz, birlikte proje geliştirerek hem akademik hem de kariyer anlamında kendilerine katkı sağlıyorlar. Aynı zamanda grup çalışması deneyimi kazanarak, iş hayatına daha deneyimli ve donanımlı bir şekilde hazırlanıyorlar.',
    skills: ['Gömülü Sistemler'],
    accent: 'linear-gradient(150deg, rgba(255, 173, 220, 0.85), rgba(158, 134, 255, 0.75))',
    visual: 'radial-gradient(circle at 25% 30%, rgba(255, 173, 220, 0.55), transparent 55%), radial-gradient(circle at 75% 70%, rgba(158, 134, 255, 0.55), transparent 60%)',
  },
  {
    id: 'weblab',
    logo: '/public/assets/weblab-logo.png',
    name: 'WEBLAB',
    tagline: 'Web Takımı',
    description:
      'WEBLAB ekibi olarak, web uygulama geliştirme konusunda geniş bir yelpazede projeler yürütüyoruz. Kulübümüzün ihtiyaçlarını karşılamak amacıyla, React, Next.js, Java ve .NET gibi modern teknolojileri kullanarak hem frontend hem de backend geliştirmeleri yapıyoruz. Bu süreçte, çeşitli siteler ve uygulamalar oluşturuyor, kullanıcı deneyimini ve performansı ön planda tutarak etkili çözümler sunuyoruz. Ekip olarak, birçok farklı web uygulaması ve site geliştirerek, kulübümüzün ve diğer ilgili projelerin dijital ihtiyaçlarını karşılamayı hedefliyoruz.',
    skills: ['React', '.Net', 'Java'],
    accent: 'linear-gradient(155deg, rgba(255, 121, 198, 0.8), rgba(121, 224, 255, 0.85))',
    visual: 'radial-gradient(circle at 30% 25%, rgba(255, 121, 198, 0.55), transparent 55%), radial-gradient(circle at 70% 75%, rgba(121, 224, 255, 0.55), transparent 60%)',
  },
]

function App() {
  const [activeTeam, setActiveTeam] = useState(null)
  const teamsSectionRef = useRef(null)

  const handleScrollToTeams = () => {
    teamsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const closeModal = () => setActiveTeam(null)

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand" aria-label="YTU SkyLab">
          <img className="brand-mark" src="/public/assets/favicon.ico" alt="SKY LAB" />
          <span className="brand-sub">Ar-Ge</span>
        </div>
        <nav className="nav-links" aria-label="Ana menü">
          <a href="#hero">Ana Sayfa</a>
          <a href="#teams">Ekipler</a>
          <a href="#apply">Başvur</a>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">YTU SkyLab Ar-Ge</p>
            <h1>Geleceğin projelerini birlikte tasarlayalım.</h1>
            <p className="lead">
              Çok disiplinli ekiplerimizle yapay zekadan web geliştirmeye, algoritmadan siber güvenliğe uzanan projelerde
              yer al.
            </p>
            <div className="hero-actions">
              <button className="secondary-button" type="button" onClick={handleScrollToTeams}>
                Ekipleri Gör
              </button>
            </div>
          </div>
          <div className="hero-visual" role="presentation">
            <div className="orbital-ring" />
            <div className="floating-card">
              <span>8 Ar-Ge Ekibi</span>
              <strong>Takımını Seç</strong>
            </div>
            <div className="floating-card timeline">
              <span>Ekiplerimiz</span>
              <ul>
                <li>AirLab</li>
                <li>AlgoLab</li>
                <li>ChainLab</li>
                <li>GameLab</li>
                <li>MobiLab</li>
                <li>SkySec</li>
                <li>SkySis</li>
                <li>WebLab</li>
              </ul>
            </div>
          </div>
          <button className="scroll-hint" type="button" onClick={handleScrollToTeams} aria-label="Ekipleri keşfet">
            <span>Kaydır</span>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0v18.2M18 10l-8 8-8-8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>

        <section id="teams" className="teams" ref={teamsSectionRef}>
          <header className="section-header">
            <p className="eyebrow">Ekipler</p>
            <h2>SkyLab Ar-Ge ekipleri ile tanış</h2>
            <p>
              Kartlara tıklayarak her ekibin proje yaklaşımını, açıklamasını ve katılımcıların kullandığı temel yetenekleri inceleyebilirsin.
            </p>
          </header>
          <div className="team-grid">
            {teams.map((team) => (
              <article
                key={team.id}
                img={team.img}
                className="team-card"
                style={{ background: team.accent }}
                onClick={() => setActiveTeam(team)}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveTeam(team)
                  }
                }}
              >
                <div className="team-card__body">
                  <h3>{team.name}</h3>
                  <p>{team.tagline}</p>
                  <div className="team-card__cta">
                    <span>Detayları Gör</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.333 3.333 10 8l-4.667 4.667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="apply" className="apply">
          <div className="apply-content">
            <h2>Kulüp hakkında soruların mı var?</h2>
            <p>
              SkyLab sitesine göz at ve kulüp hakkında daha fazla bilgi edin.
            </p>
            <a
              className="primary-button"
              target='_blank'
              href="https://yildizskylab.com/"
            >
              SKY LAB Sitesi
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img className="footer-mark" src="/public/assets/favicon.ico" alt="SKY LAB" />
          <span className="brand-sub">SKY LAB Bilgisayar Bilimleri Kulübü</span>
        </div>
        <div className="footer-meta">
          <p>
            Davutpaşa Kampüsü, İstanbul •{' '}
            YTU SKY LAB
          </p>
          <p>Tüm hakları saklıdır © {new Date().getFullYear()}.</p>
        </div>
      </footer>

      {activeTeam && (
        <div className="team-modal" role="dialog" aria-modal="true" aria-labelledby={`${activeTeam.id}-title`} onClick={closeModal}>
          <div
            className="team-modal__content"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="team-modal__close-wrapper">
              <button className="modal-close" type="button" onClick={closeModal} aria-label="Bilgi penceresini kapat">
                ×
              </button>
            </div>
            <div className="team-modal__left">
              <div
                className="team-modal__media"
                style={{ background: !activeTeam.logo && activeTeam.visual ? activeTeam.visual : undefined }}
              >
                {activeTeam.logo ? (
                  <img
                    src={activeTeam.logo.replace?.(/^\/public/, '') ?? activeTeam.logo}
                    alt={activeTeam.name}
                  />
                ) : (
                  <div className="team-modal__media-overlay">
                    <span>{activeTeam.name}</span>
                  </div>
                )}
              </div>
              <div className="team-modal__meta">
                {activeTeam.skills?.length ? (
                  <div className="chip-group">
                    {activeTeam.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
                <a
                  className="primary-button"
                  href="mailto:skylab@ytu.edu.tr?subject=SkyLab%20Ekibi%20Başvuru"
                >
                  Bu Ekibe Başvur
                </a>
              </div>
            </div>
            <div className="team-modal__info">
              <h3 id={`${activeTeam.id}-title`}>{activeTeam.name}</h3>
              <p>{activeTeam.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App