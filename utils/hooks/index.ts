import { useEffect, useLayoutEffect } from "react";

export const customUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
