"use client";

import { useState } from "react";

export default function Portfolio() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}