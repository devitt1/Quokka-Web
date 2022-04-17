import styles from "./UpdatePassword.module.scss";
import React from "react";
import Form from "../Form/Form";
import {
    Formik,
} from 'formik';
import FormLabel from "../Form/FormLabel/FormLabel";



const UpdatePassword : React.FC = () => {
    return <div className={styles.updatePassword} >

        <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
                <Form label="update password" name="update">
                    <Form.FormLabel label="Update Password"/>
                    <Form.FormInput label="Current Password"/>
                    <Form.FormInput label="Create New Password"/>
                    <Form.FormInput label="Confirm New Password"/>
                    <Form.FormButton label="Update"/>
                </Form>
            )}
        </Formik>

    </div>
}

export default UpdatePassword;
