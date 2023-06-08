import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faCircleQuestion, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

export function GivenTestTableRow({data: {testResults, setTestResults, sum, setSum, test}}) {
    const getTestResultbyName = (testName) => {
        let res = '';
        testResults.forEach(e => {
          if (e.name === testName) {
            if (e.ran) {
              res = e.successfull ? 
              <FontAwesomeIcon icon={faCircleCheck} style={{color: "#09eb45", width: "25px", height: "25px"}}/>
               : 
               <FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000", width: "25px", height: "25px"}} />
            } else {
              res = <FontAwesomeIcon icon={faCircleQuestion} style={{color: "#eb8909", width: "25px", height: "25px"}}/>;
            }
          }
        });
        return res;
    };

    const runTest = (test) => {
        let newArr = [];
        let allscore = sum;
        testResults.forEach(e => {
          if (e.name === test.name) {
            if (!e.ran) {
              let testSuccessfull = false;
              if (test.testFn(e.func)) {
                testSuccessfull = true;
                allscore += test.points;
              }
              let newTest = { name: test.name, ran: true, successfull: testSuccessfull};
              newArr.push(newTest);
            } else {
              newArr.push(e);
            }
          } else {
            newArr.push(e);
          }
        });
        setTestResults(newArr);
        setSum(allscore);
    };

    return (
        <tr>
            <td>{test.name}</td>
            <td>{getTestResultbyName(test.name)}</td>
            <td>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {runTest(test)}}
            > 
                <FontAwesomeIcon icon={faCirclePlay} style={{color: "#fffff", width: "20px", height: "20px", verticalAlign: "middle", marginRight: "5px"}} />
                Run
            </button>
            </td>
            <td>{test.points}</td>
        </tr>
    );
};