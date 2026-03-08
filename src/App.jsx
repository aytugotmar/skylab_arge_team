import { useRef } from "react";
import "./App.css";
import Background from "./components/Background";
import ActiveForms from "./components/ActiveForms";

const teams = [
  {
    id: "airlab",
    logo: "/public/assets/airlab-logo.png",
    name: "AIRLAB",
    description:
      "Makine öğrenimi, derin öğrenme ve veri bilimi projeleriyle geleceğin teknolojilerini bugünden tasarlıyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.95), rgba(148, 158, 255, 0.8))",
  },
  {
    id: "weblab",
    logo: "/public/assets/weblab-logo.png",
    name: "WEBLAB",
    description:
      "Modern web teknolojileri (React, Vue, Node.js) kullanarak ölçeklenebilir ve kullanıcı dostu uygulamalar geliştiriyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.9), rgba(132, 143, 255, 0.76))",
  },
  {
    id: "skysec",
    logo: "/public/assets/skysec-logo.png",
    name: "SKYSEC",
    description:
      "Sistem güvenliği, penetrasyon testleri ve kriptografi üzerine çalışmalar yaparak dijital dünyayı koruyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.84), rgba(114, 125, 255, 0.7))",
  },
  {
    id: "mobilab",
    logo: "/public/assets/mobilab-logo.png",
    name: "MOBILAB",
    description:
      "Flutter ve React Native ile iOS ve Android platformlarında çalışan yenilikçi mobil deneyimler üretiyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.86), rgba(120, 131, 255, 0.72))",
  },
  {
    id: "gamelab",
    logo: "/public/assets/gamelab-logo.png",
    name: "GAMELAB",
    description:
      "Unity ve Unreal Engine kullanarak yaratıcı oyun mekanikleri ve sürükleyici dünyalar tasarlıyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.88), rgba(126, 137, 255, 0.74))",
  },
  {
    id: "skysis",
    logo: "/public/assets/skysis-logo.png",
    name: "SKYSIS",
    description:
      "Gömülü sistemler, otonom araçlar ve nesnelerin interneti üzerine çalışmalar yaparak fiziksel ve yazılım dünyasını birleştiriyoruz.",
    accent:
      "linear-gradient(160deg, rgba(111, 125, 255, 0.82), rgba(108, 119, 255, 0.68))",
  },
];

function App() {
  const teamsSectionRef = useRef(null);

  const handleScrollToTeams = () => {
    teamsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
                <span>6 Ar-Ge Ekibi</span>
                <strong>Takımını Seç</strong>
              </div>
              <div className="floating-card timeline">
                <span>Ekiplerimiz</span>
                <ul>
                  <li>AirLab</li>
                  <li>WebLab</li>
                  <li>SkySec</li>
                  <li>MobiLab</li>
                  <li>GameLab</li>
                  <li>SkySis</li>
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
            <header className="section-header">
              <p className="eyebrow">Ar-Ge Alanları</p>
              <h2>Hangi alanda çalışmak istersin?</h2>
              <p>
                Farklı teknoloji alanlarında projeler geliştiriyor, yarışmalara
                katılıyor ve birlikte öğreniyoruz.
              </p>
            </header>
            <div className="team-grid">
              {teams.map((area) => (
                <article
                  key={area.id}
                  className="team-card"
                  style={{ "--team-accent": area.accent }}
                >
                  <div className="team-card__content">
                    <div className="team-card__logo">
                      {area.logo ? (
                        <img
                          src={
                            area.logo.replace?.(/^\/public/, "") ?? area.logo
                          }
                          alt={`${area.name} logo`}
                        />
                      ) : (
                        <span>{area.name.slice(0, 2)}</span>
                      )}
                    </div>
                    <h3 className="team-card__title">{area.name}</h3>
                    <p className="team-card__description">{area.description}</p>
                    <a
                      href="mailto:skylab@ytu.edu.tr?subject=SkyLab%20Ekibi%20Başvuru"
                      className="team-card__link"
                    >
                      Ekibe Katıl →
                    </a>
                  </div>
                </article>
              ))}
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
