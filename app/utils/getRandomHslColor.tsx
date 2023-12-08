export function getRandomHslColor () {
  const getRandomNumber = (min: number, max: number) =>
    Math.round(Math.random() * (max - min) + min)
  const { hue, saturation, lightness } = {
    hue: getRandomNumber(0, 360),
    saturation: getRandomNumber(0, 100),
    lightness: getRandomNumber(0, 100),
  }

  return {
    lightness,
    value: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
  }
}
