import * as React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ManualTestTableRow } from "./ManualtestTableRow";

export function ManualTestTable({ fn, manualTests, setManualTests, input, output }) {
    const [manualTestId, setManualTestId] = useState(0);
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const renderError = (err) => {
        return <Typography onClick={() => document.getElementById(err.id).focus()} style={{ cursor: "pointer", color: "red" }}>{err.message}</Typography>
    };

    const validateForm = (form) => {
        let newErrors = [];
        for (let i = 0; i < form.children.length-1; i++) {
            const div = form.children[i];
            if (div.children[1].value === '') {
                let error = {message: `${div.children[0].innerHTML} can't be empty!`, id: div.children[1].getAttribute('id')};
                newErrors.push(error);
            }
        }
        setErrors(newErrors);
        if (newErrors.length !== 0) {
            return true;
        }
        return false;
    }

    const addManualTest = (e) => {
        let tests = manualTests;
        const form = e.target.form;
        if (validateForm(form)) {
            return;
        }
        const testName = form.children[0].children[1].value;
        let values = {};
        for (let i = 1; i < form.children.length-2; i++) {
            const e = form.children[i];
            values[e.children[0].innerHTML] = e.children[1].getAttribute('type') === 'number' ? parseInt(e.children[1].value) : e.children[1].value;
        }
        const output = form.children[form.children.length-2].children[1].getAttribute('type') === 'number' ? parseInt(form.children[form.children.length-2].children[1].value) : form.children[form.children.length-2].children[1].value;
        let newTest = {id: manualTestId, name: testName, ran: false, successfull: null, values: values, output: output};
        tests.push(newTest);
        setManualTests(tests);
        setManualTestId(manualTestId+1);
        handleClose();
    };
    
    const getInputField = (e) => {
        switch (e[1]) {
            case "number":
                return <input type="number" className="form-control" id={e[0]}/>;
            case "string":
                return <input type="text" className="form-control" id={e[0]}/>;
            case "bool":
                return <input type="checkbox" className="form-check-input" id={e[0]}/>;
            default:
                break;
        }
    }

    const generateComplexFormFields = (e) => {
        if (Array.isArray(e[1])) {
            if (e[1].length === 1) {
                if (e[1][0] === "string") {
                    return (
                        <div>
                            <input type="text" className="form-control" id={e[0]}/>
                            <button onClick={() => generateFormFields(e)}>+</button>
                        </div>
                    );
                }
            }
        }
        return <input type="text" placeholder="asderasd"/>;
    };

    const generateFormFields = (e) => {
        if (typeof e[1] === 'object') {
            return (
                <div className="mb-3">
                    <label htmlFor={e[0]} className="form-label">{e[0]}</label>
                    {generateComplexFormFields(e)}
                </div>
            );
        }

        return (
            <div className="mb-3">
                <label htmlFor={e[0]} className="form-label">{e[0]}</label>
                {getInputField(e)}
            </div>
        );
    };

    const runAllTests = () => {
        let tests = [];
        manualTests.forEach(test => {
            let tmpTest = test;
            if (fn(test.values) === test.output) {
              tmpTest.successfull = true;
            } else {
              tmpTest.successfull = false;
            }
            tmpTest.ran = true;
            tests.push(tmpTest);
        });
        setManualTests(tests);
    };

    return (
        <>
        <table className="table table-dark table-hover align-middle text-center" style={{ width: "750px" }}>
            <thead>
            <tr>
                <th scope="col" style={{ width: "33%" }}>Name</th>
                <th scope="col" style={{ width: "33%" }}>Result</th>
                <th scope="col" style={{ width: "33%" }}>Action</th>
            </tr>
            </thead>
            <tbody>
            {manualTests.map((test) => {
                return (
                    <ManualTestTableRow data={{fn, manualTests, setManualTests, input, output, errors, setErrors, validateForm, renderError}} test={test}/>
                )
            })}
            <tr className="table text-center align-middle table-secondary">
                <td></td>
                <td></td>
                <td>
                    <button 
                        className="btn btn-success"
                        onClick={handleOpen}
                    >
                        Add test
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={runAllTests}
                        style={{ marginLeft: '10px' }}
                        disabled={!manualTests.length}
                    >
                        Run all tests
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new manual test
                        </Typography>
                        {errors.map(error => renderError(error))}
                        <form >
                            <div className="mb-3">
                                <label htmlFor="test-name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="test-name"/>
                            </div>
                            {Object.entries(input).map(e => generateFormFields(e))}
                            <div className="mb-3">
                                <label htmlFor="output" className="form-label">Output</label>
                                <input type={output} className="form-control" id="output"/>
                            </div>
                        <button className="btn btn-primary" type="button" onClick={addManualTest}>Add</button>
                        </form>
                        </Box>
                    </Modal>
                </td>
            </tr>
            </tbody>
        </table>
        </>
        )
};