import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => console.log("Button clicked")}>Click</Button>
      </div>
    </>
  );
}

export default App;
