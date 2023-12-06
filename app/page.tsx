import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen bg-grid bg-cover bg-center'>
      <div className='w-full items-center justify-between flex flex-col text-zinc-300'>
        <div className='h-full items-center justify-center flex flex-col'>
          <h1 className='text-6xl'>B++</h1>
          <h2 className='text-2xl'>Bitcoin Education</h2>
          <p className='text-xs'>coming soon...</p>
          <div className='mt-8'>
            <Image
              src={'/btc1.gif'}
              width={100}
              height={100}
              alt='Rotating BTC'
            />
          </div>
        </div>
        <div className='text-xs text-center'>
          Made with &#x1f9e1; by Chris
          <br />
          npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he
        </div>
      </div>
    </main>
  )
}
