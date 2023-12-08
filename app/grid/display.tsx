import { useAppContext } from '../context/AppContext'

const Display = () => {
  const { displayNumber, displayColor } = useAppContext()

  if (!displayNumber || !displayColor) {
    return <></>
  }

  return (
    <div className='fixed top-2 left-2 h-10 w-56 flex items-center justify-center text-sm bg-zinc-900 text-zinc-200 bg-opacity-70 rounded-sm shadow-sm'>
      {displayNumber}: {displayColor}
    </div>
  )
}

export default Display
