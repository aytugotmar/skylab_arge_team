import './background.css'

export default function Background() {
    return (
        <div className="forms-background" aria-hidden="true">
            <div className="forms-background__layer">
                <div className="forms-background__blob forms-background__blob--blue" />
                <div className="forms-background__blob forms-background__blob--pink" />
            </div>
        </div>
    )
}
