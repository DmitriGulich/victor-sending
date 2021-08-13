import React, {useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import renderField from '../../utils/renderField';
import JoditEditor from "jodit-react";

let MailEditForm = (props) => {
    const { errors, handleSubmit, pristine, submitting, onChangeContent } = props;

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
                    <div>
                        <Field
                            label="Subject"
                            name="subject"
                            component={renderField}
                            type="text"
                            placeholder=""
                            className="form-control ml-3"
                            inline="form-inline"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <Field
                            label="To"
                            name="to"
                            component={renderField}
                            type="text"
                            placeholder=""
                            className="form-control ml-3"
                            inline="form-inline"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => {
                                setContent(newContent) // preferred to use only this option to update the content for performance reasons
                                onChangeContent(newContent)
                            }
                        // onChange={newContent => onChangeContent(newContent)
                        }
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

