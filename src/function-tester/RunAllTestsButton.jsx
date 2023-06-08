import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

export function RunAllTestsButton({data: {isAllTestsRun, tests, testResults, setIsAllTestsRun, setSum, setTestResults}}) {
    const runAllTests = () => {
        if (!isAllTestsRun) {
          let res = 0;
          let newArr = [];
          tests.forEach(test => {
            testResults.forEach(e => {
              if (e.name === test.name) {
                if (!e.ran) {
                  let testSuccessfull = false;
                  if (test.testFn(e.func)) {
                    testSuccessfull = true;
                    res += test.points;
                  }
                  let newTest = { name: test.name, ran: true, successfull: testSuccessfull};
                  newArr.push(newTest);
                } else {
                  if (e.successfull) {
                    res += test.points;
                  }
                  newArr.push(e);
                }
              }
            })
          });
          setIsAllTestsRun(true);
          setSum(res);
          setTestResults(newArr);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary" 
                onClick={runAllTests}
            >
                <FontAwesomeIcon icon={faCirclePlay} style={{color: "#fffff", width: "20px", height: "20px", verticalAlign: "middle", marginRight: "5px"}} />
                Run all
            </button>
        </>
    )
};