import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  styled,
  alpha,
  darken,
  lighten,
  PaletteColor,
  Theme,
} from "@mui/material/styles";

/**
 * FancyButton — a tactile, theme-aware button built on MUI <Button>.
 *
 * The signature detail is a solid "edge" under the button that compresses
 * when pressed, so it feels like a physical key. Everything else inherits
 * your theme's palette, typography and spacing.
 *
 * Usage:
 *   <FancyButton>Save changes</FancyButton>
 *   <FancyButton color="secondary" appearance="soft">Preview</FancyButton>
 *   <FancyButton appearance="outline" size="small">Cancel</FancyButton>
 *   <FancyButton loading>Saving</FancyButton>
 *   <FancyButton shine startIcon={<RocketIcon />}>Launch</FancyButton>
 */

export type FancyButtonAppearance = "solid" | "soft" | "outline";
export type FancyButtonSize = "small" | "medium" | "large";

/**
 * Built-in palette keys get autocomplete; `(string & {})` still allows
 * custom palette entries such as "brand" without losing that autocomplete.
 */
export type FancyButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | (string & {});

export interface FancyButtonProps extends Omit<
  ButtonProps,
  "color" | "variant" | "size"
> {
  /** Any key from theme.palette that has a `main` value. */
  color?: FancyButtonColor;
  appearance?: FancyButtonAppearance;
  size?: FancyButtonSize;
  /** Shows a spinner, keeps the width, and blocks clicks. */
  loading?: boolean;
  /** Adds a light sweep across the button on hover. */
  shine?: boolean;
}

interface SizeTokens {
  minHeight: number;
  px: number;
  fontSize: string;
  depth: number;
  radius: number;
  spinner: number;
}

const SIZES: Record<FancyButtonSize, SizeTokens> = {
  small: {
    minHeight: 34,
    px: 1.75,
    fontSize: "0.8125rem",
    depth: 3,
    radius: 10,
    spinner: 16,
  },
  medium: {
    minHeight: 42,
    px: 2.5,
    fontSize: "0.9375rem",
    depth: 4,
    radius: 12,
    spinner: 18,
  },
  large: {
    minHeight: 52,
    px: 3.25,
    fontSize: "1.0625rem",
    depth: 5,
    radius: 14,
    spinner: 22,
  },
};

function resolvePalette(theme: Theme, color: string): PaletteColor {
  const entry = (
    theme.palette as unknown as Record<
      string,
      Partial<PaletteColor> | undefined
    >
  )[color];
  return entry?.main ? (entry as PaletteColor) : theme.palette.primary;
}

interface RootOwnProps {
  tone: string;
  appearance: FancyButtonAppearance;
  fancySize: FancyButtonSize;
  shine: boolean;
}

const CUSTOM_PROPS: ReadonlyArray<PropertyKey> = [
  "tone",
  "appearance",
  "fancySize",
  "shine",
];

const Root = styled(Button, {
  shouldForwardProp: (prop) => !CUSTOM_PROPS.includes(prop),
})<RootOwnProps>(({ theme, tone, appearance, fancySize, shine }) => {
  const palette = resolvePalette(theme, tone);
  const s = SIZES[fancySize];
  const isDark = theme.palette.mode === "dark";

  const main = palette.main;
  const contrast = palette.contrastText ?? theme.palette.getContrastText(main);
  const edge = darken(main, isDark ? 0.45 : 0.32);

  const looks = {
    solid: {
      color: contrast,
      backgroundColor: main,
      boxShadow: `0 ${s.depth}px 0 ${edge}`,
      "&:hover": { backgroundColor: lighten(main, 0.08) },
    },
    soft: {
      color: isDark ? lighten(main, 0.35) : darken(main, 0.2),
      backgroundColor: alpha(main, isDark ? 0.22 : 0.14),
      boxShadow: `0 ${s.depth}px 0 ${alpha(main, isDark ? 0.4 : 0.3)}`,
      "&:hover": { backgroundColor: alpha(main, isDark ? 0.3 : 0.2) },
    },
    outline: {
      color: isDark ? lighten(main, 0.25) : main,
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${main}`,
      boxShadow: `0 ${s.depth}px 0 ${main}`,
      "&:hover": { backgroundColor: alpha(main, 0.06) },
    },
  } as const;

  return {
    // `&&` lifts specificity above MUI's built-in variant styles.
    "&&": {
      position: "relative",
      overflow: "hidden",
      minHeight: s.minHeight,
      paddingInline: theme.spacing(s.px),
      paddingBlock: theme.spacing(0.75),
      marginBottom: s.depth, // reserves room for the edge so layouts don't jump
      borderRadius: s.radius,
      fontSize: s.fontSize,
      fontWeight: 650,
      letterSpacing: "0.01em",
      lineHeight: 1.2,
      textTransform: "none",
      transform: "translateY(0)",
      transition: theme.transitions.create(
        ["transform", "box-shadow", "background-color", "color"],
        { duration: 120, easing: theme.transitions.easing.easeOut },
      ),
      ...looks[appearance],

      "&:active:not(.Mui-disabled)": {
        transform: `translateY(${s.depth}px)`,
        boxShadow: `0 0 0 ${edge}`,
      },

      "&.Mui-focusVisible": {
        outline: `3px solid ${alpha(main, 0.5)}`,
        outlineOffset: 3,
      },

      "&.Mui-disabled": {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.action.disabledBackground,
        borderColor: "transparent",
        boxShadow: `0 ${s.depth}px 0 ${theme.palette.action.disabled}`,
      },

      "& .MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon > *:nth-of-type(1)":
        {
          fontSize: "1.15em",
        },

      ...(shine && {
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `linear-gradient(110deg, transparent 30%, ${alpha("#fff", 0.35)} 50%, transparent 70%)`,
          transform: "translateX(-120%)",
          pointerEvents: "none",
        },
        "&:hover::after": {
          transform: "translateX(120%)",
          transition: "transform 650ms ease",
        },
      }),

      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
        "&:active:not(.Mui-disabled)": { transform: "none" },
        "&::after": { display: "none" },
      },
    },
  };
});

const Label = styled("span", {
  shouldForwardProp: (prop) => prop !== "pending",
})<{ pending: boolean }>(({ pending }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "inherit",
  visibility: pending ? "hidden" : "visible", // keeps the button's width while loading
}));

const Spinner = styled("span")({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
});

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  function FancyButton(
    {
      children,
      color = "primary",
      appearance = "solid",
      size = "medium",
      loading = false,
      shine = false,
      disabled = false,
      startIcon,
      endIcon,
      onClick,
      ...other
    },
    ref,
  ) {
    const s = SIZES[size];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <Root
        ref={ref}
        variant="text"
        disableElevation
        tone={color}
        appearance={appearance}
        fancySize={size}
        shine={shine}
        disabled={disabled}
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
        aria-busy={loading || undefined}
        onClick={handleClick}
        {...other}
      >
        <Label pending={loading}>{children}</Label>
        {loading && (
          <Spinner aria-hidden>
            <CircularProgress size={s.spinner} thickness={5} color="inherit" />
          </Spinner>
        )}
      </Root>
    );
  },
);

export default FancyButton;
