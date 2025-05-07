"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    console.clear();

    gsap.registerPlugin(ScrollTrigger);

    const video = document.querySelector<HTMLVideoElement>(".video-background");
    if (!video) return;

    const src = video.currentSrc || video.src;

    const once = (
      el: Element,
      event: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) => {
      const onceFn = function (this: Element, e: Event) {
        el.removeEventListener(event, onceFn);
        if (typeof fn === "function") {
          fn.call(this, e);
        }
      };
      el.addEventListener(event, onceFn, opts);
    };

    // iOS video activation
    once(document.documentElement, "touchstart", () => {
      video.play().then(() => video.pause()).catch(() => {});
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });

    once(video, "loadedmetadata", () => {
      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration || 1 }
      );
    });

    // Optional: iOS blob fix
    setTimeout(() => {
      if ("fetch" in window) {
        fetch(src)
          .then(res => res.blob())
          .then(blob => {
            const blobURL = URL.createObjectURL(blob);
            const current = video.currentTime;

            once(document.documentElement, "touchstart", () => {
              video.play().then(() => video.pause()).catch(() => {});
            });

            video.src = blobURL;
            video.currentTime = current + 0.01;
          });
      }
    }, 1000);
  }, []);

  return (
    <main>
      <video
        src="/assets/videos/globe.mp4"
        playsInline
        preload="auto"
        muted
        className="video-background"
      ></video>

      <div id="container" style={{ height: "500vh" }}>
      <h1 className="fixed text-5xl font-bold w-full flex justify-center text-center uppercase">Popular Destinations</h1>
      </div>
    </main>
  );
}
