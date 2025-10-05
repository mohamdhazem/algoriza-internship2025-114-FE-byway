import { useEffect, useRef, useState } from "react";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // 2s
          const stepTime = 20;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              clearInterval(timer);
              setCount(target);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <h3 ref={ref} className="text-[32px] font-semibold">
      {count}+
    </h3>
  );
};

export const StatsSection = () => {
  return (
    <div className="flex justify-between bg-[#F8FAFC] text-[#0F172A] my-20 py-10 px-20">
      <div className="flex flex-col items-center">
        <Counter target={250} />
        <p className="text-[14px]">Courses by our best mentors</p>
      </div>

      <div className="w-1 h-14 bg-[#E2E8F0]"></div>

      <div className="flex flex-col items-center">
        <Counter target={1000} />
        <p className="text-[14px]">Courses by our best mentors</p>
      </div>

      <div className="w-1 h-14 bg-[#E2E8F0]"></div>

      <div className="flex flex-col items-center">
        <Counter target={15} />
        <p className="text-[14px]">Courses by our best mentors</p>
      </div>

      <div className="w-1 h-14 bg-[#E2E8F0]"></div>

      <div className="flex flex-col items-center">
        <Counter target={2400} />
        <p className="text-[14px]">Courses by our best mentors</p>
      </div>
    </div>
  );
}
