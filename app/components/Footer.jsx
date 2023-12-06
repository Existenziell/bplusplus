const Footer = ({ handleClick }) => {
  return (
    <div className='text-xs text-center pb-2 overflow-hidden'>
      <a className='hover:cursor-pointer' onClick={handleClick}>
        Made with <span className='text-btc text-lg'>&#9829;</span> by Chris
      </a>
    </div>
  )
}

export default Footer
