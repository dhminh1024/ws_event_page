import {
  HTMLAttributes,
  ReactElement,
  Suspense,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  PageChangeEvent,
  ScrollMode,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export type PdfReaderProps = HTMLAttributes<HTMLDivElement> & {
  url?: string;
  onChangePage?: (e: PageChangeEvent) => void;
};

import "@react-pdf-viewer/core/lib/styles/index.css";
import { useTheme } from "@/lib/shadcn/theme-provider";

import styled from "styled-components";

const ViewerWrapper = styled.div`
  .rpv-core__inner-pages > div {
    height: auto !important;
  }
`;
import * as pdfjs from "pdfjs-dist";

const src = new URL("pdfjs-dist/build/pdf.worker.js", import.meta.url);
pdfjs.GlobalWorkerOptions.workerSrc = src.toString();

export const PDFReader: FC<PdfReaderProps> = ({
  className,
  url,
  onChangePage,
}) => {
  const { theme } = useTheme();

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          Download,
          EnterFullScreen,

          Print,

          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <div className="ml-auto px-1">
              <ZoomOut />
            </div>
            <div className="px-1">
              <Zoom />
            </div>
            <div className="px-1">
              <ZoomIn />
            </div>

            <div className="ml-auto px-1">
              <EnterFullScreen />
            </div>
            <div className="px-1">
              <Download />
            </div>
            <div className="px-1">
              <Print />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  if (!url) return null;
  return (
    <Suspense fallback={<p className={"text-base"}>File Error</p>}>
      <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
        <ViewerWrapper className={cn("h-[70vh] w-full", className)}>
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={SpecialZoomLevel.PageWidth}
            theme={theme}
          />
        </ViewerWrapper>
      </Worker>
    </Suspense>
  );
};
