import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Background from "./components/Background";
import ActiveForms from "./components/ActiveForms";

const teams = [
  {
    id: "airlab",
    logo: "/public/assets/airlab-logo.png",
    name: "AIRLAB",
    tagline: "Yapay Zeka Takımı",
    description:
      "AIRLAB ekibi olarak yapay zeka alanında çalışmalar yapıyoruz. Makine öğrenmesi, derin öğrenme gibi konularla uğraşmakta ve bu yönde yarışmalara katılmaktayız. Şu anda alt ekip olarak ulaşımda yapay zeka yarışmasında yer alıyoruz. Hedefimiz SKY LAB'i teknofestte en iyi şekilde temsil etmek. Bu sene ek olarak iki yarışmaya daha katılmak istiyoruz, bunlar türkçe doğal dil işleme ve sağlıkta yapay zeka. Aynı şekilde kaggle gibi platformlardan datathonlara katılmaya devam edeceğiz. Yaz döneminde ise ekipçe kendimizi geliştirmek adına eğitimler alacağız ve ARTLAB'de sergilemek istediğimiz projelerin üretimine başlayacağız.",
    skills: ["AI", "Python", "Makine Öğrenmesi"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.95), rgba(148, 158, 255, 0.8))",
    visual:
      "radial-gradient(circle at 22% 24%, rgba(111, 125, 255, 0.38), transparent 58%), radial-gradient(circle at 78% 76%, rgba(148, 158, 255, 0.32), transparent 62%)",
  },
  {
    id: "algolab",
    logo: "/public/assets/algolab-logo.png",
    name: "ALGOLAB",
    tagline: "Algoritma Takımı",
    description:
      "ALGOLAB ekibi olarak algoritma ve programlama konusunda kendimizi geliştiren, temel ve orta düzeyde algoritma/CPP eğitimleri veren, insanları yazılım ve algoritma dünyasına hazırlayan bir ekibiz. Bu süreçte ekip olarak çalışmayı da öğreniyoruz. Ekip olarak competitive programming dünyasında emin adımlarla ilerliyoruz. Zaman zaman İnzva'nın veya diğer okulların yarışmalarına katılıyoruz. Ayrıca, her hafta AGC (Algorithm Games Challenge) isminde bir algoritma yarışması da düzenliyoruz. ALGOLAB, üç temel alt ekipten oluşur: Beginner: Başlangıç seviyesinde CPP ve algoritma eğitimi verir. Algolearning: Orta düzey algoritma eğitimi sağlar. Algostdy: Algoritma ve yarışmalar konusunda ekip çalışması odaklı bir eğitim sunar. Bu ekipler sayesinde hem bireysel hem de ekip olarak yeteneklerimizi geliştiriyoruz.",
    skills: ["Algoritma"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.92), rgba(138, 149, 255, 0.78))",
    visual:
      "radial-gradient(circle at 24% 26%, rgba(111, 125, 255, 0.36), transparent 58%), radial-gradient(circle at 76% 74%, rgba(138, 149, 255, 0.3), transparent 60%)",
  },
  {
    id: "chainlab",
    logo: "/public/assets/chainlab-logo.png",
    name: "CHAINLAB",
    tagline: "Blockchain Teknolojileri Takımı",
    description:
      "ChainLab ekibi olarak blokchain ve teknolojisini anlayarak web1 web2 web3 alanlarında kendimizi geliştirmeyi, projeler çıkarmayı, hackathonlara katılmayı ve daha fazla insanın bu ekosistemi tanımasını sağlamayı amaçlıyoruz. Önümüzdeki hackathonlara hazırlanıyoruz ve ekipler çıkarmaya ve adımızı daha çok duyurmaya çalışıyoruz.",
    skills: ["Blockchain"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.9), rgba(132, 143, 255, 0.76))",
    visual:
      "radial-gradient(circle at 20% 28%, rgba(111, 125, 255, 0.34), transparent 56%), radial-gradient(circle at 80% 72%, rgba(132, 143, 255, 0.28), transparent 58%)",
  },
  {
    id: "gamelab",
    logo: "/public/assets/gamelab-logo.png",
    name: "GAMELAB",
    tagline: "Oyun Geliştirme Takımı",
    description:
      "GAMELAB ekibi olarak oyun geliştirme alanında çalışmalar yapıyoruz. Etkinlikler ve eğitimlerle, insanların bu alana girmesine vesile olup bir arada toplanabilecekleri ekip ortamı sağlıyoruz. Alt ekiplere bölünmüş şekilde çeşitli platformlar için oyunlar geliştiriyoruz. Bu sene oyun geliştirme yarışmalarına ekipçe veya bölünmüş birkaç ekip olarak katılmayı planlıyoruz.",
    skills: ["Unity", "Blender"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.88), rgba(126, 137, 255, 0.74))",
    visual:
      "radial-gradient(circle at 26% 22%, rgba(111, 125, 255, 0.32), transparent 56%), radial-gradient(circle at 74% 78%, rgba(126, 137, 255, 0.27), transparent 60%)",
  },
  {
    id: "mobilab",
    logo: "/public/assets/mobilab-logo.png",
    name: "MOBILAB",
    tagline: "Mobil Uygulama Takımı",
    description:
      "MOBILAB ekibi olarak SKY LAB Kulübünün ve okulumuzun mobil uygulama ihtiyaçlarını karşılamak için Flutter ile mobil uygulama projeleri yürütüyoruz. Aynı zamanda mobil programlamaya ilgi duyan ve bu alanda yeni olan arkadaşlarımızı projelerde yer almaya hazır olacak şekilde yetiştirerek yeni ekip arkadaşları edinmeye can atıyoruz. Okulumuzu ve kulübümüzü Teknofest gibi ulusal ve uluslararası yarışma ve etkinliklerde en iyi şekilde temsil etmeyi ve yaratıcı uygulama fikirlerini hayata geçirmeyi hedefliyoruz.",
    skills: ["Flutter"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.86), rgba(120, 131, 255, 0.72))",
    visual:
      "radial-gradient(circle at 28% 24%, rgba(111, 125, 255, 0.3), transparent 54%), radial-gradient(circle at 72% 76%, rgba(120, 131, 255, 0.26), transparent 58%)",
  },
  {
    id: "skysec",
    logo: "/public/assets/skysec-logo.png",
    name: "SKYSEC",
    tagline: "Siber Güvenlik Takımı",
    description:
      "SKY-SEC ekibi olarak biz 2020 den beri legal olarak ondan önce 2018 yılından beri ekip olmadan siber güvenlik alanında araştırma ekipleri olarak ilerlemekteydi. Şu anda ekip dinamiklerine yeni katılan biri pentesting, local pentesting (sızma testi ve kapalı ağ sızma testi) çalışmalarına ardından red teaming (saldırı senaryolarına) ardından blue team senaryoları (savunma senaryoları) üzerine çalışıyor. Sosyallik olarak Tryhackme hackthebox stackoverflow, wireshark forum ve underground platformlarda skydays ctf çağrılarıyla Türkiye de hacktrickten sonra siber güvenliğin merkezini İstanbula çekmeyi başardık. bu platformlarda dünyada ve Türkiyede ytü temsilciliği yapmaktayız. Bunların yanında SKY LAB ekipleri ve çalışmaları üzerine otomasyon güvenlik sistemi yazmaktayız. ismimiz siber güvenlik çalışma alanımız Bilgisayar bilimleri diyerek ilerleyen Mottomuz var.",
    skills: ["Linux", "Network"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.84), rgba(114, 125, 255, 0.7))",
    visual:
      "radial-gradient(circle at 18% 22%, rgba(111, 125, 255, 0.28), transparent 52%), radial-gradient(circle at 82% 78%, rgba(114, 125, 255, 0.24), transparent 56%)",
  },
  {
    id: "skysis",
    logo: "/public/assets/skysis-logo.png",
    name: "SKYSIS",
    tagline: "Gömülü Sistemler Takımı",
    description:
      "SKYSIS ekibi olarak gömülü sistemler üzerine projeler geliştirip çeşitli yarışmalara katılıyoruz. Şu anda TEKNOFEST’te son aşamasında olan Skylite ve Çedar ekibimiz büyük bir heyecanla çalışmaya devam ediyor. Ekibimizde farklı bölümlerden insanlara yer vererek, disiplinler arası bir çalışma ortamı yaratıyoruz. Hep birlikte gömülü sistemler alanında gömülü yazılım, donanım ve mekanik tasarımı alt başlıklarında kendimizi geliştiriyor bu alanlarda araştırma yazıları yazarak teknolojiyi takip ediyoruz. Temel amacımız, gömülü sistemlere ilgi duyan veya henüz bu alanda bilgi sahibi olmayan kişiler için bir topluluk oluşturmak. Ekip üyelerimiz, birlikte proje geliştirerek hem akademik hem de kariyer anlamında kendilerine katkı sağlıyorlar. Aynı zamanda grup çalışması deneyimi kazanarak, iş hayatına daha deneyimli ve donanımlı bir şekilde hazırlanıyorlar.",
    skills: ["Gömülü Sistemler"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.82), rgba(108, 119, 255, 0.68))",
    visual:
      "radial-gradient(circle at 30% 28%, rgba(111, 125, 255, 0.26), transparent 52%), radial-gradient(circle at 70% 72%, rgba(108, 119, 255, 0.22), transparent 56%)",
  },
  {
    id: "weblab",
    logo: "/public/assets/weblab-logo.png",
    name: "WEBLAB",
    tagline: "Web Takımı",
    description:
      "WEBLAB ekibi olarak, web uygulama geliştirme konusunda geniş bir yelpazede projeler yürütüyoruz. Kulübümüzün ihtiyaçlarını karşılamak amacıyla, React, Next.js, Java ve .NET gibi modern teknolojileri kullanarak hem frontend hem de backend geliştirmeleri yapıyoruz. Bu süreçte, çeşitli siteler ve uygulamalar oluşturuyor, kullanıcı deneyimini ve performansı ön planda tutarak etkili çözümler sunuyoruz. Ekip olarak, birçok farklı web uygulaması ve site geliştirerek, kulübümüzün ve diğer ilgili projelerin dijital ihtiyaçlarını karşılamayı hedefliyoruz.",
    skills: ["React", ".Net", "Java"],
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.8), rgba(102, 113, 255, 0.66))",
    visual:
      "radial-gradient(circle at 32% 26%, rgba(111, 125, 255, 0.24), transparent 50%), radial-gradient(circle at 68% 74%, rgba(102, 113, 255, 0.2), transparent 54%)",
  },
];

