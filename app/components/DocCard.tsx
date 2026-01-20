import Link from 'next/link'

interface DocCardLink {
  href: string
  label: string
}

interface DocCardProps {
  title: string
  href: string
  description?: string
  links?: DocCardLink[]
}

export default function DocCard({ title, href, description = '', links }: DocCardProps) {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-btc">
        <Link href={href}>{title}</Link>
      </h2>
      <p className="mb-4 text-zinc-700 dark:text-zinc-300">
        {description}
      </p>
      {links && links.length > 0 && (
        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-btc hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
