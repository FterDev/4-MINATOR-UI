import FmButton from "./components/ui/fmbutton/fmbutton";
import FmCard from "./components/ui/fmcard/fmcard";

export default function Home() {
  return (
    <div>
      <FmCard title="Buttons filled">
        <FmButton text="Buttons added!" color="primary" />
      </FmCard>
      
    </div>
  );
}
