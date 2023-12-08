import Link from 'next/link'

export const BackLink = (link: { href: string }) => {
  return (
    <Link
      href={link.href}
      className='button left-2'
    >
      <p>Back</p>
    </Link>
  )
}
