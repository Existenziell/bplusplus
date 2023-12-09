import Link from 'next/link'

export const BackLink = (link: { href: string }) => {
  return (
    <Link href={link.href} className='button absolute top-2 left-2'>
      <p>Back</p>
    </Link>
  )
}
