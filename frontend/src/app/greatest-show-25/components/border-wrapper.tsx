"use client";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

// %230D8880

type BorderWrapperProps = HTMLAttributes<HTMLDivElement> & {
  dashedArray?: number;
  dashedOffset?: number;
  widthOffset?: number;
  heightOffset?: number;
  radius?: number;
  color?: string;
  strokeWidth?: number;
};

const BorderWrapperStyled = styled.div<{ dashedArray?: number,color?: string, strokeWidth?: number, dashedOffset?: number, widthOffset?: number, heightOffset?: number, radius?: number }>`
  background-image: url("data:image/svg+xml,%3csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='${props=>props.strokeWidth}' y='${props=>props.strokeWidth}' width='calc(100% - ${props=>props.widthOffset}%)' height='calc(100% - ${props=>props.heightOffset}%)' fill='none' rx='${props=>props.radius}' ry='${props=>props.radius}' stroke='${props=>props.color}' stroke-width='${props=>props.strokeWidth}' stroke-dasharray='${props=>props.dashedArray || 10}' stroke-dashoffset='${props=>props.dashedOffset}' stroke-linecap='round'/%3e%3c/svg%3e");
`;

export default function BorderWrapper({
  className,
  dashedArray = 10,
  dashedOffset = 10,
  widthOffset = 0.5,
  heightOffset = 3,
  strokeWidth = 10,
  radius = 20,
  color="%23FFFFFF",
  children,
  ...props
  
}: BorderWrapperProps) {

  return <BorderWrapperStyled radius={radius} dashedArray={dashedArray} widthOffset={widthOffset} heightOffset={heightOffset} dashedOffset={dashedOffset} strokeWidth={strokeWidth} color={color} className={className} {...props}>{children}</BorderWrapperStyled>;
}