function App() {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const teamsSectionRef = useRef(null);
  const teamsHeaderRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const carouselPointerRef = useRef({ startX: null });

  const handleScrollToTeams = () => {
    teamsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const clampIndex = useMemo(() => {
    return (value) => {
      const len = teams.length;
      if (len === 0) return 0;
      return ((value % len) + len) % len;
    };
  }, []);

  const prevIndex = useMemo(
    () => clampIndex(activeTeamIndex - 1),
    [activeTeamIndex, clampIndex],
  );
  const nextIndex = useMemo(
    () => clampIndex(activeTeamIndex + 1),
    [activeTeamIndex, clampIndex],
  );

  const goPrev = () => {
    setActiveTeamIndex((idx) => clampIndex(idx - 1));
    setExpandedTeam(null); // Close expanded when navigating
  };

  const goNext = () => {
    setActiveTeamIndex((idx) => clampIndex(idx + 1));
    setExpandedTeam(null); // Close expanded when navigating
  };

  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleMouseEnter = (teamId) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set timeout to expand after 800ms hover
    hoverTimeoutRef.current = setTimeout(() => {
      if (expandedTeam !== teamId) {
        setExpandedTeam(teamId);
      }
    }, 800);
  };

  const handleMouseLeave = () => {
    // Clear timeout if user leaves before 800ms
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const onCarouselKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const onCarouselPointerDown = (event) => {
    carouselPointerRef.current.startX = event.clientX;
  };

  const onCarouselPointerUp = (event) => {
    const startX = carouselPointerRef.current.startX;
    carouselPointerRef.current.startX = null;
    if (startX == null) return;

    const deltaX = event.clientX - startX;
    const threshold = 40;

    if (deltaX <= -threshold) {
      goNext();
    } else if (deltaX >= threshold) {
      goPrev();
    }
  };

  return (
    <>
      <Background />
      <div className="page page--overlay">
        <header className="site-header">
          <a href="#hero" className="brand" aria-label="YTU SkyLab">
            <img
              className="brand-mark"
              src="/public/assets/favicon.ico"
              alt="SKY LAB"
            />
            <span className="brand-sub">Ar-Ge</span>
          </a>
          <nav className="nav-links" aria-label="Ana menü">
            <a href="#hero">Ana Sayfa</a>
            <a href="#teams">Ekipler</a>
            <a href="#active-forms">Başvur</a>
          </nav>
        </header>

        <main>
          <section id="hero" className="hero">
            <div className="hero-copy">
              <p className="eyebrow">YTU SkyLab Ar-Ge</p>
              <h1>Geleceğin projelerini birlikte tasarlayalım.</h1>
              <p className="lead">
                Çok disiplinli ekiplerimizle yapay zekadan web geliştirmeye,
                algoritmadan siber güvenliğe uzanan projelerde yer al.
              </p>
              <div className="hero-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleScrollToTeams}
                >
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
            <button
              className="scroll-hint"
              type="button"
              onClick={handleScrollToTeams}
              aria-label="Ekipleri keşfet"
            >
              <span>Kaydır</span>
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            <header className="section-header" ref={teamsHeaderRef}>
              <p className="eyebrow">Ekipler</p>
              <h2>SkyLab Ar-Ge ekipleri ile tanış</h2>
              <p>
                Kartlara tıklayarak veya üzerinde bekleyerek her ekibin proje
                yaklaşımını, açıklamasını ve katılımcıların kullandığı temel
                yetenekleri inceleyebilirsin.
              </p>
            </header>
            <div className="team-grid-expandable">
              {teams.map((team) => {
                const isExpanded = expandedTeam === team.id;

                return (
                  <motion.article
                    key={team.id}
                    layout
                    className={`team-card-expandable ${isExpanded ? "team-card-expandable--expanded" : ""}`}
                    style={{ "--team-accent": team.accent }}
                    onClick={() => toggleTeam(team.id)}
                    onMouseEnter={() => handleMouseEnter(team.id)}
                    onMouseLeave={handleMouseLeave}
                    initial={false}
                    animate={{
                      scale: isExpanded ? 1 : 1,
                    }}
                    transition={{
                      layout: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 350,
                        damping: 35,
                      },
                    }}
                  >
                    <motion.div layout className="team-card-expandable__header">
                      <div className="team-card__logo">
                        {team.logo ? (
                          <img
                            src={
                              team.logo.replace?.(/^\/public/, "") ?? team.logo
                            }
                            alt={`${team.name} logo`}
                          />
                        ) : (
                          <span>{team.name.slice(0, 2)}</span>
                        )}
                      </div>
                      <div className="team-card-expandable__title-group">
                        <h3 className="team-card__title">{team.name}</h3>
                        {team.tagline && (
                          <p className="team-card__tagline">{team.tagline}</p>
                        )}
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.div
                          layout
                          className="team-card-expandable__content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                            className="team-card-expandable__description"
                          >
                            {team.description}
                          </motion.p>

                          {team.skills?.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                              className="team-card-expandable__skills"
                            >
                              <div className="chip-group">
                                {team.skills.map((skill) => (
                                  <span key={skill} className="chip">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                            className="primary-button team-card-expandable__apply-btn"
                            href="mailto:skylab@ytu.edu.tr?subject=SkyLab%20Ekibi%20Başvuru"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Bu Ekibe Başvur
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <ActiveForms />

          <section id="apply" className="apply">
            <div className="apply-content">
              <h2>Kulüp hakkında soruların mı var?</h2>
              <p>
                SkyLab sitesine göz at ve kulüp hakkında daha fazla bilgi edin.
              </p>
              <a
                className="primary-button"
                target="_blank"
                href="https://yildizskylab.com/"
              >
                SKY LAB Sitesi
              </a>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a href="#hero" className="footer-brand">
            <img
              className="footer-mark"
              src="/public/assets/favicon.ico"
              alt="SKY LAB"
            />
            <span className="brand-sub">
              SKY LAB Bilgisayar Bilimleri Kulübü
            </span>
          </a>
          <div className="footer-meta">
            <p>Davutpaşa Kampüsü, İstanbul • YTU SKY LAB</p>
            <p>Tüm hakları saklıdır © {new Date().getFullYear()}.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
