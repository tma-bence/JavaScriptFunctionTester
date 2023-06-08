import { FunctionTester } from "./function-tester/FunctionTester";
import json_data from "./stories/example-data/the-simple-example";
import json_data_2 from './stories/example-data/the-complex-example';

function App() {
  const {fn, input, output, tests} = json_data;
  const onFinish = (data) => {
    console.log(data);
    return data;
  };
  return (
    <FunctionTester
      fn={fn}
      input={input}
      output={output}
      tests={tests}
      onFinish={onFinish}
    />
  );
}

export default App;
