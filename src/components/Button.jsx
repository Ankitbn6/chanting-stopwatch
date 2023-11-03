import React from 'react'

const Button = ({onClick,children,disabled}) => {
  return (
    <button disabled={disabled} className='border-2 rounded-xl border-blue-200 p-2 text-[22px] ml-2 active:text-white active:bg-blue-500 ' onClick={onClick}>{children}</button>
  )
}

export default Button
