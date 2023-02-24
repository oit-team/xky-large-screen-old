import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin.js'

gsap.registerPlugin(MotionPathPlugin)

export function imageFlyToTarget(src, option = {}) {
  const img = document.createElement('img')
  img.src = src
  document.body.appendChild(img)
  gsap.fromTo(
    img,
    {
      left: 0,
      top: 0,
      width: 150,
      height: 150,
      position: 'fixed',
      zIndex: 1000,
      borderRadius: '50%',
      ...option.start,
    },
    {
      motionPath: [
        { x: option.end.x - 50, y: option.end.y - 50 },
        { x: option.end.x, y: option.end.y },
      ],
      duration: 1.88,
      scale: 0,
      opacity: 1,
      ...option.end,
      onComplete: (...e) => {
        option.end?.onComplete(...e)
        img.remove()
      },
    },
  )
}
