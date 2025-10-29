import { motion, useSpring, useTransform, MotionValue } from "motion/react";
import { useEffect, useState, CSSProperties } from "react";

// Helper function to get the current root font-size in pixels
const getRootFontSize = (): number => {
  if (typeof window === 'undefined') return 16; // Default for SSR
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
};

// Inline CSS styles
const styles = {
  counterContainer: {
    position: "relative" as const,
    display: "inline-block" as const,
  },
  counterCounter: {
    display: "flex" as const,
    overflow: "hidden" as const,
    lineHeight: 1,
  },
  counterDigit: {
    position: "relative" as const,
    width: "1ch",
    fontVariantNumeric: "tabular-nums" as const,
  },
  counterNumber: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  gradientContainer: {
    pointerEvents: "none" as const,
    position: "absolute" as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    position: "absolute" as const,
    bottom: 0,
    width: "100%",
  },
};

// Type definitions
interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
  digitStyle?: CSSProperties;
  springConfig?: SpringConfig;
}

interface CounterProps {
  value: number;
  fontSize?: string | number;
  padding?: number;
  places?: number[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: string | number;
  containerStyle?: CSSProperties;
  counterStyle?: CSSProperties;
  digitStyle?: CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: CSSProperties;
  bottomGradientStyle?: CSSProperties;
  animationSpeed?: 'slow' | 'normal' | 'fast' | SpringConfig;
}

function Number({ mv, number, height }: NumberProps) {
  let y = useTransform(mv, (latest: number) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span style={{ ...styles.counterNumber, y }}>{number}</motion.span>
  );
}

function Digit({ place, value, height, digitStyle, springConfig }: DigitProps) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, springConfig);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div style={{ ...styles.counterDigit, height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "white",
  fontWeight = "bold",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "transparent",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
  animationSpeed = 'normal',
}: CounterProps) {
  // Preset animation configurations
  const getSpringConfig = (): SpringConfig | undefined => {
    if (typeof animationSpeed === 'object') {
      return animationSpeed;
    }

    switch (animationSpeed) {
      case 'slow':
        return { stiffness: 50, damping: 20, mass: 1 };
      case 'fast':
        return { stiffness: 300, damping: 30, mass: 0.5 };
      case 'normal':
      default:
        return { stiffness: 100, damping: 20, mass: 1 };
    }
  };

  const springConfig = getSpringConfig();
  const [rootFontSize, setRootFontSize] = useState(getRootFontSize());

  // Update root font size on mount and resize
  useEffect(() => {
    const updateRootFontSize = () => {
      setRootFontSize(getRootFontSize());
    };

    // Update on mount
    updateRootFontSize();

    // Update on window resize
    window.addEventListener('resize', updateRootFontSize);

    return () => {
      window.removeEventListener('resize', updateRootFontSize);
    };
  }, []);

  const fontSizeNumber =
    typeof fontSize === "number"
      ? fontSize
      : fontSize.includes("rem")
      ? parseFloat(fontSize) * rootFontSize
      : parseFloat(fontSize);
  const height = fontSizeNumber + padding;
  const defaultCounterStyle: CSSProperties = {
    ...styles.counterCounter,
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
  };
  const defaultTopGradientStyle: CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };
  const defaultBottomGradientStyle: CSSProperties = {
    ...styles.bottomGradient,
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };
  return (
    <div style={{ ...styles.counterContainer, ...containerStyle }}>
      <div style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={value}
            height={height}
            digitStyle={digitStyle}
            springConfig={springConfig}
          />
        ))}
      </div>
      <div style={styles.gradientContainer}>
        <div
          style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}
        ></div>
        <div
          style={
            bottomGradientStyle
              ? bottomGradientStyle
              : defaultBottomGradientStyle
          }
        ></div>
      </div>
    </div>
  );
}
