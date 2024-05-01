'use client';

import FmLink from "./components/ui/fmlink/fmlink";
import FmMessage from "./components/ui/fmmessage/fmmessage";

export default function Home() {
  return (
    <div>
      <FmMessage message="Hello World! This is a very long message!" type="success">
        <FmLink href="/" text="Back to Sign In" />
      </FmMessage>
    </div>
  );
}