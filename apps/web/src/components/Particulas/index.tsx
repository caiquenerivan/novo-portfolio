import React, { useCallback, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
  type Engine,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticulasContent: React.FC = () => {
  const particlesLoaded = async (_container?: Container): Promise<void> => {};

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 180,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#22d3ee",
        },
        links: {
          color: "#22d3ee",
          distance: 150,
          enable: true,
          opacity: 0.45,
          width: 1.2,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.7,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1.5, max: 4.5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export const Particulas: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <ParticulasContent />
    </ParticlesProvider>
  );
};
