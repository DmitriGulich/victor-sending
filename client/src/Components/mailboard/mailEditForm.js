import React from 'react';
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import renderField from '../../utils/renderField';


let MailEditForm = (props) => {
    const { errors, handleSubmit, pristine, submitting } = props;

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
                        <label>Content</label>
                        <Field
                            label="Content"
                            name="html"
                            component="textarea"
                            type="textarea"
                            placeholder=""
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

