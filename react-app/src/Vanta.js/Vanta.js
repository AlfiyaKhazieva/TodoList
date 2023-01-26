import React, { useState, useEffect, useRef } from 'react';
import CELLS from 'vanta/dist/vanta.cells.min';
import * as THREE from 'three';



const Vanta = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(CELLS({
        el: myRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color1: 0x31c5c5,
        color2: 0xcab1a3
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div ref={myRef} className='vanta'>
  </div>
}

export default Vanta;