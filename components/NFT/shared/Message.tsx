import React from 'react'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  padding: '35px',
  boxSizing: 'border-box',
  fontFamily: 'Cubic11',
  fontWeight: '400',
  fontSize: '26px',
  lineHeight: '150%',
  letterSpacing: '0.01em',
} as React.CSSProperties

const innerWrapperStyle = {
  width: '280px',
  height: '280px',
  padding: '8px',
} as React.CSSProperties

function CompsNFTMessage({ color, message }) {
  return (
    <div style={{ ...compStyle, color }}>
      <div style={innerWrapperStyle}>
        {message.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  )
}

export default CompsNFTMessage
