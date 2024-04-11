import FmButton from "./components/ui/fmbutton/fmbutton";
import FmCard from "./components/ui/fmcard/fmcard";

export default function Home() {
  return (
    <div>
      <FmCard title="Buttons filled">
        <FmButton text="Click me!" color="primary" />
        <FmButton text="Click me!" color="secondary" />
        <FmButton text="Click me!" color="danger" />
        <FmButton text="Click me!" color="success" />
      </FmCard>
      <FmCard title="Buttons outlined">
        <FmButton text="Click me!" color="primary" type="outlined" />
        <FmButton text="Click me!" color="secondary" type="outlined"  />
        <FmButton text="Click me!" color="danger" type="outlined"  />
        <FmButton text="Click me!" color="success" type="outlined" />
      </FmCard>
      <FmCard title="Buttons text">
        <FmButton text="Click me!" color="primary" type="text" />
        <FmButton text="Click me!" color="secondary" type="text"  />
        <FmButton text="Click me!" color="danger" type="text"  />
        <FmButton text="Click me!" color="success" type="text" />
      </FmCard>
    </div>
  );
}
