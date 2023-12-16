import Image from 'next/image'
import Link from 'next/link'

export default async function Graphs() {
  return (
    <main className='min-h-screen font-mono px-4 md:px-8 pb-16 bg-grid bg-cover bg-center text-zinc-200'>
      <Link href='/' className='button absolute top-2 left-2'>
        <p>Back</p>
      </Link>
      <h1 className='text-4xl text-center mb-8 pt-16'>Graphs</h1>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='mt-16 mb-4 text-2xl'>The Subsidy Equation</h2>
        <Image
          src='/graphs/subsidy-equation.webp'
          alt='Subsidy Equation Graph'
          width={1000}
          height={564}
          className='shadow-xl rounded-sm w-auto h-auto'
          priority
        />
        <h2 className='mt-24 mb-4 text-2xl'>The Bitcoin Citadel</h2>
        <Image
          src='/graphs/bitcoin-citadel.webp'
          alt='Bitcoin Citadel'
          width={1188}
          height={1078}
          className='shadow-xl rounded-sm'
          priority
        />
      </div>
    </main>
  )
}
