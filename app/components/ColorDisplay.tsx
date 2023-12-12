import { useDisplayContext } from '../context/DisplayContext'

const ColorDisplay = () => {
  const { displayNumber, displayColor, displayLightness } = useDisplayContext()

  if (!displayNumber || !displayColor) {
    return <></>
  }

  return (
    <div
      style={{ backgroundColor: displayColor }}
      className={`${
        displayLightness < 50 ? `text-zinc-100` : `text-zinc-800`
      } fixed top-2 inset-x-0 mx-auto h-8 w-56 flex items-center justify-center text-sm bg-zinc-900 text-zinc-200 bg-opacity-70 rounded-sm shadow-sm`}
    >
      {displayNumber}: {displayColor}
    </div>
  )
}

export default ColorDisplay
