import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Define window with VANTA
declare global {
  interface Window {
    VANTA: any;
  }
}

interface VantaBackgroundProps {
  effect?: 'waves' | 'fog' | 'clouds' | 'net' | 'cells' | 'birds' | 'globe';
}

export function VantaBackground({ effect = 'net' }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Load Vanta script
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effect}.min.js`;
    script.async = true;
    
    script.onload = () => {
      if (vantaRef.current && window.VANTA) {
        // Destroy existing effect if any
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        // Initialize new effect
        try {
          const VantaEffect = window.VANTA[effect.toUpperCase()];
          if (VantaEffect) {
            vantaEffect.current = VantaEffect({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              // NET specific options
              ...(effect === 'net' && {
                color: 'hsl(var(--primary))',
                backgroundColor: 'hsl(var(--background))',
                points: 8.00,
                maxDistance: 20.00,
                spacing: 15.00,
              }),
              // WAVES specific options
              ...(effect === 'waves' && {
                color: 'hsl(var(--primary))',
                shininess: 30.00,
                waveHeight: 15.00,
                waveSpeed: 0.75,
                zoom: 0.75,
              }),
              // FOG specific options
              ...(effect === 'fog' && {
                highlightColor: 'hsl(var(--primary))',
                midtoneColor: 'hsl(var(--secondary))',
                lowlightColor: 'hsl(var(--accent))',
                baseColor: 'hsl(var(--background))',
                blurFactor: 0.6,
                speed: 1.50,
                zoom: 1.00,
              }),
              // CLOUDS specific options
              ...(effect === 'clouds' && {
                skyColor: 'hsl(var(--background))',
                cloudColor: 'hsl(var(--primary))',
                cloudShadowColor: 'hsl(var(--secondary))',
                sunColor: 'hsl(var(--accent))',
                sunGlareColor: 'hsl(var(--primary))',
                sunlightColor: 'hsl(var(--primary))',
                speed: 0.60,
              }),
              // CELLS specific options
              ...(effect === 'cells' && {
                color1: 'hsl(var(--primary))',
                color2: 'hsl(var(--secondary))',
                size: 1.50,
                speed: 1.00,
                scale: 1.00,
              }),
              // BIRDS specific options
              ...(effect === 'birds' && {
                backgroundColor: 'hsl(var(--background))',
                color1: 'hsl(var(--primary))',
                color2: 'hsl(var(--secondary))',
                colorMode: 'lerp',
                birdSize: 1.20,
                wingSpan: 25.00,
                speedLimit: 5.00,
                separation: 35.00,
                alignment: 20.00,
                cohesion: 20.00,
                quantity: 3.00,
              }),
              // GLOBE specific options
              ...(effect === 'globe' && {
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--primary))',
                color2: 'hsl(var(--secondary))',
                size: 1.00,
                scale: 1.00,
                scaleMobile: 1.00,
              }),
            });
          }
        } catch (error) {
          console.error('Error initializing Vanta effect:', error);
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [effect]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
}