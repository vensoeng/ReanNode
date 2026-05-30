// import { useEffect, useRef } from "react";

export default function StarryBackground() {
  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext('2d');
  //   let animationFrameId;
  //   let width = canvas.width = window.innerWidth;
  //   let height = canvas.height = window.innerHeight;

  //   canvas.style.position = 'fixed';
  //   canvas.style.top = '0';
  //   canvas.style.left = '0';
  //   canvas.style.width = '100vw';
  //   canvas.style.height = '100vh';
  //   canvas.style.zIndex = '-1'; 
  //   canvas.style.pointerEvents = 'none'; 
  //   canvas.style.willChange = 'transform';

  //   const stars = Array.from({ length: 80 }).map(() => ({ 
  //     x: Math.random() * width,
  //     y: Math.random() * height,
  //     radius: Math.random() * 1.2,
  //     speed: Math.random() * 0.4 + 0.1
  //   }));

  //   function drawStars() {
  //     ctx.clearRect(0, 0, width, height);
  //     ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; 
  //     stars.forEach(star => {
  //       ctx.beginPath();
  //       ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
  //       ctx.fill();
  //     });
  //   }

  //   function animateStars() {
  //     stars.forEach(star => {
  //       star.y += star.speed;
  //       if (star.y > height) {
  //         star.y = 0;
  //         star.x = Math.random() * width;
  //       }
  //     });
  //     drawStars();
  //     animationFrameId = requestAnimationFrame(animateStars);
  //   }

  //   animateStars();

  //   // មុខងារ handle resize
  //   const handleResize = () => {
  //     if (!canvas) return;
  //     width = canvas.width = window.innerWidth;
  //     height = canvas.height = window.innerHeight;
  //   };
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     cancelAnimationFrame(animationFrameId);
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // return <canvas ref={canvasRef} id="star-canvas" />;
}