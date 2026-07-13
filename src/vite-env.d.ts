/// <reference types="vite/client" />

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.svg' {
  import type { FunctionComponent, SVGAttributes } from 'react'
  const ReactComponent: FunctionComponent<SVGAttributes<SVGElement>>
  export default ReactComponent
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}
