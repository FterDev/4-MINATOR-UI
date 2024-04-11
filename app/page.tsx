import FmButton from "./components/ui/fmbutton/fmbutton";
import FmCard from "./components/ui/fmcard/fmcard";
import FMInput from "./components/ui/fminput/fminput";

export default function Home() {
  return (
    <div>
      <FmCard title="Buttons filled">
        <FmButton text="Buttons added!" color="primary" />
        <FMInput title="Input" name="input" id="input" value="input" placeholder="Test Input" />
      </FmCard>
      
    </div>
  );
}
