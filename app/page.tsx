'use client';
import Auth from "./components/app/auth/auth";

export default function Home() {
  return (
    <div>
      <Auth text="Please login to start playing.">
      </Auth>
    </div>
  );
}