import FmButton from "./components/ui/fmbutton/fmbutton";
import FmCard from "./components/ui/fmcard/fmcard";
import FMInput from "./components/ui/fminput/fminput";

export default function Home() {
  return (
    <div>
      <FmCard title="Moaar Components!">
        <FMInput title="E-Mail" name="input" id="input" value="input" placeholder="joh@doe.com" />
        <FMInput title="Password" name="input" id="input" value="input" placeholder="IloveCats!" isPassword={true} />
        <FmButton text="Buttons added!" color="primary" />
      </FmCard>
    </div>
  );
}
