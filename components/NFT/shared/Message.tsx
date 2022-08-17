import React from 'react'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  padding: '37.5px',
  fontFamily: 'NotoSansTC',
  fontWeight: '400',
  fontSize: '26px',
  lineHeight: '140%',
} as React.CSSProperties

const innerContainerStyle = {
  width: '100%',
  height: '100%',
  padding: '13px',
} as React.CSSProperties

function CompsNFTMessage({ color, message }) {
  return (
    <div style={{ ...compStyle, color }}>
      <div style={innerContainerStyle}>
        {message.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  )
}

export default CompsNFTMessage
