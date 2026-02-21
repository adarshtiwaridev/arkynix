"use client";

import { useState } from "react";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}