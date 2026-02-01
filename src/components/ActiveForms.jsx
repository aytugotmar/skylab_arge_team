import { useEffect, useMemo, useState, useRef } from "react";
import formsData from "../data/forms.json";

const DEFAULT_FORMS_FRONTEND_BASE_URL = "http://localhost:3000";

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ActiveForms() {
  const formsFrontendBaseUrl =
    import.meta.env.VITE_FORMS_FRONTEND_BASE_URL ??
    DEFAULT_FORMS_FRONTEND_BASE_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState([]);
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const carouselPointerRef = useRef({ startX: null });

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        // JSON dosyasından verileri yükle
        const list = Array.isArray(formsData) ? formsData : [];

        // Biraz gecikme ekleyerek gerçek bir API çağrısını simüle et
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!isCancelled) {
          setForms(list);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error ? err : new Error("Form listesi alınamadı"),
          );
          setForms([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const popularForms = useMemo(() => {
    const normalized = forms.filter(Boolean);

    const actives = normalized.filter((form) => {
      const activeFlag = form?.isActive ?? form?.active ?? form?.enabled;
      if (typeof activeFlag === "boolean") return activeFlag;
      return true;
    });

    const sortedByPopularity = [...actives].sort((a, b) => {
      const aCount = Number(
        a?.responseCount ?? a?.responsesCount ?? a?.responses ?? 0,
      );
      const bCount = Number(
        b?.responseCount ?? b?.responsesCount ?? b?.responses ?? 0,
      );
      if (bCount !== aCount) return bCount - aCount;

      const aDate = new Date(a?.updatedAt || 0).getTime();
      const bDate = new Date(b?.updatedAt || 0).getTime();
      return bDate - aDate;
    });

    return sortedByPopularity.slice(0, 3);
  }, [forms]);

  const clampIndex = useMemo(() => {
    return (value) => {
      const len = popularForms.length;
      if (len === 0) return 0;
      return ((value % len) + len) % len;
    };
  }, [popularForms]);

  const prevIndex = useMemo(
    () => clampIndex(activeFormIndex - 1),
    [activeFormIndex, clampIndex],
  );
  const nextIndex = useMemo(
    () => clampIndex(activeFormIndex + 1),
    [activeFormIndex, clampIndex],
  );

  const goPrev = () => setActiveFormIndex((idx) => clampIndex(idx - 1));
  const goNext = () => setActiveFormIndex((idx) => clampIndex(idx + 1));

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
    <section
      id="active-forms"
      className="active-forms"
      aria-labelledby="active-forms-title"
    >
      <header className="section-header">
        <p className="eyebrow">Formlar</p>
        <h2 id="active-forms-title">Aktif Formlar</h2>
        <p>Güncel formları buradan görüntüleyip doldurabilirsin.</p>
      </header>

      {isLoading ? (
        <div className="active-forms__state">Formlar yükleniyor…</div>
      ) : error ? (
        <div className="active-forms__state" role="status">
          Formlar yüklenemedi.
        </div>
      ) : popularForms.length === 0 ? (
        <div className="active-forms__state">
          Şu anda listelenecek aktif form bulunamadı.
        </div>
      ) : (
        <div
          className="forms-carousel"
          role="group"
          aria-label="Form carousel"
          tabIndex={0}
          onKeyDown={onCarouselKeyDown}
          onPointerDown={onCarouselPointerDown}
          onPointerUp={onCarouselPointerUp}
        >
          <button
            className="forms-carousel__button"
            type="button"
            onClick={goPrev}
            aria-label="Önceki form"
          >
            ‹
          </button>

          <div className="forms-carousel__viewport">
            {popularForms[prevIndex] ? (
              <article
                key={popularForms[prevIndex]?.id ?? `prev-${prevIndex}`}
                className="active-form-card active-form-card--carousel active-form-card--carousel-side"
                onClick={() => setActiveFormIndex(prevIndex)}
                tabIndex={-1}
              >
                <div className="active-form-card__body">
                  <h3 className="active-form-card__title">
                    {popularForms[prevIndex]?.title ?? "Başlıksız Form"}
                  </h3>
                  <p className="active-form-card__meta">
                    {popularForms[prevIndex]?.id ? (
                      <span className="mono">
                        #{popularForms[prevIndex].id}
                      </span>
                    ) : null}
                  </p>
                </div>
              </article>
            ) : null}

            {popularForms[activeFormIndex] ? (
              <article
                key={
                  popularForms[activeFormIndex]?.id ?? `main-${activeFormIndex}`
                }
                className="active-form-card active-form-card--carousel active-form-card--carousel-main"
                tabIndex={0}
              >
                <div className="active-form-card__body">
                  <h3 className="active-form-card__title">
                    {popularForms[activeFormIndex]?.title ?? "Başlıksız Form"}
                  </h3>
                  {popularForms[activeFormIndex]?.description ? (
                    <p className="active-form-card__details">
                      {popularForms[activeFormIndex].description}
                    </p>
                  ) : null}
                  <p className="active-form-card__meta">
                    {popularForms[activeFormIndex]?.id ? (
                      <span className="mono">
                        #{popularForms[activeFormIndex].id}
                      </span>
                    ) : null}
                    <span>
                      • Popülerlik:{" "}
                      {Number(
                        popularForms[activeFormIndex]?.responseCount ??
                          popularForms[activeFormIndex]?.responsesCount ??
                          popularForms[activeFormIndex]?.responses ??
                          0,
                      )}
                    </span>
                    {formatDate(popularForms[activeFormIndex]?.updatedAt) ? (
                      <span>
                        • Son güncelleme:{" "}
                        {formatDate(popularForms[activeFormIndex].updatedAt)}
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="active-form-card__actions">
                  <a
                    className="secondary-button"
                    href={
                      popularForms[activeFormIndex]?.id
                        ? `${formsFrontendBaseUrl}/${popularForms[activeFormIndex].id}`
                        : formsFrontendBaseUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Forma Git
                  </a>
                </div>
              </article>
            ) : null}

            {popularForms[nextIndex] ? (
              <article
                key={popularForms[nextIndex]?.id ?? `next-${nextIndex}`}
                className="active-form-card active-form-card--carousel active-form-card--carousel-side"
                onClick={() => setActiveFormIndex(nextIndex)}
                tabIndex={-1}
              >
                <div className="active-form-card__body">
                  <h3 className="active-form-card__title">
                    {popularForms[nextIndex]?.title ?? "Başlıksız Form"}
                  </h3>
                  <p className="active-form-card__meta">
                    {popularForms[nextIndex]?.id ? (
                      <span className="mono">
                        #{popularForms[nextIndex].id}
                      </span>
                    ) : null}
                  </p>
                </div>
              </article>
            ) : null}
          </div>

          <button
            className="forms-carousel__button"
            type="button"
            onClick={goNext}
            aria-label="Sonraki form"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
