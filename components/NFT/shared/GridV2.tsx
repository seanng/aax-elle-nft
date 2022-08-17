import React from 'react'

function CompsNFTGridV2({ color, opacity = '1' }) {
  return (
    <div style={{ position: 'absolute', margin: '37.5px', opacity }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 274 274"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ICONS */}
        <path d="M260.501 39.5V26.5H247.511V13.51H234.511V0.51001H169.511V13.51H156.511V26.5H143.511V52.51H130.521V26.5H117.521V13.51H104.521V0.51001H39.5007V13.51H26.5007V26.5H13.5107V39.5H0.510742V156.5H13.5107V169.5H26.5007V195.5H39.5007V208.5H52.5007V221.49H65.4907V234.49H78.4907V247.49H91.4908V260.48H104.481V273.48H169.491V260.48H182.481V247.49H195.481V234.49H208.481V221.49H221.471V208.5H234.471V195.5H247.471V169.5H260.461V156.5H273.461V39.5H260.461H260.501ZM247.511 65.5V130.51H234.511V156.51H221.511V182.51H208.521V195.51H195.521V208.51H182.521V221.5H169.531V234.5H143.521V247.5H130.531V234.5H104.521V221.5H91.5307V208.51H78.5307V195.51H65.5307V182.51H52.5407V156.51H39.5407V130.51H26.5407V65.5H39.5407V39.5H52.5407V26.5H91.5407V39.5H104.531V65.5H117.531V78.5H130.531V91.5H117.531V104.49H104.531V117.49H117.531V130.49H130.531V143.48H117.531V156.48H104.531V169.48H117.531V182.47H130.531V195.47H117.531V221.47H130.531V234.47H143.521V221.47H156.521V208.48H143.521V195.48H169.531V182.48H156.531V169.49H143.531V156.49H156.531V130.49H143.531V117.49H130.541V104.49H143.531V91.5H156.531V65.49H169.531V39.49H182.521V26.49H221.521V39.49H234.521V52.49H247.521V65.48L247.511 65.5ZM156.511 117.5H143.511V104.5H156.511V117.5Z" />

        {/* GRID */}
        <path d="M234.501 0H0.0107422V274H274.011V117.5V0H234.501ZM273.011 247.38H260.631V235H273.011V247.38ZM260.381 26.38H247.631V13.63H260.381V26.38ZM260.381 39H247.631V26.63H260.381V39ZM273.011 52.38H260.631V40H273.011V52.38ZM260.381 52.38H247.631V40H260.381V52.38ZM260.381 65.38H247.631V52.63H260.381V65.38ZM260.381 77.99H247.631V65.63H260.381V77.99ZM260.381 104.38H247.631V91.63H260.381V104.38ZM260.381 117H247.631V104.63H260.381V117ZM273.011 130.38H260.631V118.01H273.011V130.38ZM260.381 130.38H247.631V118.01H260.381V130.38ZM260.381 143.38H247.631V130.63H260.381V143.38ZM260.381 156H247.631V143.62H260.381V156ZM273.011 169.38H260.631V157H273.011V169.38ZM260.381 169.38H247.631V157H260.381V169.38ZM260.381 182.38H247.631V169.63H260.381V182.38ZM260.381 195H247.631V182.63H260.381V195ZM273.011 208.38H260.631V196H273.011V208.38ZM260.381 208.38H247.631V196H260.381V208.38ZM260.381 221.38H247.631V208.63H260.381V221.38ZM260.381 234H247.631V221.63H260.381V234ZM13.6307 235H26.3807V247.38H13.6307V235ZM13.6307 196H26.3807V208.38H13.6307V196ZM13.6307 157H26.3807V169.38H13.6307V157ZM13.6307 118H26.3807V130.37H13.6307V118ZM13.6307 79H26.3807V91.37H13.6307V79ZM13.6307 39.99H26.3807V52.37H13.6307V39.99ZM247.381 65.37H235.001V52.62H247.381V65.37ZM247.381 77.98H235.001V65.62H247.381V77.98ZM247.381 104.37H235.001V91.62H247.381V104.37ZM247.381 116.99H235.001V104.62H247.381V116.99ZM247.381 143.37H235.001V130.62H247.381V143.37ZM247.381 182.37H235.001V169.62H247.381V182.37ZM247.381 221.37H235.001V208.62H247.381V221.37ZM26.6307 208.62H39.0107V221.37H26.6307V208.62ZM26.6307 169.62H39.0107V182.37H26.6307V169.62ZM26.6307 130.62H39.0107V143.37H26.6307V130.62ZM26.6307 91.62H39.0107V104.37H26.6307V91.62ZM26.6307 52.62H39.0107V65.37H26.6307V52.62ZM234.001 130.37H221.631V118H234.001V130.37ZM221.381 65.37H208.631V52.62H221.381V65.37ZM221.381 77.98H208.631V65.62H221.381V77.98ZM221.381 104.37H208.631V91.62H221.381V104.37ZM221.381 116.99H208.631V104.62H221.381V116.99ZM221.381 143.37H208.631V130.62H221.381V143.37ZM221.381 182.37H208.631V169.62H221.381V182.37ZM52.6307 169.62H65.3807V182.37H52.6307V169.62ZM52.6307 130.62H65.3807V143.37H52.6307V130.62ZM52.6307 91.62H65.3807V104.37H52.6307V91.62ZM208.381 77.98H196.001V65.62H208.381V77.98ZM208.381 104.37H196.001V91.62H208.381V104.37ZM208.381 116.99H196.001V104.62H208.381V116.99ZM208.381 143.37H196.001V130.62H208.381V143.37ZM208.381 182.37H196.001V169.62H208.381V182.37ZM65.6307 169.62H78.0007V182.37H65.6307V169.62ZM65.6307 130.62H78.0007V143.37H65.6307V130.62ZM65.6307 91.62H78.0007V104.37H65.6307V91.62ZM182.381 104.37H169.631V91.62H182.381V104.37ZM182.381 116.99H169.631V104.62H182.381V116.99ZM182.381 143.37H169.631V130.62H182.381V143.37ZM91.6308 130.62H104.381V143.37H91.6308V130.62ZM169.381 104.37H157.001V91.62H169.381V104.37ZM169.381 116.99H157.001V104.62H169.381V116.99ZM169.381 143.37H157.001V130.62H169.381V143.37ZM104.631 130.62H117.001V143.37H104.631V130.62ZM130.381 143.37H118.001V130.62H130.381V143.37ZM130.631 130.62H143.381V143.37H130.631V130.62ZM143.631 130.62H156.001V143.37H143.631V130.62ZM143.631 130.37V118H156.001V130.37H143.631ZM143.381 130.37H130.631V118H143.381V130.37ZM130.381 130.37H118.001V118H130.381V130.37ZM118.001 143.62H130.381V156H118.001V143.62ZM130.631 143.62H143.381V156H130.631V143.62ZM143.631 143.62H156.001V156H143.631V143.62ZM104.631 118H117.001V130.37H104.631V118ZM117.001 143.62V156H104.631V143.62H117.001ZM169.381 156H157.001V143.62H169.381V156ZM157.001 130.38V118.01H169.381V130.38H157.001ZM156.001 117.01H143.631V104.63H156.001V117.01ZM143.381 117.01H130.631V104.63H143.381V117.01ZM130.381 117.01H118.001V104.63H130.381V117.01ZM117.001 117.01H104.631V104.63H117.001V117.01ZM104.381 117.01H91.6308V104.63H104.381V117.01ZM91.6308 118.01H104.381V130.38H91.6308V118.01ZM104.381 143.63V156.01H91.6308V143.63H104.381ZM91.6308 157.01H104.381V169.39H91.6308V157.01ZM104.631 157.01H117.001V169.39H104.631V157.01ZM118.001 157.01H130.381V169.39H118.001V157.01ZM130.631 157.01H143.381V169.39H130.631V157.01ZM143.631 157.01H156.001V169.39H143.631V157.01ZM157.001 157.01H169.381V169.39H157.001V157.01ZM169.631 157.01H182.381V169.39H169.631V157.01ZM182.381 156.01H169.631V143.63H182.381V156.01ZM169.631 130.39V118.02H182.381V130.39H169.631ZM169.631 91.39V79.02H182.381V91.39H169.631ZM169.381 79.02V91.39H157.001V79.02H169.381ZM156.001 104.39H143.631V91.64H156.001V104.39ZM143.381 104.39H130.631V91.64H143.381V104.39ZM130.381 104.39H118.001V91.64H130.381V104.39ZM117.001 104.39H104.631V91.64H117.001V104.39ZM104.381 104.39H91.6308V91.64H104.381V104.39ZM91.3808 104.39H79.0007V91.64H91.3808V104.39ZM91.3808 104.64V117.02H79.0007V104.64H91.3808ZM79.0007 118.02H91.3808V130.39H79.0007V118.02ZM91.3808 130.64V143.39H79.0007V130.64H91.3808ZM91.3808 143.64V156.02H79.0007V143.64H91.3808ZM79.0007 157.02H91.3808V169.4H79.0007V157.02ZM91.3808 169.64V182.39H79.0007V169.64H91.3808ZM91.6308 169.64H104.381V182.39H91.6308V169.64ZM104.631 169.64H117.001V182.39H104.631V169.64ZM118.001 169.64H130.381V182.39H118.001V169.64ZM130.631 169.64H143.381V182.39H130.631V169.64ZM143.631 169.64H156.001V182.39H143.631V169.64ZM157.001 169.64H169.381V182.39H157.001V169.64ZM169.631 169.64H182.381V182.39H169.631V169.64ZM182.631 169.64H195.001V182.39H182.631V169.64ZM182.631 169.39V157.01H195.001V169.39H182.631ZM182.631 156.01V143.63H195.001V156.01H182.631ZM182.631 143.39V130.64H195.001V143.39H182.631ZM182.631 130.39V118.02H195.001V130.39H182.631ZM182.631 117.01V104.64H195.001V117.01H182.631ZM182.631 104.39V91.64H195.001V104.39H182.631ZM182.631 91.39V79.02H195.001V91.39H182.631ZM156.001 91.39H143.631V79.02H156.001V91.39ZM143.381 91.39H130.631V79.02H143.381V91.39ZM130.381 91.39H118.001V79.02H130.381V91.39ZM117.001 91.39H104.631V79.02H117.001V91.39ZM104.381 91.39H91.6308V79.02H104.381V91.39ZM91.3808 91.39H79.0007V79.02H91.3808V91.39ZM79.0007 182.64H91.3808V195.01H79.0007V182.64ZM91.6308 182.64H104.381V195.01H91.6308V182.64ZM104.631 182.64H117.001V195.01H104.631V182.64ZM118.001 182.64H130.381V195.01H118.001V182.64ZM130.631 182.64H143.381V195.01H130.631V182.64ZM143.631 182.64H156.001V195.01H143.631V182.64ZM157.001 182.64H169.381V195.01H157.001V182.64ZM169.631 182.64H182.381V195.01H169.631V182.64ZM182.631 182.64H195.001V195.01H182.631V182.64ZM65.6307 79.01H78.0007V91.38H65.6307V79.01V79.01ZM78.0007 104.63V117.01H65.6307V104.63H78.0007ZM65.6307 118.01H78.0007V130.38H65.6307V118.01ZM78.0007 143.63V156.01H65.6307V143.63H78.0007ZM65.6307 157.01H78.0007V169.39H65.6307V157.01ZM78.0007 182.63V195H65.6307V182.63H78.0007ZM208.381 195H196.001V182.63H208.381V195ZM196.001 169.38V157H208.381V169.38H196.001ZM208.381 156H196.001V143.62H208.381V156ZM196.001 130.38V118.01H208.381V130.38H196.001ZM196.001 91.38V79.01H208.381V91.38H196.001ZM195.001 77.99H182.631V65.63H195.001V77.99ZM182.381 77.99H169.631V65.63H182.381V77.99ZM169.381 77.99H157.001V65.63H169.381V77.99ZM156.001 78.01H143.631V65.63H156.001V78.01ZM143.381 78.01H130.631V65.63H143.381V78.01ZM130.381 78.01H118.001V65.63H130.381V78.01ZM117.001 78.01H104.631V65.63H117.001V78.01ZM104.381 78.01H91.6308V65.63H104.381V78.01ZM91.3808 78.01H79.0007V65.63H91.3808V78.01ZM78.0007 78.01H65.6307V65.63H78.0007V78.01ZM65.3807 78.01H52.6307V65.63H65.3807V78.01ZM52.6307 79.01H65.3807V91.38H52.6307V79.01ZM65.3807 104.63V117.01H52.6307V104.63H65.3807ZM52.6307 118.01H65.3807V130.38H52.6307V118.01ZM65.3807 143.63V156.01H52.6307V143.63H65.3807ZM52.6307 157.01H65.3807V169.39H52.6307V157.01ZM65.3807 182.63V195H52.6307V182.63H65.3807ZM52.6307 196H65.3807V208.38H52.6307V196ZM65.6307 196H78.0007V208.38H65.6307V196ZM79.0007 196H91.3808V208.38H79.0007V196ZM91.6308 196H104.381V208.38H91.6308V196ZM104.631 196H117.001V208.38H104.631V196ZM118.001 196H130.381V208.38H118.001V196ZM130.631 196H143.381V208.38H130.631V196ZM143.631 196H156.001V208.38H143.631V196ZM157.001 196H169.381V208.38H157.001V196ZM169.631 196H182.381V208.38H169.631V196ZM182.631 196H195.001V208.38H182.631V196ZM196.001 196H208.381V208.38H196.001V196ZM208.631 196H221.381V208.38H208.631V196ZM221.381 195H208.631V182.63H221.381V195ZM208.631 169.38V157H221.381V169.38H208.631ZM221.381 156H208.631V143.62H221.381V156ZM208.631 130.38V118.01H221.381V130.38H208.631ZM208.631 91.38V79.01H221.381V91.38H208.631ZM208.381 65.38H196.001V52.63H208.381V65.38ZM195.001 65.38H182.631V52.63H195.001V65.38ZM182.381 65.38H169.631V52.63H182.381V65.38ZM169.381 65.38H157.001V52.63H169.381V65.38ZM156.001 65.38H143.631V52.63H156.001V65.38ZM143.381 65.38H130.631V52.63H143.381V65.38ZM130.381 65.38H118.001V52.63H130.381V65.38ZM117.001 65.38H104.631V52.63H117.001V65.38ZM104.381 65.38H91.6308V52.63H104.381V65.38ZM91.3808 65.38H79.0007V52.63H91.3808V65.38ZM78.0007 65.38H65.6307V52.63H78.0007V65.38ZM65.3807 65.38H52.6307V52.63H65.3807V65.38ZM52.3807 65.38H40.0007V52.63H52.3807V65.38ZM52.3807 65.63V78.01H40.0007V65.63H52.3807ZM40.0007 79.01H52.3807V91.38H40.0007V79.01ZM52.3807 91.63V104.38H40.0007V91.63H52.3807ZM52.3807 104.63V117.01H40.0007V104.63H52.3807ZM40.0007 118.01H52.3807V130.38H40.0007V118.01ZM52.3807 130.63V143.38H40.0007V130.63H52.3807ZM52.3807 143.63V156.01H40.0007V143.63H52.3807ZM40.0007 157.01H52.3807V169.39H40.0007V157.01ZM52.3807 169.63V182.38H40.0007V169.63H52.3807ZM52.3807 182.63V195H40.0007V182.63H52.3807ZM40.0007 196H52.3807V208.38H40.0007V196ZM52.3807 208.63V221.38H40.0007V208.63H52.3807ZM52.6307 208.63H65.3807V221.38H52.6307V208.63ZM65.6307 208.63H78.0007V221.38H65.6307V208.63ZM79.0007 208.63H91.3808V221.38H79.0007V208.63ZM91.6308 208.63H104.381V221.38H91.6308V208.63ZM104.631 208.63H117.001V221.38H104.631V208.63ZM118.001 208.63H130.381V221.38H118.001V208.63ZM130.631 208.63H143.381V221.38H130.631V208.63ZM143.631 208.63H156.001V221.38H143.631V208.63ZM157.001 208.63H169.381V221.38H157.001V208.63ZM169.631 208.63H182.381V221.38H169.631V208.63ZM182.631 208.63H195.001V221.38H182.631V208.63ZM196.001 208.63H208.381V221.38H196.001V208.63ZM208.631 208.63H221.381V221.38H208.631V208.63ZM221.631 208.63H234.001V221.38H221.631V208.63ZM221.631 208.38V196H234.001V208.38H221.631ZM221.631 195V182.63H234.001V195H221.631ZM221.631 182.38V169.63H234.001V182.38H221.631ZM221.631 169.38V157H234.001V169.38H221.631ZM221.631 156V143.62H234.001V156H221.631ZM221.631 143.38V130.63H234.001V143.38H221.631ZM221.631 117V104.63H234.001V117H221.631ZM221.631 104.38V91.63H234.001V104.38H221.631ZM221.631 91.38V79.01H234.001V91.38H221.631ZM221.631 77.99V65.63H234.001V77.99H221.631ZM221.631 65.38V52.63H234.001V65.38H221.631ZM221.631 52.38V40H234.001V52.38H221.631ZM221.381 52.38H208.631V40H221.381V52.38ZM208.381 52.38H196.001V40H208.381V52.38ZM195.001 52.38H182.631V40H195.001V52.38ZM182.381 52.38H169.631V40H182.381V52.38ZM169.381 52.38H157.001V40H169.381V52.38ZM156.001 52.38H143.631V40H156.001V52.38ZM143.381 52.38H130.631V40H143.381V52.38ZM130.381 52.38H118.001V40H130.381V52.38ZM117.001 52.38H104.631V40H117.001V52.38ZM104.381 52.38H91.6308V40H104.381V52.38ZM91.3808 52.38H79.0007V40H91.3808V52.38ZM78.0007 52.38H65.6307V40H78.0007V52.38ZM65.3807 52.38H52.6307V40H65.3807V52.38ZM52.3807 52.38H40.0007V40H52.3807V52.38ZM40.0007 221.63H52.3807V234H40.0007V221.63ZM52.6207 221.63H65.3707V234H52.6207V221.63ZM65.6207 221.63H77.9907V234H65.6207V221.63ZM78.9907 221.63H91.3707V234H78.9907V221.63ZM91.6207 221.63H104.371V234H91.6207V221.63ZM104.621 221.63H116.991V234H104.621V221.63ZM117.991 221.63H130.371V234H117.991V221.63ZM130.621 221.63H143.371V234H130.621V221.63ZM143.621 221.63H155.991V234H143.621V221.63ZM156.991 221.63H169.371V234H156.991V221.63ZM169.621 221.63H182.371V234H169.621V221.63ZM182.621 221.63H194.991V234H182.621V221.63ZM195.991 221.63H208.371V234H195.991V221.63ZM208.621 221.63H221.371V234H208.621V221.63ZM221.621 221.63H233.991V234H221.621V221.63ZM26.6307 40H39.0107V52.38H26.6307V40ZM39.0107 65.63V78.01H26.6307V65.63H39.0107ZM26.6307 79.01H39.0107V91.38H26.6307V79.01ZM39.0107 104.63V117.01H26.6307V104.63H39.0107ZM26.6307 118.01H39.0107V130.38H26.6307V118.01ZM39.0107 143.63V156.01H26.6307V143.63H39.0107ZM26.6307 157.01H39.0107V169.39H26.6307V157.01ZM39.0107 182.63V195H26.6307V182.63H39.0107ZM26.6307 196H39.0107V208.38H26.6307V196ZM39.0107 221.63V234H26.6307V221.63H39.0107ZM247.391 234H235.011V221.63H247.391V234ZM235.011 208.38V196H247.391V208.38H235.011ZM247.391 195H235.011V182.63H247.391V195ZM235.011 169.38V157H247.391V169.38H235.011ZM247.391 156H235.011V143.62H247.391V156ZM235.011 130.38V118.01H247.391V130.38H235.011ZM235.011 91.38V79.01H247.391V91.38H235.011ZM235.011 52.38V40H247.391V52.38H235.011ZM247.391 39H235.011V26.63H247.391V39ZM234.011 39H221.641V26.63H234.011V39ZM221.391 39H208.641V26.63H221.391V39ZM208.391 39H196.011V26.63H208.391V39ZM195.011 39H182.641V26.63H195.011V39ZM182.391 39H169.641V26.63H182.391V39ZM169.391 39H157.011V26.63H169.391V39ZM156.011 39H143.641V26.63H156.011V39ZM143.391 39H130.641V26.63H143.391V39ZM130.391 39H118.011V26.63H130.391V39ZM117.011 39H104.641V26.63H117.011V39ZM104.391 39H91.6407V26.63H104.391V39ZM91.3907 39H79.0107V26.63H91.3907V39ZM78.0107 39H65.6407V26.63H78.0107V39ZM65.3907 39H52.6407V26.63H65.3907V39ZM52.3907 39H40.0107V26.63H52.3907V39ZM39.0107 39H26.6307V26.63H39.0107V39ZM26.3907 39H13.6407V26.63H26.3907V39ZM26.3907 52.63V65.38H13.6407V52.63H26.3907ZM13.3907 65.38H1.02074V52.63H13.3907V65.38ZM26.3907 65.63V78.01H13.6407V65.63H26.3907ZM26.3907 91.63V104.38H13.6407V91.63H26.3907ZM13.3907 104.38H1.02074V91.63H13.3907V104.38ZM26.3907 104.63V117.01H13.6407V104.63H26.3907ZM26.3907 130.63V143.38H13.6407V130.63H26.3907ZM13.3907 143.38H1.02074V130.63H13.3907V143.38ZM26.3907 143.63V156.01H13.6407V143.63H26.3907ZM26.3907 169.63V182.38H13.6407V169.63H26.3907ZM13.3907 182.38H1.02074V169.63H13.3907V182.38ZM26.3907 182.63V195H13.6407V182.63H26.3907ZM26.3907 208.63V221.38H13.6407V208.63H26.3907ZM13.3907 221.38H1.02074V208.63H13.3907V221.38ZM26.3907 221.63V234H13.6407V221.63H26.3907ZM26.6407 235H39.0207V247.38H26.6407V235ZM40.0207 235H52.4007V247.38H40.0207V235ZM52.6407 235H65.3907V247.38H52.6407V235ZM65.6407 235H78.0107V247.38H65.6407V235ZM79.0107 235H91.3907V247.38H79.0107V235ZM91.6407 235H104.391V247.38H91.6407V235ZM104.641 235H117.011V247.38H104.641V235ZM118.011 235H130.391V247.38H118.011V235ZM130.641 235H143.391V247.38H130.641V235ZM143.641 235H156.011V247.38H143.641V235ZM157.011 235H169.391V247.38H157.011V235ZM169.641 235H182.391V247.38H169.641V235ZM182.641 235H195.011V247.38H182.641V235ZM196.011 235H208.391V247.38H196.011V235ZM208.641 235H221.391V247.38H208.641V235ZM221.641 235H234.011V247.38H221.641V235ZM235.011 235H247.391V247.38H235.011V235ZM247.641 235H260.391V247.38H247.641V235ZM247.641 91.38V79.01H260.391V91.38H247.641ZM260.641 79.01H273.021V91.38H260.641V79.01ZM247.391 26.38H235.011V13.63H247.391V26.38ZM234.011 26.38H221.641V13.63H234.011V26.38ZM221.391 26.38H208.641V13.63H221.391V26.38ZM208.391 26.38H196.011V13.63H208.391V26.38ZM195.011 26.38H182.641V13.63H195.011V26.38ZM182.391 26.38H169.641V13.63H182.391V26.38ZM169.391 26.38H157.011V13.63H169.391V26.38ZM156.011 26.38H143.641V13.63H156.011V26.38ZM143.391 26.38H130.641V13.63H143.391V26.38ZM130.391 26.38H118.011V13.63H130.391V26.38ZM117.011 26.38H104.641V13.63H117.011V26.38ZM104.391 26.38H91.6407V13.63H104.391V26.38ZM91.3907 26.38H79.0107V13.63H91.3907V26.38ZM78.0107 26.38H65.6407V13.63H78.0107V26.38ZM65.3907 26.38H52.6407V13.63H65.3907V26.38ZM52.3907 26.38H40.0107V13.63H52.3907V26.38ZM39.0107 26.38H26.6307V13.63H39.0107V26.38ZM26.3907 26.38H13.6407V13.63H26.3907V26.38ZM13.3907 26.38H1.02074V13.63H13.3907V26.38ZM13.3907 26.63V39H1.02074V26.63H13.3907ZM13.3907 40V52.38H1.02074V40H13.3907ZM1.02074 65.63H13.3907V78.01H1.02074V65.63ZM13.3907 79.01V91.38H1.02074V79.01H13.3907ZM1.02074 104.63H13.3907V117.01H1.02074V104.63ZM13.3907 118.01V130.38H1.02074V118.01H13.3907ZM1.02074 143.63H13.3907V156.01H1.02074V143.63ZM13.3907 157.01V169.39H1.02074V157.01H13.3907ZM1.02074 182.63H13.3907V195H1.02074V182.63ZM13.3907 196V208.38H1.02074V196H13.3907ZM1.02074 221.63H13.3907V234H1.02074V221.63ZM13.3907 235V247.38H1.02074V235H13.3907ZM1.02074 247.63H13.3907V260.38H1.02074V247.63ZM13.6407 247.63H26.3907V260.38H13.6407V247.63ZM26.6407 247.63H39.0207V260.38H26.6407V247.63ZM40.0207 247.63H52.4007V260.38H40.0207V247.63ZM52.6407 247.63H65.3907V260.38H52.6407V247.63ZM65.6407 247.63H78.0107V260.38H65.6407V247.63ZM79.0107 247.63H91.3907V260.38H79.0107V247.63ZM91.6407 247.63H104.391V260.38H91.6407V247.63ZM104.641 247.63H117.011V260.38H104.641V247.63ZM118.011 247.63H130.391V260.38H118.011V247.63ZM130.641 247.63H143.391V260.38H130.641V247.63ZM143.641 247.63H156.011V260.38H143.641V247.63ZM157.011 247.63H169.391V260.38H157.011V247.63ZM169.641 247.63H182.391V260.38H169.641V247.63ZM182.641 247.63H195.011V260.38H182.641V247.63ZM196.011 247.63H208.391V260.38H196.011V247.63ZM208.641 247.63H221.391V260.38H208.641V247.63ZM221.641 247.63H234.011V260.38H221.641V247.63ZM235.011 247.63H247.391V260.38H235.011V247.63ZM247.641 247.63H260.391V260.38H247.641V247.63ZM260.641 247.63H273.021V260.38H260.641V247.63ZM260.641 234V221.63H273.021V234H260.641ZM260.641 221.38V208.63H273.021V221.38H260.641ZM260.641 195V182.63H273.021V195H260.641ZM260.641 182.38V169.63H273.021V182.38H260.641ZM260.641 156V143.62H273.021V156H260.641ZM260.641 143.38V130.63H273.021V143.38H260.641ZM260.641 117V104.63H273.021V117H260.641ZM260.641 104.38V91.63H273.021V104.38H260.641ZM260.641 77.99V65.63H273.021V77.99H260.641ZM260.641 65.38V52.63H273.021V65.38H260.641ZM260.641 39V26.63H273.021V39H260.641ZM260.641 26.38V13.63H273.021V26.38H260.641ZM273.021 1V13.38H260.641V1H273.021ZM260.391 1V13.38H247.641V1H260.391ZM247.391 13.38H235.011V1H247.391V13.38ZM234.011 1V13.38H221.641V1H234.011ZM221.391 1V13.38H208.641V1H221.391ZM208.391 13.38H196.011V1H208.391V13.38ZM195.011 1V13.38H182.641V1H195.011ZM182.391 1V13.38H169.641V1H182.391ZM169.391 13.38H157.011V1H169.391V13.38ZM156.011 1V13.38H143.641V1H156.011ZM143.391 1V13.38H130.641V1H143.391ZM130.391 13.38H118.011V1H130.391V13.38ZM117.011 1V13.38H104.641V1H117.011ZM104.391 1V13.38H91.6407V1H104.391ZM91.3907 13.38H79.0107V1H91.3907V13.38ZM78.0107 1V13.38H65.6407V1H78.0107ZM65.3907 1V13.38H52.6407V1H65.3907ZM52.3907 13.38H40.0107V1H52.3907V13.38ZM39.0107 1V13.38H26.6307V1H39.0107ZM26.3907 1V13.38H13.6407V1H26.3907ZM13.3907 13.38H1.02074V1H13.3907V13.38ZM1.02074 273.01V260.63H13.3907V273.01H1.02074ZM13.6407 273.01V260.63H26.3907V273.01H13.6407ZM26.6407 260.63H39.0207V273.01H26.6407V260.63ZM40.0207 273.01V260.63H52.4007V273.01H40.0207ZM52.6407 273.01V260.63H65.3907V273.01H52.6407ZM65.6407 260.63H78.0107V273.01H65.6407V260.63ZM79.0107 273.01V260.63H91.3907V273.01H79.0107ZM91.6407 273.01V260.63H104.391V273.01H91.6407ZM104.641 260.63H117.011V273.01H104.641V260.63ZM118.011 273.01V260.63H130.391V273.01H118.011ZM130.641 273.01V260.63H143.391V273.01H130.641ZM143.641 260.63H156.011V273.01H143.641V260.63ZM157.011 273.01V260.63H169.391V273.01H157.011ZM169.641 273.01V260.63H182.391V273.01H169.641ZM182.641 260.63H195.011V273.01H182.641V260.63ZM196.011 273.01V260.63H208.391V273.01H196.011ZM208.641 273.01V260.63H221.391V273.01H208.641ZM221.641 260.63H234.011V273.01H221.641V260.63ZM235.011 273.01V260.63H247.391V273.01H235.011ZM247.641 273.01V260.63H260.391V273.01H247.641ZM260.641 260.63H273.021V273.01H260.641V260.63Z" />
      </svg>
    </div>
  )
}

export default CompsNFTGridV2

// Structure of Definition
// fill="url(#gradientFill)"
// <defs>
//   <radialGradient id="gradientFill" gradientUnits="userSpaceOnUse">
//     <stop offset="0%" stopColor="red" />
//     <stop offset="100%" stopColor="blue" />
//   </radialGradient>
//   <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
//     <stop offset="0%" stopColor="red" />
//     <stop offset="100%" stopColor="blue" />
//   </linearGradient>
// </defs>
