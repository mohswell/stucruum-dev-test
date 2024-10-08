import React from 'react'

function ContactInput({ label, htmlFor, ...props }) {
  return  <div className='flex flex-col w-full h-[84px] gap-[24px]'>
  <label htmlFor={htmlFor} className='font-normal text-[1.2em] leading-[20px] text-btnBg'>{label}</label>
  <input  className='w-full outline-none pb-4 h-[40px]  border-gray-400 border-b  placeholder:text-lg placeholder:font-thin placeholder:text-textGrey'  id={htmlFor} 
    {...props}
  />
</div>
}

export default ContactInput