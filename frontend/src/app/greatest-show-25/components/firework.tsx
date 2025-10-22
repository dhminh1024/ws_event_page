import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import styled from "styled-components";

export type FireworkProps = HTMLAttributes<HTMLDivElement> & {};

const FireworkWrapperStyled = styled.div`
  .firework {
    position: absolute;
  }
`;

interface ExplosionStyledProps {
  delay: number;
}

const ExplosionStyled = styled.div<ExplosionStyledProps>`
  & {
    position: absolute;
    left: -2rem;
    bottom: 0;
    width: 4rem;
    height: 80rem;
    transform-origin: 50% 100%;
    /* background-color: rgba(0,0,0,.2); */
    overflow: hidden;
  }
  &:nth-child(1) {
    transform: rotate(0deg) translateY(-15rem);
  }
  &:nth-child(2) {
    transform: rotate(30deg) translateY(-15rem);
  }
  &:nth-child(3) {
    transform: rotate(60deg) translateY(-15rem);
  }
  &:nth-child(4) {
    transform: rotate(90deg) translateY(-15rem);
  }
  &:nth-child(5) {
    transform: rotate(120deg) translateY(-15rem);
  }
  &:nth-child(6) {
    transform: rotate(150deg) translateY(-15rem);
  }
  &:nth-child(7) {
    transform: rotate(180deg) translateY(-15rem);
  }
  &:nth-child(8) {
    transform: rotate(210deg) translateY(-15rem);
  }
  &:nth-child(9) {
    transform: rotate(240deg) translateY(-15rem);
  }
  &:nth-child(10) {
    transform: rotate(270deg) translateY(-15rem);
  }
  &:nth-child(11) {
    transform: rotate(300deg) translateY(-15rem);
  }
  &:nth-child(12) {
    transform: rotate(330deg) translateY(-15rem);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 40rem;
    background-color: #f5cf52;
  }
  @keyframes explosion {
    0% {
      top: 100%;
    }
    33%,
    100% {
      top: -50%;
    }
  }

  &::before {
    animation: explosion 2s  ease-in-out infinite;
    animation-delay: ${({delay})=>`${delay}s`}
  }
`;

interface FireworkItemProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  size?: number;
}

export const FireworkItem: FC<FireworkItemProps> = ({
  top,
  left,
  right,
  bottom,
  delay = 0,
  size = 1,
}) => {
  return (
    <div
      className="firework"
      style={{
        top,
        left,
        right,
        bottom,
        transform: `scale(${size})`,
      }}
    >
      {Array.from(Array(12)).map((_, index) => (
        <ExplosionStyled
          key={index}
          className="explosion"
          delay={delay}
        ></ExplosionStyled>
      ))}
    </div>
  );
};

export const Firework: FC<FireworkProps> = ({ className }) => {
  return (
    <FireworkWrapperStyled className={cn("absolute w-full h-full", className)}>
      <FireworkItem top={"10%"} left={"0%"} />
      <FireworkItem top={"70%"} left={"-10%"} size={0.6} delay={2.5} />
      <FireworkItem top={"30%"} right={"-10%"} size={0.6} delay={3} />
      <FireworkItem top={"45%"} right={"0%"} size={0.3} delay={0} />
      <FireworkItem bottom={"0%"} right={"10%"} size={0.3} delay={1.5} />
    </FireworkWrapperStyled>
  );
};
