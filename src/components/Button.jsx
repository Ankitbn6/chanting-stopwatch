import React from 'react'

const Button = ({onClick,children,disabled}) => {
  return (
    <button disabled={disabled} className='active:border-2 rounded-xl active:border-blue-900 box-border text-white bg-blue-600 p-2 text-[22px] ml-2 active:text-black active:bg-white disabled:bg-black  ' onClick={onClick}>{children}</button>
  )
}

export default Button
