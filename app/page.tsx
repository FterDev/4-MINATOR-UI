import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import FmCard from "./components/ui/fmcard/fmcard";

export default function Home() {
  return (
    <div>
      <FmCard title="Welcome to the Next.js app" subtitle="This is a simple Next.js app">
        Test
      </FmCard>
      
    </div>
  );
}
