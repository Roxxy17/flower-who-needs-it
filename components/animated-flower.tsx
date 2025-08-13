"use client"

import { useEffect } from "react"

interface FlowerColors {
  primary: string
  secondary: string
  accent: string
  stem: string
  grass: string
  longGrass: string
}

interface AnimatedFlowerProps {
  colors: FlowerColors
}

export function AnimatedFlower({ colors }: AnimatedFlowerProps) {
  useEffect(() => {
    // Update CSS custom properties when colors change
    const root = document.documentElement
    root.style.setProperty("--flower-primary", colors.primary)
    root.style.setProperty("--flower-secondary", colors.secondary)
    root.style.setProperty("--flower-accent", colors.accent)
    root.style.setProperty("--flower-stem", colors.stem)
    root.style.setProperty("--flower-grass", colors.grass)
    root.style.setProperty("--flower-long-grass", colors.longGrass)
  }, [colors])

  return (
    <>
      <style jsx>{`
        @keyframes grow-grass {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes butterfly-fly {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(10vmin) translateY(-5vmin) rotate(5deg);
          }
          50% {
            transform: translateX(20vmin) translateY(-10vmin) rotate(-3deg);
          }
          75% {
            transform: translateX(15vmin) translateY(-3vmin) rotate(8deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-50vmin) scale(1.2);
          }
        }

        .flower-animation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
          perspective: 1000px;
          z-index: 10;
        }

        .night {
          position: fixed;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          filter: blur(0.1vmin);
          background-image: radial-gradient(ellipse at top, transparent 0%, #000),
            radial-gradient(ellipse at bottom, #000, rgba(145, 233, 255, 0.2)),
            repeating-linear-gradient(220deg, black 0px, black 19px, transparent 19px, transparent 22px),
            repeating-linear-gradient(189deg, black 0px, black 19px, transparent 19px, transparent 22px),
            repeating-linear-gradient(148deg, black 0px, black 19px, transparent 19px, transparent 22px),
            linear-gradient(90deg, #00fffa, #f0f0f0);
        }

        /* Added twinkling stars */
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }

        .star:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .star:nth-child(2) { top: 30%; left: 80%; animation-delay: 1s; }
        .star:nth-child(3) { top: 10%; left: 60%; animation-delay: 2s; }
        .star:nth-child(4) { top: 40%; left: 20%; animation-delay: 0.5s; }
        .star:nth-child(5) { top: 15%; left: 90%; animation-delay: 1.5s; }
        .star:nth-child(6) { top: 25%; left: 40%; animation-delay: 2.5s; }

        /* Added floating butterflies */
        .butterfly {
          position: absolute;
          top: 30%;
          left: -10%;
          width: 4vmin;
          height: 3vmin;
          animation: butterfly-fly 8s infinite linear;
          z-index: 15;
        }

        .butterfly--1 {
          animation-delay: 0s;
          top: 25%;
        }

        .butterfly--2 {
          animation-delay: 4s;
          top: 35%;
          animation-duration: 10s;
        }

        .butterfly-wing {
          position: absolute;
          width: 1.5vmin;
          height: 2vmin;
          background: linear-gradient(45deg, var(--flower-primary), var(--flower-accent));
          border-radius: 50% 10% 50% 10%;
          opacity: 0.8;
        }

        .butterfly-wing--left {
          left: 0;
          transform-origin: bottom right;
          animation: wing-flap 0.3s infinite alternate;
        }

        .butterfly-wing--right {
          right: 0;
          transform-origin: bottom left;
          transform: scaleX(-1);
          animation: wing-flap 0.3s infinite alternate-reverse;
        }

        @keyframes wing-flap {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(30deg); }
        }

        /* Enhanced floating particles */
        .magic-particle {
          position: absolute;
          bottom: 0;
          width: 0.8vmin;
          height: 0.8vmin;
          background: radial-gradient(circle, #fff, transparent);
          border-radius: 50%;
          animation: float-up 6s infinite;
        }

        .magic-particle:nth-child(odd) {
          background: radial-gradient(circle, var(--flower-primary), transparent);
        }

        .magic-particle--1 { left: 10%; animation-delay: 0s; }
        .magic-particle--2 { left: 20%; animation-delay: 1s; }
        .magic-particle--3 { left: 80%; animation-delay: 2s; }
        .magic-particle--4 { left: 90%; animation-delay: 3s; }
        .magic-particle--5 { left: 15%; animation-delay: 4s; }
        .magic-particle--6 { left: 85%; animation-delay: 5s; }

        .flowers {
          position: relative;
          transform: scale(0.9);
        }

        @media (max-width: 640px) {
          .flowers {
            transform: scale(1.35);
          }
          .flower__line {
            height: 120vh;
          }
          /* Better mobile positioning for grass */
          .flower__grass--right {
            right: -15vmin !important;
          }
          .long-g--right {
            right: -50vmin !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .flowers {
            transform: scale(1);
          }
          .flower__line {
            height: 140vh;
          }
        }

        @media (min-width: 1025px) {
          .flowers {
            transform: scale(1.05);
          }
          .flower__line {
            height: 150vh;
          }
        }

        .flower {
          position: absolute;
          bottom: 10vmin;
          transform-origin: bottom center;
          z-index: 10;
          --fl-speed: 0.8s;
        }

        .flower--1 {
          animation: moving-flower-1 4s linear infinite;
        }
        .flower--1 .flower__line {
          height: 70vmin;
          animation-delay: 0.3s;
        }
        .flower--1 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 1.6s backwards;
        }
        .flower--1 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 1.4s backwards;
        }
        .flower--1 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 1.2s backwards;
        }
        .flower--1 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1s backwards;
        }
        .flower--1 .flower__line__leaf--5 {
          animation: blooming-leaf-right var(--fl-speed) 1.8s backwards;
        }
        .flower--1 .flower__line__leaf--6 {
          animation: blooming-leaf-left var(--fl-speed) 2s backwards;
        }

        .flower--2 {
          left: 50%;
          transform: rotate(20deg);
          animation: moving-flower-2 4s linear infinite;
        }
        .flower--2 .flower__line {
          height: 60vmin;
          animation-delay: 0.6s;
        }
        .flower--2 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 1.9s backwards;
        }
        .flower--2 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 1.7s backwards;
        }
        .flower--2 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 1.5s backwards;
        }
        .flower--2 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1.3s backwards;
        }

        .flower--3 {
          left: 50%;
          transform: rotate(-15deg);
          animation: moving-flower-3 4s linear infinite;
        }
        .flower--3 .flower__line {
          animation-delay: 0.9s;
        }
        .flower--3 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 2.5s backwards;
        }
        .flower--3 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 2.3s backwards;
        }
        .flower--3 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 2.1s backwards;
        }
        .flower--3 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1.9s backwards;
        }

        .flower__leafs {
          position: relative;
          animation: blooming-flower 2s backwards;
        }
        .flower__leafs--1 {
          animation-delay: 1.1s;
        }
        .flower__leafs--2 {
          animation-delay: 1.4s;
        }
        .flower__leafs--3 {
          animation-delay: 1.7s;
        }
        .flower__leafs::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -100%);
          width: 8vmin;
          height: 8vmin;
          background-color: #6bf0ff;
          filter: blur(10vmin);
        }

        .flower__leaf {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: var(--flower-primary);
          background-image: linear-gradient(to top, var(--flower-secondary), var(--flower-primary));
          transform-origin: bottom center;
          opacity: 0.9;
          box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
        }
        .flower__leaf--1 {
          transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
        }
        .flower__leaf--2 {
          transform: translate(-50%, -4%) rotateX(40deg);
        }
        .flower__leaf--3 {
          transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
        }
        .flower__leaf--4 {
          width: 8vmin;
          height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
          background-image: linear-gradient(to top, var(--flower-accent), var(--flower-primary));
          z-index: 1;
          opacity: 0.8;
        }

        .flower__white-circle {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background-color: #fff;
        }
        .flower__white-circle::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          border-radius: inherit;
          background-image: linear-gradient(90deg, #ffeb12, #ffce00);
        }

        .flower__line {
          height: 55vmin;
          width: 1.5vmin;
          background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.2)),
            linear-gradient(to top, transparent 10%, var(--flower-stem), var(--flower-accent));
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
          animation: grow-flower-tree 4s backwards;
        }

        .flower__line__leaf {
          --w: 7vmin;
          --h: calc(var(--w) + 2vmin);
          position: absolute;
          top: 20%;
          left: 90%;
          width: var(--w);
          height: var(--h);
          border-top-right-radius: var(--h);
          border-bottom-left-radius: var(--h);
          background-image: linear-gradient(to top, rgba(20, 117, 122, 0.4), var(--flower-accent));
        }
        .flower__line__leaf--1 {
          transform: rotate(70deg) rotateY(30deg);
        }
        .flower__line__leaf--2 {
          top: 45%;
          transform: rotate(70deg) rotateY(30deg);
        }
        .flower__line__leaf--3,
        .flower__line__leaf--4,
        .flower__line__leaf--6 {
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: var(--h);
          border-bottom-right-radius: var(--h);
          left: -460%;
          top: 12%;
          transform: rotate(-70deg) rotateY(30deg);
        }
        .flower__line__leaf--4 {
          top: 40%;
        }
        .flower__line__leaf--5 {
          top: 0;
          transform-origin: left;
          transform: rotate(70deg) rotateY(30deg) scale(0.6);
        }
        .flower__line__leaf--6 {
          top: -2%;
          left: -450%;
          transform-origin: right;
          transform: rotate(-70deg) rotateY(30deg) scale(0.6);
        }

        .flower__light {
          position: absolute;
          bottom: 0vmin;
          width: 1vmin;
          height: 1vmin;
          background-color: #fffb00;
          border-radius: 50%;
          filter: blur(0.2vmin);
          animation: light-ans 4s linear infinite backwards;
        }
        .flower__light:nth-child(odd) {
          background-color: #23f0ff;
        }
        .flower__light--1 {
          left: -2vmin;
          animation-delay: 1s;
        }
        .flower__light--2 {
          left: 3vmin;
          animation-delay: 0.5s;
        }
        .flower__light--3 {
          left: -6vmin;
          animation-delay: 0.3s;
        }
        .flower__light--4 {
          left: 6vmin;
          animation-delay: 0.9s;
        }
        .flower__light--5 {
          left: -1vmin;
          animation-delay: 1.5s;
        }
        .flower__light--6 {
          left: -4vmin;
          animation-delay: 3s;
        }
        .flower__light--7 {
          left: 3vmin;
          animation-delay: 2s;
        }
        .flower__light--8 {
          left: -6vmin;
          animation-delay: 3.5s;
        }

        .flower__grass {
          --c: var(--flower-grass);
          --line-w: 1.5vmin;
          position: absolute;
          bottom: 12vmin;
          left: -7vmin;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          z-index: 20;
          transform-origin: bottom center;
          transform: rotate(-48deg) rotateY(40deg);
        }
        .flower__grass--1 {
          animation: moving-grass 2s linear infinite;
        }
        .flower__grass--2 {
          left: 2vmin;
          bottom: 10vmin;
          transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
          opacity: 0.8;
          z-index: 0;
          animation: moving-grass--2 1.5s linear infinite;
        }

        /* Added right side grass */
        .flower__grass--right {
          right: -7vmin;
          left: auto;
          transform: rotate(48deg) rotateY(-40deg) scaleX(-1);
          animation: moving-grass-right 2s linear infinite;
        }

        .flower__grass--right-2 {
          right: 2vmin;
          left: auto;
          bottom: 10vmin;
          transform: scale(0.5) rotate(-75deg) rotateX(10deg) rotateY(200deg) scaleX(-1);
          opacity: 0.8;
          z-index: 0;
          animation: moving-grass--right-2 1.5s linear infinite;
        }

        @keyframes moving-grass-right {
          0%, 100% {
            transform: rotate(48deg) rotateY(-40deg) scaleX(-1);
          }
          50% {
            transform: rotate(50deg) rotateY(-40deg) scaleX(-1);
          }
        }

        @keyframes moving-grass--right-2 {
          0%, 100% {
            transform: scale(0.5) rotate(-75deg) rotateX(10deg) rotateY(200deg) scaleX(-1);
          }
          50% {
            transform: scale(0.5) rotate(-79deg) rotateX(10deg) rotateY(200deg) scaleX(-1);
          }
        }

        .flower__grass--top {
          width: 7vmin;
          height: 10vmin;
          border-top-right-radius: 100%;
          border-right: var(--line-w) solid var(--c);
          transform-origin: bottom center;
          transform: rotate(-2deg);
          animation: grow-grass 1.5s 0.5s backwards;
          animation-fill-mode: backwards;
        }
        .flower__grass--bottom {
          margin-top: -2px;
          width: var(--line-w);
          height: 25vmin;
          background-image: linear-gradient(to top, transparent, var(--c));
          animation: grow-grass 1.5s 0.5s backwards;
          animation-fill-mode: backwards;
        }

        .flower__grass__leaf {
          --size: 10vmin;
          position: absolute;
          width: calc(var(--size) * 2.1);
          height: var(--size);
          border-top-left-radius: 100%;
          border-top-right-radius: 100%;
          background-image: linear-gradient(to top, transparent, transparent 30%, var(--c));
          z-index: 100;
        }
        .flower__grass__leaf--1 {
          top: -6%;
          left: 30%;
          --size: 6vmin;
          transform: rotate(-20deg);
          animation: growing-grass-ans--1 2s 2.6s backwards;
        }
        .flower__grass__leaf--2 {
          top: -5%;
          left: -110%;
          --size: 6vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--2 2s 2.4s linear backwards;
        }
        .flower__grass__leaf--3 {
          top: 5%;
          left: 60%;
          --size: 8vmin;
          transform: rotate(-18deg) rotateX(-20deg);
          animation: growing-grass-ans--3 2s 2.2s linear backwards;
        }
        .flower__grass__leaf--4 {
          top: 6%;
          left: -135%;
          --size: 8vmin;
          transform: rotate(2deg);
          animation: growing-grass-ans--4 2s 2s linear backwards;
        }
        .flower__grass__leaf--5 {
          top: 20%;
          left: 60%;
          --size: 10vmin;
          transform: rotate(-24deg) rotateX(-20deg);
          animation: growing-grass-ans--5 2s 1.8s linear backwards;
        }
        .flower__grass__leaf--6 {
          top: 22%;
          left: -180%;
          --size: 10vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--6 2s 1.6s linear backwards;
        }
        .flower__grass__leaf--7 {
          top: 39%;
          left: 70%;
          --size: 10vmin;
          transform: rotate(-10deg);
          animation: growing-grass-ans--7 2s 1.4s linear backwards;
        }
        .flower__grass__leaf--8 {
          top: 40%;
          left: -215%;
          --size: 11vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--8 2s 1.2s linear backwards;
        }

        .long-g {
          position: absolute;
          bottom: 25vmin;
          left: -42vmin;
          transform-origin: bottom left;
        }
        .long-g--1 {
          bottom: 0vmin;
          transform: scale(0.8) rotate(-5deg);
        }
        .long-g--2,
        .long-g--3 {
          bottom: -3vmin;
          left: -35vmin;
          transform-origin: center;
          transform: scale(0.6) rotateX(60deg);
        }
        .long-g--3 {
          left: -17vmin;
          bottom: 0vmin;
        }

        /* Added right side long grass */
        .long-g--right {
          right: -42vmin;
          left: auto;
          transform-origin: bottom right;
          transform: scale(0.8) rotate(5deg) scaleX(-1);
        }

        .long-g--right-2 {
          right: -35vmin;
          left: auto;
          bottom: -3vmin;
          transform-origin: center;
          transform: scale(0.6) rotateX(60deg) scaleX(-1);
        }

        .long-g--right-3 {
          right: -17vmin;
          left: auto;
          bottom: 0vmin;
          transform-origin: center;
          transform: scale(0.6) rotateX(60deg) scaleX(-1);
        }

        .long-g .leaf {
          --w: 15vmin;
          --h: 40vmin;
          --c: var(--flower-long-grass);
          position: absolute;
          bottom: 0;
          width: var(--w);
          height: var(--h);
          border-top-left-radius: 100%;
          border-left: 2vmin solid var(--c);
          -webkit-mask-image: linear-gradient(to top, transparent 20%, #000);
          transform-origin: bottom center;
        }
        .long-g .leaf--0 {
          left: 2vmin;
          animation: leaf-ans-1 4s linear infinite;
        }
        .long-g .leaf--1 {
          --w: 5vmin;
          --h: 60vmin;
          animation: leaf-ans-1 4s linear infinite;
        }
        .long-g .leaf--2 {
          --w: 10vmin;
          --h: 40vmin;
          left: -0.5vmin;
          bottom: 5vmin;
          transform-origin: bottom left;
          transform: rotateY(-180deg);
          animation: leaf-ans-2 3s linear infinite;
        }
        .long-g .leaf--3 {
          --w: 5vmin;
          --h: 30vmin;
          left: -1vmin;
          bottom: 3.2vmin;
          transform-origin: bottom left;
          transform: rotate(-10deg) rotateY(-180deg);
          animation: leaf-ans-3 3s linear infinite;
        }

        @keyframes leaf-ans-1 {
          0%, 100% {
            transform: rotate(-5deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.1);
          }
        }
        @keyframes leaf-ans-2 {
          0%, 100% {
            transform: rotateY(-180deg) rotate(5deg);
          }
          50% {
            transform: rotateY(-180deg) rotate(0deg) scale(1.1);
          }
        }
        @keyframes leaf-ans-3 {
          0%, 100% {
            transform: rotate(-10deg) rotateY(-180deg);
          }
          50% {
            transform: rotate(-20deg) rotateY(-180deg);
          }
        }

        @keyframes light-ans {
          0% {
            opacity: 0;
            transform: translateY(0vmin);
          }
          25% {
            opacity: 1;
            transform: translateY(-5vmin) translateX(-2vmin);
          }
          50% {
            opacity: 1;
            transform: translateY(-15vmin) translateX(2vmin);
            filter: blur(0.2vmin);
          }
          75% {
            transform: translateY(-20vmin) translateX(-2vmin);
            filter: blur(0.2vmin);
          }
          100% {
            transform: translateY(-30vmin);
            opacity: 0;
            filter: blur(1vmin);
          }
        }

        @keyframes moving-flower-1 {
          0%, 100% {
            transform: rotate(2deg);
          }
          50% {
            transform: rotate(-2deg);
          }
        }
        @keyframes moving-flower-2 {
          0%, 100% {
            transform: rotate(18deg);
          }
          50% {
            transform: rotate(14deg);
          }
        }
        @keyframes moving-flower-3 {
          0%, 100% {
            transform: rotate(-18deg);
          }
          50% {
            transform: rotate(-20deg) rotateY(-10deg);
          }
        }

        @keyframes blooming-leaf-right {
          0% {
            transform-origin: left;
            transform: rotate(70deg) rotateY(30deg) scale(0);
          }
        }
        @keyframes blooming-leaf-left {
          0% {
            transform-origin: right;
            transform: rotate(-70deg) rotateY(30deg) scale(0);
          }
        }
        @keyframes grow-flower-tree {
          0% {
            height: 0;
            border-radius: 1vmin;
          }
        }
        @keyframes blooming-flower {
          0% {
            transform: scale(0);
          }
        }
        @keyframes moving-grass {
          0%, 100% {
            transform: rotate(-48deg) rotateY(40deg);
          }
          50% {
            transform: rotate(-50deg) rotateY(40deg);
          }
        }
        @keyframes moving-grass--2 {
          0%, 100% {
            transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
          }
          50% {
            transform: scale(0.5) rotate(79deg) rotateX(10deg) rotateY(-200deg);
          }
        }

        @keyframes growing-grass-ans--1 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-20deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--2 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--3 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-18deg) rotateX(-20deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--4 {
          0% {
            transform-origin: bottom right;
            transform: rotate(2deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--5 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-24deg) rotateX(-20deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--6 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--7 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-10deg) scale(0);
          }
        }
        @keyframes growing-grass-ans--8 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }

        /* New floating clouds */
        .clouds {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          opacity: 0.6;
          animation: float-cloud 20s infinite linear;
        }

        .cloud::before,
        .cloud::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
        }

        .cloud--1 {
          width: 8vmin;
          height: 3vmin;
          top: 15%;
          left: -10%;
          animation-delay: 0s;
        }

        .cloud--1::before {
          width: 5vmin;
          height: 5vmin;
          top: -2vmin;
          left: 1vmin;
        }

        .cloud--1::after {
          width: 6vmin;
          height: 4vmin;
          top: -1vmin;
          right: 1vmin;
        }

        .cloud--2 {
          width: 6vmin;
          height: 2.5vmin;
          top: 25%;
          left: -8%;
          animation-delay: 10s;
          animation-duration: 25s;
        }

        .cloud--2::before {
          width: 4vmin;
          height: 4vmin;
          top: -1.5vmin;
          left: 0.5vmin;
        }

        .cloud--2::after {
          width: 5vmin;
          height: 3vmin;
          top: -0.5vmin;
          right: 0.5vmin;
        }

        .cloud--3 {
          width: 10vmin;
          height: 4vmin;
          top: 8%;
          left: -12%;
          animation-delay: 15s;
          animation-duration: 30s;
        }

        .cloud--3::before {
          width: 6vmin;
          height: 6vmin;
          top: -2.5vmin;
          left: 1.5vmin;
        }

        .cloud--3::after {
          width: 7vmin;
          height: 5vmin;
          top: -1.5vmin;
          right: 1.5vmin;
        }

        @keyframes float-cloud {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(120vw);
          }
        }

        /* Fireflies */
        .firefly {
          position: absolute;
          width: 0.6vmin;
          height: 0.6vmin;
          background: radial-gradient(circle, #ffff88, #ffff88 40%, transparent 70%);
          border-radius: 50%;
          animation: firefly-dance 8s infinite;
          box-shadow: 0 0 1vmin #ffff88;
        }

        .firefly--1 {
          top: 40%;
          left: 20%;
          animation-delay: 0s;
        }

        .firefly--2 {
          top: 50%;
          left: 70%;
          animation-delay: 2s;
          animation-duration: 10s;
        }

        .firefly--3 {
          top: 35%;
          left: 45%;
          animation-delay: 4s;
          animation-duration: 12s;
        }

        .firefly--4 {
          top: 60%;
          left: 15%;
          animation-delay: 6s;
          animation-duration: 9s;
        }

        @keyframes firefly-dance {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.8;
          }
          25% {
            transform: translate(5vmin, -3vmin);
            opacity: 1;
          }
          50% {
            transform: translate(-3vmin, -8vmin);
            opacity: 0.6;
          }
          75% {
            transform: translate(8vmin, -2vmin);
            opacity: 1;
          }
        }

        /* Shooting stars */
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 0 1px white, 0 0 0 2px white, 0 0 10px white;
          animation: shooting 3s infinite;
          opacity: 0;
        }

        .shooting-star--1 {
          top: 10%;
          left: 80%;
          animation-delay: 5s;
        }

        .shooting-star--2 {
          top: 20%;
          left: 60%;
          animation-delay: 15s;
        }

        .shooting-star--3 {
          top: 15%;
          left: 90%;
          animation-delay: 25s;
        }

        @keyframes shooting {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(-45deg) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(-45deg) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateX(-50vmin) translateY(30vmin) rotate(-45deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-60vmin) translateY(40vmin) rotate(-45deg) scale(0);
          }
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 1px;
          background: linear-gradient(90deg, white, transparent);
          transform: translateX(-20px);
        }

        /* Glowing orbs */
        .glowing-orb {
          position: absolute;
          width: 1.5vmin;
          height: 1.5vmin;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
          animation: orb-float 6s infinite ease-in-out;
          box-shadow: 0 0 2vmin rgba(255, 255, 255, 0.5);
        }

        .glowing-orb--1 {
          top: 45%;
          left: 10%;
          animation-delay: 0s;
          background: radial-gradient(circle, rgba(173, 216, 230, 0.8), rgba(173, 216, 230, 0.2));
          box-shadow: 0 0 2vmin rgba(173, 216, 230, 0.5);
        }

        .glowing-orb--2 {
          top: 55%;
          left: 85%;
          animation-delay: 2s;
          background: radial-gradient(circle, rgba(255, 182, 193, 0.8), rgba(255, 182, 193, 0.2));
          box-shadow: 0 0 2vmin rgba(255, 182, 193, 0.5);
        }

        .glowing-orb--3 {
          top: 30%;
          left: 30%;
          animation-delay: 4s;
          background: radial-gradient(circle, rgba(144, 238, 144, 0.8), rgba(144, 238, 144, 0.2));
          box-shadow: 0 0 2vmin rgba(144, 238, 144, 0.5);
        }

        @keyframes orb-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-2vmin) scale(1.1);
            opacity: 1;
          }
        }

        /* Mountain silhouette */
        .mountains {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
          z-index: 1;
        }

        .mountain {
          position: absolute;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .mountain--1 {
          left: 0;
          width: 25%;
          height: 60%;
          clip-path: polygon(0% 100%, 30% 40%, 60% 60%, 100% 20%, 100% 100%);
        }

        .mountain--2 {
          left: 20%;
          width: 30%;
          height: 80%;
          clip-path: polygon(0% 100%, 20% 60%, 50% 30%, 80% 50%, 100% 100%);
        }

        .mountain--3 {
          right: 0;
          width: 35%;
          height: 70%;
          clip-path: polygon(0% 100%, 25% 50%, 60% 35%, 90% 45%, 100% 100%);
        }

        /* Audio controls */
        .audio-controls {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .audio-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .audio-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .cloud {
            transform: scale(0.7);
          }
          
          .firefly {
            transform: scale(0.8);
          }
          
          .glowing-orb {
            transform: scale(0.6);
          }
          
          .audio-controls {
            bottom: 10px;
            right: 10px;
            padding: 8px;
          }
          
          .audio-toggle {
            font-size: 1.2rem;
            padding: 6px;
          }
        }
      `}</style>

      <div className="flower-animation-container">
        <div className="night"></div>

        {/* Floating clouds */}
        <div className="clouds">
          <div className="cloud cloud--1"></div>
          <div className="cloud cloud--2"></div>
          <div className="cloud cloud--3"></div>
        </div>

        {/* Mountain silhouettes */}
        <div className="mountains">
          <div className="mountain mountain--1"></div>
          <div className="mountain mountain--2"></div>
          <div className="mountain mountain--3"></div>
        </div>

        {/* Enhanced stars */}
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>

        {/* Shooting stars */}
        <div className="shooting-star shooting-star--1"></div>
        <div className="shooting-star shooting-star--2"></div>
        <div className="shooting-star shooting-star--3"></div>

        {/* Fireflies */}
        <div className="firefly firefly--1"></div>
        <div className="firefly firefly--2"></div>
        <div className="firefly firefly--3"></div>
        <div className="firefly firefly--4"></div>

        {/* Glowing orbs */}
        <div className="glowing-orb glowing-orb--1"></div>
        <div className="glowing-orb glowing-orb--2"></div>
        <div className="glowing-orb glowing-orb--3"></div>

        {/* Existing butterflies and particles */}
        <div className="butterfly butterfly--1">
          <div className="butterfly-wing butterfly-wing--left"></div>
          <div className="butterfly-wing butterfly-wing--right"></div>
        </div>
        <div className="butterfly butterfly--2">
          <div className="butterfly-wing butterfly-wing--left"></div>
          <div className="butterfly-wing butterfly-wing--right"></div>
        </div>

        <div className="magic-particle magic-particle--1"></div>
        <div className="magic-particle magic-particle--2"></div>
        <div className="magic-particle magic-particle--3"></div>
        <div className="magic-particle magic-particle--4"></div>
        <div className="magic-particle magic-particle--5"></div>
        <div className="magic-particle magic-particle--6"></div>

        <div className="flowers">
          {/* Flower 1 */}
          <div className="flower flower--1">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
              <div className="flower__line__leaf flower__line__leaf--5"></div>
              <div className="flower__line__leaf flower__line__leaf--6"></div>
            </div>
            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>

          {/* Flower 2 */}
          <div className="flower flower--2">
            <div className="flower__leafs flower__leafs--2">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          {/* Flower 3 */}
          <div className="flower flower--3">
            <div className="flower__leafs flower__leafs--3">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          {/* Left Side Grass Elements */}
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          </div>

          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
          </div>

          <div className="flower__grass flower__grass--right">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          </div>

          <div className="flower__grass flower__grass--right-2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
          </div>

          {/* Left Side Long Grass Elements */}
          <div className="long-g long-g--1">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>

          <div className="long-g long-g--2">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>

          <div className="long-g long-g--3">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>

          <div className="long-g long-g--right">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>

          <div className="long-g long-g--right-2">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>

          <div className="long-g long-g--right-3">
            <div className="leaf leaf--0"></div>
            <div className="leaf leaf--1"></div>
            <div className="leaf leaf--2"></div>
            <div className="leaf leaf--3"></div>
          </div>
        </div>
      </div>

      <div className="audio-controls">
        <button
          className="audio-toggle"
          onClick={() => {
            const audio = document.getElementById("background-audio") as HTMLAudioElement
            if (audio.paused) {
              audio.play()
              ;(document.querySelector(".audio-toggle") as HTMLElement).innerHTML = "🔊"
            } else {
              audio.pause()
              ;(document.querySelector(".audio-toggle") as HTMLElement).innerHTML = "🔇"
            }
          }}
        >
          🔇
        </button>
      </div>

      <audio id="background-audio" loop preload="auto" style={{ display: "none" }}>
        <source src="/placeholder.mp3?query=peaceful nature sounds with gentle wind and birds" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  )
}
