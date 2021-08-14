import React, {useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import renderField from '../../utils/renderField';
import JoditEditor from "jodit-react";
import {IoClose} from 'react-icons/io5';
import FileUpload from '../fileUpload/file-upload';

let MailEditForm = (props) => {
    const { errors, handleSubmit, pristine, submitting, onChangeContent, address, setAddress } = props;

    // for address 
    // const [address, setAddress] = useState([]);
    const [tempAddr, setTempAddr] = useState('');

    const onChangeTemp = e => {
        setTempAddr(e.target.value);
    }

    const insertAddress = newAddr => {
        let prev = address;
        prev = [...prev, newAddr];
        setAddress(prev);
    }
    
    const removeAddress = addr => {
        let newList = address.filter(item => item !== addr);
        setAddress(newList);
    }

    // for jodit
    const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <Field
                            label="Subject"
                            name="subject"
                            component={renderField}
                            type="text"
                            placeholder="input subject"
                            className="form-control"
                        />
                </div>
                <div className="form-group">
                    <div>
                        <Field
                            label="From"
                            name="from"
                            component={renderField}
                            type="text"
                            placeholder="input sender's email"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="newAddr">Address to send1</label>
                        <textarea className="form-control" rows="4" onChange={setAddress} />
                        {/* <input value={tempAddr} placeholder="new address" className="form-control" onChange={onChangeTemp} type="text" /> */}
                        {/* <span className="btn btn-info ml-3" onClick={() => insertAddress(tempAddr)}>add</span> */}
                    </div>
                </div>
                {/* <div className="form-group">
                    <div className="mb-3">Address List</div>
                    <div className="row pl-4">
                        {address.map((item, key) => {
                            return (
                                <div className="mr-3" key={key}>
                                    <div className="d-flex align-content-center p-1" style={{border: '1px solid gray', borderRadius: '3px'}}>
                                        <span>{item}</span>&nbsp;<IoClose onClick={() => removeAddress(item)} style={{marginTop: '3px'}} size='20'/>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                </div> */}
                <div className="form-group">
                    <div>
                        <Field
                            label="Logo"
                            name="logo"
                            component={renderField}
                            type="text"
                            placeholder="input Logo url"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label>Letter content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={
                                newContent => {
                                    setContent(newContent) // preferred to use only this option to update the content for performance reasons
                                    onChangeContent(newContent)
                                }
                            // onChange={newContent => onChangeContent(newContent)
                            }
                        />
                    </div>
                </div>
                {/* <div className="form-group">
                    <FileUpload
                        accept=".jpg,.png,.jpeg,.pdf"
                        label="Attachment File(s)"
                        multiple
                        updateFilesCb={updateUploadedFiles}
                    />
                </div> */}
                <div className="custom-control custom-checkbox">
                    <Field
                        name="enableAttach"
                        id="enableAttach"
                        component="input"
                        type="checkbox"
                        className="custom-control-input"
                    />
                    <label className="custom-control-label noselect" htmlFor="enableAttach">Enable Attachment</label>
                </div> 
                <div className="form-group mt-3">
                    <div>
                        <Field
                            label="Attachment Name"
                            name="attachment"
                            component={renderField}
                            type="text"
                            placeholder="input attachment name"
                            className="form-control"
                        />
                    </div>
                </div>

                <div>
                    <button disabled={pristine || submitting} type="submit" className="btn btn-success mt-3">Send Email</button>
                </div>
            </form>
        </div>
     );
}
 

MailEditForm = reduxForm({
    form: 'mailForm',
})(MailEditForm);

 
export default MailEditForm;

