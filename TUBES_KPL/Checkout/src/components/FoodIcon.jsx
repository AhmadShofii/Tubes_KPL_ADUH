// Ikon garpu & pisau - fork and knife icon
export default function FoodIcon({ size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#FDEFD8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="#B23B15"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Garpu: 3 gigi di atas, batang di bawah */}
        <path d="M6 2v4c0 1.1.9 2 2 2h.5v14h1.5V8H10.5c1.1 0 2-.9 2-2V2h-1.5v3.5h-1V2H8.5v3.5h-1V2H6z" />

        {/* Pisau: blade melengkung di atas, batang lurus di bawah */}
        <path d="M15 2c0 0 3 1.5 3 5v1h-3V2z" />
        <rect x="15" y="8" width="3" height="14" rx="1" />
      </svg>
    </div>
  )
}
