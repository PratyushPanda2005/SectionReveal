"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import Miami from "../../../public/assets/images/miami.jpg";
import NewYork from "../../../public/assets/images/newyork.jpg";
import LosAngeles from "../../../public/assets/images/domino-studio-je9yG1os76o-unsplash.jpg";
import LasVegas from "../../../public/assets/images/leo_visions-hWX2pboBPBk-unsplash.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlayTextOriginalRef = useRef<HTMLSpanElement>(null);
  const overlayTextNewRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { y: "100%", zIndex: 10, opacity: 0 });
      gsap.set(overlay2Ref.current, { y: "100%", zIndex: 10, opacity: 0 });
      gsap.set(overlay3Ref.current, { y: "100%", zIndex: 10, opacity: 0 });
      gsap.set(image2Ref.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      // Main animations
      tl.to(
        imageContainerRef.current,
        {
          xPercent: -100,
          duration: 2,
          ease: "power2.out",
        },
        0
      )
        .to(
          textRef.current,
          {
            y: 40,
            opacity: 0.4,
            duration: 2,
            ease: "power2.out",
          },
          0
        )
        // Cross-fade images at 50% progress
        .to(
          image1Ref.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          0.5
        ) // Starts at 1 second (halfway through)
        .to(
          image2Ref.current,
          {
            opacity: 1,
            duration: 0.5,
          },
          0.5
        )
        .to(
          overlayRef.current,
          {
            y: "0%",
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          },
          0
        );

      // Phase 2: Overlay slides left to cover image (2000-3000px)
      tl.set(
        overlayRef.current,
        { zIndex: 30 }, // or whatever value you need
        ">"
      );
      tl.to(
        overlayRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: "power2.inOut",
        },
        ">"
      );


      // Phase 2: overlay1 moves left, overlay2 slides up
      tl.to(
        overlay2Ref.current,
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
        "<"
      ); // Starts at the same time as overlay1 moves left

      tl.to(
        overlayTextOriginalRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        ">" // or wherever you want it to start
      );
      
      tl.to(
        overlayTextNewRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<" // same time as above to crossfade
      );

       // Phase 3: Overlay slides left to cover image (2000-3000px)
       tl.set(
        overlay2Ref.current,
        { zIndex: 30 }, // or whatever value you need
        ">"
      );
      tl.to(
        overlay2Ref.current,
        {
          xPercent: -100,
          duration: 1,
          ease: "power2.inOut",
        },
        ">"
      );

      tl.to(
        image2Ref.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "<" // same time as overlay2 starts sliding left
      );
      
      tl.to(
        image3Ref.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "<" // same time as the fade out
      );
      

      tl.to(
        overlay3Ref.current,
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
        "<"
      ); // Starts at the same time as overlay1 moves left

      
    }, containerRef);

    

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-black h-dvh w-full flex justify-center overflow-hidden"
    >
      <div className="w-full p-2 overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-1 h-dvh gap-3 relative">
          <div
            ref={textRef}
            className="col-span-1 row-span-1 bg-[#181717] rounded-[56px] px-[24px] py-[40px] z-10"
          >
            <div className="w-full h-full">
              <h1 className="text-[#B1A596] text-4xl max-w-xs">
                Miami Private Aircraft Services
              </h1>
            </div>
          </div>

          {/* Image container that will slide */}
          <div
            ref={imageContainerRef}
            className="col-span-1 row-span-1 rounded-[56px] overflow-hidden z-20 relative"
          >
            {/* First image */}
            <div ref={image1Ref} className="absolute inset-0">
              <Image
                src={Miami}
                className="object-cover h-full w-full rounded-[56px]"
                alt="First view"
                fill
              />
            </div>
            {/* Second image */}
            <div ref={image2Ref} className="absolute inset-0">
              <Image
                src={NewYork}
                className="object-cover h-full w-full rounded-[56px]"
                alt="Second view"
                fill
              />
            </div>
          </div>

          <div
            ref={overlayRef}
            className="absolute grid col-span-1 row-span-1 rounded-[56px] bg-[#181717] z-10 h-full w-[calc(50%-6px)]"
            style={{
              left: "calc(50% + 6px)",
              top: 0,
            }}
          >
            <div className="w-full h-full p-8 text-white">
              <h1 className="text-[#B1A596] text-4xl max-w-md relative overflow-hidden">
                <span ref={overlayTextOriginalRef} className="relative inset-0 opacity-100 transition-opacity duration-300">
                  New York Premium Aviation Services
                </span>
                <span ref={overlayTextNewRef} className="absolute inset-0 opacity-0 transition-opacity duration-300">
                  Los Angeles Premium Aviation
                </span>
              </h1>
            </div>
          </div>

          {/* Second overlay (slides up when overlay1 moves left) */}
          <div
            ref={overlay2Ref}
            className="absolute grid col-span-1 row-span-1 rounded-[56px] bg-[#181717] z-20 h-full w-[calc(50%-6px)] overflow-hidden"
            style={{ left: "calc(50% + 6px)", top: 0 }}
          >
            <Image
              src={LosAngeles}
              alt=""
              className="object-cover object-center w-full h-full rounded-[56px]"
            />
            <div ref={image3Ref} className="absolute inset-0 opacity-0">
                <Image src={LasVegas} alt="" className="object-cover object-center w-full h-full rounded-[56px]"/>
            </div>
          </div>

            {/* Third overlay (slides up when overlay1 moves left) */}
            <div
            ref={overlay3Ref}
            className="absolute grid col-span-1 row-span-1 rounded-[56px] bg-[#181717] z-20 h-full w-[calc(50%-6px)] overflow-hidden"
            style={{ left: "calc(50% + 6px)", top: 0 }}
          >
           <div className="w-full h-full px-[24px] py-[40px]">
                <h1 className="text-[#B1A596] text-4xl max-w-md">Las Vegas Premium Air Services</h1>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
