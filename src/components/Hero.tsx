import { useFitText } from "../hooks/useFitText";

function Hero() {
  const { containerRef, textRef } = useFitText<HTMLHeadingElement>(20, 512);

  return (
    <div className="w-full flex items-center justify-center px-5 md:px-10 relative">
      <div ref={containerRef} className="w-full relative">
        <h1
          className="font-display font-black text-blue text-[10rem] leading-none"
          ref={textRef}
        >
          FULL STACK DEVELOPER
        </h1>
      </div>
    </div>
  );
}

export default Hero;
