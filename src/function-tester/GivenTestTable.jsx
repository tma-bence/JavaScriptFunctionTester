import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { RunAllTestsButton } from "./RunAllTestsButton";
import { GivenTestTableRow } from "./GivenTestTableRow";

export function GivenTestTable({ fn, tests, sum, setSum }) {
    const [testResults, setTestResults] = useState([]);
    const [isAllTestsRun, setIsAllTestsRun] = useState(false);

    useEffect(() => {
        let testArr = [];
        tests.forEach(test => {
          let newTest = { name: test.name, ran: false, successfull: null, func: fn};
          testArr.push(newTest);
        });
        setTestResults(testArr);
      }, [])

    return (
        <>
        <table className="table table-dark table-hover align-middle text-center" style={{ width: "750px" }}>
            <thead>
            <tr>
                <th scope="col" style={{ width: "25%" }}>Name</th>
                <th scope="col" style={{ width: "25%" }}>Result</th>
                <th scope="col" style={{ width: "25%" }}>Action</th>
                <th scope="col" style={{ width: "25%" }}>Points</th>
            </tr>
            </thead>
            <tbody>
            {tests.map(test => <GivenTestTableRow data={{testResults, setTestResults, sum, setSum, test}}/>)}
            <tr className="table text-center align-middle table-secondary">
                <td></td>
                <td></td>
                <td>
                <RunAllTestsButton data={{isAllTestsRun, tests, testResults, setIsAllTestsRun, setSum, setTestResults}}/>
                </td>
                <td>
                <b>Sum: {sum ?? '0'}</b>
                </td>
            </tr>
            </tbody>
        </table>
        </>
        )
};