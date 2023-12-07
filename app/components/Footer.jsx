const Footer = ({ handleClick }) => (
  <div className='text-xs text-center pb-2 overflow-hidden'>
    <p className='hover:cursor-pointer hover:underline' onClick={handleClick}>
      Made with <span className='text-btc text-lg'>&#9829;</span> by Chris
    </p>
  </div>
)

export default Footer
