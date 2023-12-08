import Link from 'next/link'

export const BackLink = (link: { href: string }) => {
  return (
    <Link
      href={link.href}
      className='absolute top-2 right-2 h-10 px-4 hover:cursor-pointer flex items-center justify-center text-sm bg-zinc-900 text-zinc-200 bg-opacity-70 rounded-sm shadow-sm'
    >
      <p>Back</p>
    </Link>
  )
}
