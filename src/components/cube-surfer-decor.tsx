function Cube({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" shapeRendering="crispEdges">
      <path d="M4 4h88v88H4Z" fill="#211c14" />
      <path d="M8 8h80v64H8Z" fill="#e3292d" />
      <path d="M8 72h80v16H8Z" fill="#b71922" />
      <path d="M8 8h80v6H14v58H8Z" fill="#f14a42" />
    </svg>
  );
}

function Coin({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" shapeRendering="crispEdges">
      <path d="M24 4h32v4h12v12h8v40h-8v12H56v4H24v-4H12V60H4V20h8V8h12Z" fill="#211c14" />
      <path d="M28 10h24v4h10v10h8v32h-8v10H52v4H28v-4H18V56h-8V24h8V14h10Z" fill="#f7cf55" />
      <path d="M30 16h20v4h8v8h6v24h-6v8h-8v4H30v-4h-8v-8h-6V28h6v-8h8Z" fill="#e5aa1c" />
      <path d="M32 20h16v4h8v8h4v16h-4v8h-8v4H32v-4h-6v-8h-4V32h4v-8h6Z" fill="#ffe36a" />
      <path d="M26 24h8v32h-8Z" fill="#fff4a8" />
    </svg>
  );
}

function SpeedBoost({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 192 72" shapeRendering="crispEdges">
      <path d="M4 4h184v64H4Z" fill="#211c14" />
      <path d="M10 10h172v52H10Z" fill="#f4efe3" />
      <path d="M18 18h14l20 18-20 18H18l20-18Z" fill="#211c14" />
      <path d="M58 18h14l20 18-20 18H58l20-18Z" fill="#211c14" />
      <path d="M98 18h14l20 18-20 18H98l20-18Z" fill="#211c14" />
      <path d="M138 18h14l20 18-20 18h-14l20-18Z" fill="#211c14" />
    </svg>
  );
}

function Trophy({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" shapeRendering="crispEdges">
      <path d="M24 8h72v12h16v48H96v8H80v8H68v20h20v8h8v20H24v-20h8v-8h20V84H40v-8H24v-8H8V20h16Zm0 20h-8v32h8Zm72 0v32h8V28Z" fill="#211c14" />
      <path d="M32 16h56v32h-8v16h-8v8H48v-8h-8V48h-8Z" fill="#f7cf55" />
      <path d="M16 28h8v32h-8Zm80 0h8v32h-8Z" fill="#f7cf55" />
      <path d="M48 80h24v32H48Z" fill="#211c14" />
      <path d="M54 80h12v32H54Zm-22 32h56v12H32Z" fill="#f7cf55" />
      <path d="M40 16h12v40h-8V40h-4Z" fill="#fff1a0" />
    </svg>
  );
}

export function CubeSurferDecor() {
  return (
    <div className="cube-surfer-decor" aria-hidden="true">
      <Coin className="surfer-art surfer-art--coin-one" />
      <Coin className="surfer-art surfer-art--coin-two" />
      <Coin className="surfer-art surfer-art--coin-three" />
      <Cube className="surfer-art surfer-art--cube-one" />
      <Cube className="surfer-art surfer-art--cube-two" />
      <Cube className="surfer-art surfer-art--cube-three" />
      <SpeedBoost className="surfer-art surfer-art--boost" />
      <Trophy className="surfer-art surfer-art--trophy" />
    </div>
  );
}
