import { HTMLAttributes, useEffect, useRef, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import StationImage from "@happy-run/assets/images/stations.png";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { animateFadeInLeft, animateFadeInRight } from "../components/animate";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";

export type StationSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const StationSection: FC<StationSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const events = useEventPageContext();
  const { isDesktop } = useResponsive();
  const station1Ref = useRef<HTMLDivElement>(null);
  const station2Ref = useRef<HTMLDivElement>(null);
  const station3Ref = useRef<HTMLDivElement>(null);
  const station4Ref = useRef<HTMLDivElement>(null);
  const station5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!isDesktop) return;
      animateFadeInRight(station1Ref?.current);
      animateFadeInRight(station2Ref?.current);
      animateFadeInLeft(station3Ref?.current);
      animateFadeInRight(station4Ref?.current);
      animateFadeInLeft(station5Ref?.current);
    }, 200);
  }, [isDesktop]);

  return (
    <div className={cn(className)}>
      <div className="w-[95%] md:w-[90%] mx-auto pt-[40rem]">
        <SectionHeading
          //   ref={headingRef}
          className="text-[12rem] md:text-[25rem] p-[3rem_40rem] md:p-[10rem_70rem] italic font-extrabold mb-[10rem]"
        >
          {t("happy_run.station_heading")}
        </SectionHeading>
        <div className="relative pt-[50rem] md:pt-[150rem]">
          <img
            src={StationImage}
            className="w-full md:w-[80%]"
            alt="Stations image"
          />
          <div className="absolute top-[10%] md:top-0 right-[30%] md:right-[22%]">
            <div className="absolute top-[30%] left-[-65%] md:top-[60%] md:left-[-30%] w-[50rem] md:w-[150rem] aspect-square">
              <Canvas flat linear>
                <Model
                  matcapUrl={cleanPath(
                    `${env.ASSET_URL}/happy-run/matcap.png`
                  )}
                />
              </Canvas>
            </div>
            <div ref={station1Ref}>
              <Typography.Paragraph className="text-[12rem] md:text-[23rem] font-extrabold mt-[10rem] uppercase text-[#002172] md:text-hr-ember">
                {t("happy_run.station_n", { number: 1 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[12rem] md:text-[28rem] text-hr-blue font-extrabold leading-[12rem] md:leading-[35rem]">
                {parser(events.variables.station_1_name_vn?.value || "")}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[8rem] md:text-[18rem] text-hr-blue  mt-[10rem]">
                {parser(events.variables.station_1_desc_vn?.value || "")}
              </Typography.Paragraph>
            </div>
          </div>
          <div className="absolute top-[25%] right-[18%] md:top-[25%] md:right-[9%]">
            <div className="absolute top-[-10%] right-[75%] md:right-[95%] w-[60rem] md:w-[160rem] aspect-square">
              <Canvas flat linear>
                <Model
                  matcapUrl={cleanPath(
                    `${env.ASSET_URL}/happy-run/matcap_4.png`
                  )}
                />
              </Canvas>
            </div>
            <div ref={station2Ref}>
              <Typography.Paragraph className="text-[12rem] md:text-[23rem] font-extrabold mt-[10rem] uppercase text-[#04A39B] md:text-hr-ember">
                {t("happy_run.station_n", { number: 2 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[12rem] md:text-[28rem] text-hr-blue font-extrabold leading-[12rem] md:leading-[35rem]">
                {parser(events.variables.station_2_name_vn?.value || "")}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[8rem] md:text-[18rem] text-hr-blue  mt-[10rem]">
                {parser(events.variables.station_2_desc_vn?.value || "")}
              </Typography.Paragraph>
            </div>
          </div>
          <div className="absolute top-[40%] md:top-[45%] left-[6%] md:left-[0%] text-right">
            <div className="absolute top-[-60%] left-[85%] w-[80rem] md:w-[220rem] aspect-square">
              <Canvas flat linear>
                <Model
                  matcapUrl={cleanPath(
                    `${env.ASSET_URL}/happy-run/matcap_3.png`
                  )}
                />
              </Canvas>
            </div>
            <div ref={station3Ref}>
              <Typography.Paragraph className="text-[12rem] md:text-[23rem] font-extrabold mt-[10rem] uppercase text-[#92B109] md:text-hr-ember">
                {t("happy_run.station_n", { number: 3 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[12rem] md:text-[28rem] text-hr-blue font-extrabold leading-[12rem] md:leading-[35rem]">
                {parser(events.variables.station_3_name_vn?.value || "")}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[8rem] md:text-[18rem] text-hr-blue  mt-[10rem]">
                {parser(events.variables.station_3_desc_vn?.value || "")}
              </Typography.Paragraph>
            </div>
          </div>
          <div className="absolute top-[42%] md:top-[52%] right-[16%] md:right-[-3%]">
            <div className="absolute top-[70%] md:top-[0%] right-[-85%] md:right-[85%] w-[90rem] md:w-[230rem] aspect-square">
              <Canvas flat linear>
                <Model
                  matcapUrl={cleanPath(
                    `${env.ASSET_URL}/happy-run/matcap_2.png`
                  )}
                />
              </Canvas>
            </div>
            <div ref={station4Ref}>
              <Typography.Paragraph className="text-[12rem] md:text-[23rem] font-extrabold mt-[10rem] uppercase text-[#E29F12] md:text-hr-ember">
                {t("happy_run.station_n", { number: 4 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[12rem] md:text-[28rem] text-hr-blue font-extrabold leading-[12rem] md:leading-[35rem]">
                {parser(events.variables.station_4_name_vn?.value || "")}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[8rem] md:text-[18rem] text-hr-blue  mt-[10rem]">
                {parser(events.variables.station_4_desc_vn?.value || "")}
              </Typography.Paragraph>
            </div>
          </div>
          <div className="absolute bottom-[10%] left-[40%] md:left-[23%] text-right">
            <div className="absolute top-[-40%] left-[65%] md:top-[-10%] md:left-[85%] w-[100rem] md:w-[260rem] aspect-square">
              <Canvas flat linear>
                <Model
                  matcapUrl={cleanPath(
                    `${env.ASSET_URL}/happy-run/matcap_5.png`
                  )}
                />
              </Canvas>
            </div>
            <div ref={station5Ref}>
              <Typography.Paragraph className="text-[12rem] md:text-[23rem] font-extrabold mt-[10rem] uppercase text-[#D93C1C] md:text-hr-ember">
                {t("happy_run.station_n", { number: 5 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[12rem] md:text-[28rem] text-hr-blue font-extrabold leading-[12rem] md:leading-[35rem]">
                {parser(events.variables.station_5_name_vn?.value || "")}
              </Typography.Paragraph>
              <Typography.Paragraph className="hidden md:block text-[8rem] md:text-[18rem] text-hr-blue  mt-[10rem]">
                {parser(events.variables.station_5_desc_vn?.value || "")}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:hidden w-[90%] mx-auto pb-[20rem]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Typography.Paragraph className="text-[12rem] font-extrabold mt-[10rem] uppercase text-hr-ember">
                {t("happy_run.station_n", { number: index + 1 })}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[14rem] text-hr-blue font-extrabold leading-[18rem]">
                {parser(
                  events.variables?.[`station_${index + 1}_name_vn`]?.value ||
                    ""
                )}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[10rem] text-hr-blue  mt-[0rem]">
                {parser(
                  events.variables?.[`station_${index + 1}_desc_vn`]?.value ||
                    ""
                )}
              </Typography.Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type ModelProps = {
  matcapUrl?: string;
};

export function Model({ matcapUrl, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF(
    cleanPath(`${env.ASSET_URL}/happy-run/map_pointer_3d.glb`)
  );
  const meshRef = useRef<THREE.Mesh>(null);
  const matcap = useTexture(
    matcapUrl || cleanPath(`${env.ASSET_URL}/happy-run/matcap.png`)
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= delta * 0.7;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={(nodes.Object_2 as THREE.Mesh).geometry}
        material={materials.None}
        rotation={[(-Math.PI / 2) * 0.81, 0, 0]}
        // rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </group>
  );
}

useGLTF.preload(cleanPath(`${env.ASSET_URL}/happy-run/map_pointer_3d.glb`));
