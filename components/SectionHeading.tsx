import type { ReactNode } from 'react'

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string
  title: ReactNode
  copy?: string
  light?: boolean
}) {
  return (
    <div className={`section-heading reveal${light ? ' heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}
