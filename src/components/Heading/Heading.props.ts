import { InputHTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends InputHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
