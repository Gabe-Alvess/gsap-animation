import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const titleRef = useRef();

  const onLoad = () => {
    gsap
      .timeline()
      .fromTo(
        ".letter",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.33,
          delay: 0.7,
        }
      )
      .to(".title", {
        y: 45,
        delay: 0.7,
      })
      .to(".letter", {
        margin: "0 5vw",
        delay: 0.8,
        duration: 0.5,
      })
      .to(".letter", {
        margin: "0",
        delay: 0.8,
        duration: 0.5,
      })
      .to(".letter", {
        x: -titleRef.current.clientWidth,
        delay: 1,
        duration: 2,
        rotate: -360,
      })
      .to(window, {
        duration: 1,
        scrollTo: "#nextSection",
      })
      .to("#nextSection", {
        backgroundColor: "#000",
        color: "#fff",
        duration: 0.2,
      })
      .to(".title", {
        y: 0,
      })
      .to(".letter", {
        x: 0,
        delay: 1,
        duration: 2,
      });
  };

  const slideInTop = (el, delay, duration) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -200,
      },
      {
        opacity: 1,
        y: 0,
        delay: delay || 0.4,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
  };

  const slideInLeft = (el, delay, duration) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        delay: delay || 0.4,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  };

  const slideInRight = (el, delay, duration) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: 200,
      },
      {
        opacity: 1,
        x: 0,
        delay: delay || 0.4,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  };

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { background: "#000", color: "#fff" });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { background: "#fff", color: "#000" });
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    slideInTop("#box1");
  }, []);

  useEffect(() => {
    slideInTop("#box2");
  }, []);

  useEffect(() => {
    slideInLeft("#box3");
  }, []);

  useEffect(() => {
    slideInRight("#box4");
  }, []);

  return (
    <div className="App">
      <h1 className="title" ref={titleRef}>
        <span className="letter">H</span>
        <span className="letter">E</span>
        <span className="letter">L</span>
        <span className="letter">L</span>
        <span className="letter">O</span>
      </h1>
      <section id="nextSection">
        <div id="box1" className="box">
          Box 1
        </div>
        <div id="box2" className="box">
          Box 2
        </div>
        <div id="box3" className="box">
          Box 3
        </div>
        <div id="box4" className="box">
          Box 4
        </div>
      </section>

      <section id="lastSection">
        <div
          id="box5"
          className="box"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          Last section
        </div>
      </section>
    </div>
  );
}

export default App;
