import React from 'react'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
} as React.CSSProperties

function CompsNFTBackground({ background }) {
  return <div style={{ ...compStyle, background }} />
}

export default CompsNFTBackground
