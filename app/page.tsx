'use client';

import Auth from "./components/app/auth/auth";
import FmInput from "./components/ui/fminput/fminput";

export default function Home() {
  return (
    <div>
      <Auth text="Please login to start playing.">
        <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" />
        <FmInput id="password" name="password" title="Password" value="" type="password" />
      </Auth>
    </div>
  );
}