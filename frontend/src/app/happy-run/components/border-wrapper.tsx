'use client';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

// %230D8880
const BorderWrapperStyled = styled.div`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='10' y='10' width='calc(100%25 - 2%)' height='calc(100%25 - 5%)' fill='none' rx='20' ry='20' stroke='%23FFFFFF' stroke-width='0.3vw' stroke-dasharray='32' stroke-dashoffset='55' stroke-linecap='round'/%3e%3c/svg%3e");
`;

export default function BorderWrapper({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return <BorderWrapperStyled {...props}>{children}</BorderWrapperStyled>;
}
