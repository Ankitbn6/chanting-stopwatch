import React from 'react'

const Button = ({onClick,children,disabled}) => {
  return (
    <button disabled={disabled} className=' rounded-xl active:border-blue-900 box-border text-white bg-blue-600 p-2 text-[22px] ml-2 active:text-black active:bg-white disabled:bg-blue-300 disabled:text-white disabled:border-0  ' onClick={onClick}>{children}</button>
  )
}

export default Button
