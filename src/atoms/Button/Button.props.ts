import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps
  // Omit for use with motion
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
  > {
  children: ReactNode;
  variant: "primary" | "ghost";
  arrow?: "right" | "down" | "none";
}
