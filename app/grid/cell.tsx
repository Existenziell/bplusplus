import { useAppContext } from '../context/AppContext'

export type CellType = {
  number: number
  hsl: {
    value: string
    lightness: number
  }
}

const Cell = ({ number, hsl }: CellType) => {
  const { setDisplayNumber, setDisplayColor, setDisplayLightness } =
    useAppContext()

  const handleInteraction = (number: number, color: string) => {
    setDisplayColor(color)
    setDisplayNumber(number)
    setDisplayLightness(hsl.lightness)
  }

  return (
    <div
      className={`${
        hsl.lightness < 50 ? `text-zinc-100` : `text-zinc-800`
      } border text-xs h-10 w-10 shadow-sm flex items-center justify-center hover:cursor-pointer`}
      style={{ backgroundColor: hsl.value }}
      onClick={() => handleInteraction(number, hsl.value)}
    >
      {number}
    </div>
  )
}

export default Cell
