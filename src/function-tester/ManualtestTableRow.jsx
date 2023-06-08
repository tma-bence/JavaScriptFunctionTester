import * as React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faCircleQuestion, faCirclePlay, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export function ManualTestTableRow({data: {fn, manualTests, setManualTests, input, output, errors, setErrors, validateForm, renderError}, test}) {
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

    const getVal = (valName) => {
      return test.values[valName];
    }

    const generateEditFormFields = (e) => {
      return (
          <div className="mb-3">
              <label htmlFor={e[0]} className="form-label">{e[0]}</label>
              <input type={e[1] === "bool" ? "checkbox" : e[1]} className={e[1] === "bool" ? "form-check-input" : "form-control"} id={e[0]} defaultValue={getVal(e[0])}/>
          </div>
      );
    };

    const getTestResultbyName = (testName) => {
        let res = '';
        manualTests.forEach(e => {
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

    const runTest = () => {
        let tests = [];
        manualTests.forEach(t => {
          if (t.id === test.id) {
            let tmpTest = t;
            if (fn(test.values) === test.output) {
              tmpTest.successfull = true;
            } else {
              tmpTest.successfull = false;
            }
            tmpTest.ran = true;
            tests.push(tmpTest);
          } else {
            tests.push(t);
          }
        });
        setManualTests(tests);
    };

    const editTest = (e) => {
      setErrors([]);
      const form = e.target.form;
      if (validateForm(form)) {
        return;
      }
      test.name = form.children[0].children[1].value;
      let values = {};
      for (let i = 1; i < form.children.length-2; i++) {
          const e = form.children[i];
          values[e.children[0].innerHTML] = e.children[1].getAttribute('type') === 'number' ? parseInt(e.children[1].value) : e.children[1].value;
      }
      test.values = values;
      test.output = form.children[form.children.length-2].children[1].getAttribute('type') === 'number' ? parseInt(form.children[form.children.length-2].children[1].value) : form.children[form.children.length-2].children[1].value;
      handleClose();
    };

    const deleteTest = () => {
      let tests = [];
      manualTests.forEach(t => {
        if (test.id !== t.id) {
          tests.push(t);
        }
      });
      setManualTests(tests);
    }

    const renderActions = () => {
        return (
            <div>
                <FontAwesomeIcon icon={faCirclePlay} style={{color: "#fffff", width: "20px", height: "20px", verticalAlign: "middle", marginRight: "10px", cursor: "pointer"}} onClick={runTest}/>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: "#fbff00", width: "20px", height: "20px", marginRight: "10px", verticalAlign: "middle", cursor: "pointer"}} onClick={handleOpen}/>
                <FontAwesomeIcon icon={faTrash} style={{color: "#ff0000", width: "20px", height: "20px", verticalAlign: "middle", cursor: "pointer"}} onClick={deleteTest}/>
            </div>
        )
    }

    return (
        <tr key={test.id}>
            <td>{test.name}</td>
            <td>{getTestResultbyName(test.name)}</td>
            <td>{renderActions()}</td>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit manual test
                </Typography>
                {errors.map(error => renderError(error))}
                <form >
                    <div className="mb-3">
                        <label htmlFor="test-name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="test-name" defaultValue={test.name}/>
                    </div>
                    {Object.entries(input).map(e => generateEditFormFields(e))}
                    <div className="mb-3">
                        <label htmlFor="output" className="form-label">Output</label>
                        <input type={output} className="form-control" id="output" defaultValue={test.output}/>
                    </div>
                <button className="btn btn-primary" type="button" onClick={editTest}>Save changes</button>
                </form>
                </Box>
            </Modal>
        </tr>
    );
};