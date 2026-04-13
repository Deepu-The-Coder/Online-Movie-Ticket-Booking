import React from 'react'

const Rating= (props) => {
  return (
    <div>
        <i className="fa-solid fa-star text-[red]"></i>
        <span>{props.rating}</span>
    </div>
  )
}

export default Rating