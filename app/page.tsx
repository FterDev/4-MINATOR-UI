'use client';

import FmMessage from "./components/ui/fmmessage/fmmessage";

export default function Home() {
  return (
    <div>
      <FmMessage message="Hello World!" type="success" />
    </div>
  );
}