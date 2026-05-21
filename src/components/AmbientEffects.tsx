'use client';
import { useEffect, useState } from 'react';

export default function AmbientEffects() {
  const [scrollMsg, setScrollMsg] = useState(0);

  useEffect(() => {
    // Custom Cursor tracking
    const cursorDot = document.getElementById('cursor-dot');
    const cursorTrail = document.getElementById('cursor-trail');
    
    // Check if touch device, if so, disable custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (cursorDot) cursorDot.style.display = 'none';
      if (cursorTrail) cursorTrail.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animateTrail = () => {
      // Ease the trail towards the mouse (linear interpolation)
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      if (cursorTrail) {
        cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animateTrail);

    // Hover effect for clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, select, textarea, .clickable');
      if (isClickable && cursorTrail) {
        cursorTrail.classList.add('cursor-hovering');
      }
    };
    
    const handleMouseOut = () => {
      if (cursorTrail) {
        cursorTrail.classList.remove('cursor-hovering');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Scroll Progress tracking
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollMsg(totalScroll / windowHeight * 100);
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = scroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" className="scroll-progress-bar" />
      <div id="cursor-trail" className="custom-cursor-trail" />
      <div id="cursor-dot" className="custom-cursor-dot" />
    </>
  );
}
