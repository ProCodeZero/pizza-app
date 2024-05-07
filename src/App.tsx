import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
  return (
    <>
      <Button onClick={() => console.log(2)}>Обычная кнопка</Button>
      <Button appearance="big" onClick={() => console.log(2)}>
        Большая кнопка
      </Button>
      <Input placeholder="email" />
    </>
  );
}

export default App;
