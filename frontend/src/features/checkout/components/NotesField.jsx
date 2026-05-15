import './NotesField.css'

export default function NotesField({ value, onChange }) {
  return (
    <div className="section-card">
      <div className="section-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        Notes Field
      </div>
      <textarea
        className="notes-textarea"
        placeholder="e.g. Tolong sambalnya dipisah, atau titip di lobi saja ya."
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
      />
    </div>
  )
}
