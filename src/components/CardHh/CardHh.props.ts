import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface CardHhProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  children: ReactNode;
}
