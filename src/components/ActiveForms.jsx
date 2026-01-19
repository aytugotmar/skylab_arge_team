import { useEffect, useMemo, useState } from 'react'

const DEFAULT_API_BASE_URL = 'http://localhost:5000'
const DEFAULT_FORMS_FRONTEND_BASE_URL = 'http://localhost:3000'

function formatDate(value) {
    if (!value) return null
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

export default function ActiveForms() {
    const apiBaseUrl = import.meta.env.VITE_FORMS_API_BASE_URL ?? DEFAULT_API_BASE_URL
    const formsFrontendBaseUrl = import.meta.env.VITE_FORMS_FRONTEND_BASE_URL ?? DEFAULT_FORMS_FRONTEND_BASE_URL

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [forms, setForms] = useState([])

    useEffect(() => {
        let isCancelled = false

        async function load() {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch(`${apiBaseUrl}/api/admin/forms`)
                if (!response.ok) {
                    throw new Error(`Form listesi alınamadı (HTTP ${response.status})`)
                }

                const payload = await response.json()
                const list = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : []

                if (!isCancelled) {
                    setForms(list)
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err : new Error('Form listesi alınamadı'))
                    setForms([])
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false)
                }
            }
        }

        load()

        return () => {
            isCancelled = true
        }
    }, [apiBaseUrl])

    const popularForms = useMemo(() => {
        const normalized = forms.filter(Boolean)

        const actives = normalized.filter((form) => {
            const activeFlag = form?.isActive ?? form?.active ?? form?.enabled
            if (typeof activeFlag === 'boolean') return activeFlag
            return true
        })

        const sortedByPopularity = [...actives].sort((a, b) => {
            const aCount = Number(a?.responseCount ?? a?.responsesCount ?? a?.responses ?? 0)
            const bCount = Number(b?.responseCount ?? b?.responsesCount ?? b?.responses ?? 0)
            if (bCount !== aCount) return bCount - aCount

            const aDate = new Date(a?.updatedAt || 0).getTime()
            const bDate = new Date(b?.updatedAt || 0).getTime()
            return bDate - aDate
        })

        return sortedByPopularity.slice(0, 3)
    }, [forms])

    return (
        <section className="active-forms" aria-labelledby="active-forms-title">
            <header className="section-header">
                <p className="eyebrow">Formlar</p>
                <h2 id="active-forms-title">Aktif Formlar</h2>
                <p>Güncel formları buradan görüntüleyip doldurabilirsin.</p>
            </header>

            {isLoading ? (
                <div className="active-forms__state">Formlar yükleniyor…</div>
            ) : error ? (
                <div className="active-forms__state" role="status">
                    Formlar yüklenemedi. API adresi: <span className="mono">{apiBaseUrl}</span>
                </div>
            ) : popularForms.length === 0 ? (
                <div className="active-forms__state">Şu anda listelenecek aktif form bulunamadı.</div>
            ) : (
                <div className="active-forms__grid">
                    {popularForms.map((form) => {
                        const href = form?.id ? `${formsFrontendBaseUrl}/${form.id}` : formsFrontendBaseUrl
                        const updatedLabel = formatDate(form?.updatedAt)
                        const details =
                            form?.description ??
                            form?.detail ??
                            form?.details ??
                            form?.summary ??
                            ''
                        const responseCount = Number(form?.responseCount ?? form?.responsesCount ?? form?.responses ?? 0)

                        return (
                            <article key={form?.id ?? href} className="active-form-card">
                                <div className="active-form-card__body">
                                    <h3 className="active-form-card__title">{form?.title ?? 'Başlıksız Form'}</h3>
                                    {details ? <p className="active-form-card__details">{details}</p> : null}
                                    <p className="active-form-card__meta">
                                        {form?.id ? <span className="mono">#{form.id}</span> : null}
                                        <span>• Popülerlik: {responseCount}</span>
                                        {updatedLabel ? <span>• Son güncelleme: {updatedLabel}</span> : null}
                                    </p>
                                </div>
                                <div className="active-form-card__actions">
                                    <a className="secondary-button" href={href} target="_blank" rel="noreferrer">
                                        Forma Git
                                    </a>
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
