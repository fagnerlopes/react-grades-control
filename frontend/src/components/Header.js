import React from 'react'

export default function Header({title}) {
  return (
    <div style={{textAlign: 'center', marginBottom: '50px'}}className="container">
      <h1>{title}</h1>
    </div>
  )
}
