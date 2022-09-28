import React from 'react'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  padding: '35px',
  boxSizing: 'border-box',
  fontFamily: '"Noto Sans TC", "NotoSansTC"',
  fontWeight: '400',
  fontSize: '26px',
  lineHeight: '140%',
} as React.CSSProperties

const innerWrapperStyle = {
  width: '275px',
  height: '275px',
  padding: '9px 12px 12px',
} as React.CSSProperties

const imgStyle = {
  width: '350px',
  height: '350px',
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
