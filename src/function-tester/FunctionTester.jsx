import * as React from "react";
import { useState } from "react";
import { GivenTestTable } from "./GivenTestTable";
import { ManualTestTable } from "./ManualTestTable";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  const [customTestsButtonDisabled, setCustomTestsButtonDisabled] = useState(false);
  const [sum, setSum] = useState(null);
  const [manualTests, setManualTests] = useState([]);

  const getMaxPoint = () => {
    let res = 0;
    tests.forEach(test => {
      res += test.points;
    });

    return res;
  };

  return (
    <div className="container">
      <br/>
      <h1>FunctionTester</h1>
      <p>
        With this super web-application, you can test your JavaScript functions!
      </p>
      <h3>Function</h3>
      {fn.toString()}
      <br />
      <h3>Tests</h3>
      <GivenTestTable 
        fn={fn}
        tests={tests}
        sum={sum}
        setSum={setSum}
      />
      <ManualTestTable 
        fn={fn}
        manualTests={manualTests}
        setManualTests={setManualTests}
        input={input}
        output={output}
      />
      <button
        className="btn btn-success btn-rounded"
        disabled={customTestsButtonDisabled}
        onClick={() => {
          const data = {
            givenTests: tests,
            testResult: {
              achieved: sum,
              all: getMaxPoint()
            },
            customTests: manualTests
          }
          onFinish(data)
          }
        }
      >
        OK
      </button>
    </div>
  );
}
