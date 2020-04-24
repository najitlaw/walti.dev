import Wave from "react-wavify";
import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import { useEffect, useState } from "react";

export default function Home() {
  const size = useWindowSize();

  const [foo, setFoo] = useState([...Array(8).keys()]);

  const [waveHeight, setWaveHeight] = useState(0);

  useEffect(() => {
    let wn = Math.floor(size.height / 200);
    wn = wn % 2 === 0 ? wn : wn + 1;

    setFoo([...Array(wn).keys()]);
    setWaveHeight(100 / wn);
  }, [size]);

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>"
        />
        <title>walti.dev</title>
      </Head>
      <div>
        {foo.map((w) => {
          const even = w % 2 == 0;
          const points =
            Math.floor(size.width / 120) + Math.floor(Math.random() * 3);

          return (
            <Wave
              style={{
                height: `${Math.ceil(waveHeight)}vh`,
                width: "100vw",
                transform: even ? "rotate(180deg)" : "",
                marginTop: even && w !== 0 ? "-0.5rem" : "",
              }}
              fill="url(#gradient)"
              paused={false}
              options={{
                height: 60,
                amplitude: 15,
                speed: 0.3,
                points,
              }}
            >
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                  <stop offset="15%" stopColor="#ABDCFF" />
                  <stop offset="90%" stopColor="#0396FF" />
                </linearGradient>
              </defs>
            </Wave>
          );
        })}
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: yellow;
        }
      `}</style>
    </>
  );
}
