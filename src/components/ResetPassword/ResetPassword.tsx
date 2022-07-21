import styles from "../UpdatePassword/UpdatePassword.module.scss";
import React, { useState } from "react";
import Form from "../Form/Form";
import {
    Formik,
} from 'formik';
import FormLabel from "../Form/FormLabel/FormLabel";
import underlay_quokka_icon from "../../assets/underlay_quokka_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import APIClient from "../../api/APIClient";

const ResetPassword : React.FC = () => {
    const [apiClient] = useState(() => new APIClient());
    let navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit() {
        apiClient.authService
          .resetPassword(token, password)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            //Handle error in case password reset doesn't work. Maybe a popup appears?
          });
      }

    return <div className={styles.updatePassword} >
        <img className={styles.underlayImage} src={underlay_quokka_icon}/>

        <Formik initialValues={{}} onSubmit={handleSubmit}>
            {() => (
                <Form label="update password" name="update">
                    <Form.FormLabel label="Reset Password"/>
                    <Form.FormInput
                        inputType="password"
                        placeholder="Create New Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.FormInput
                        inputType="password"
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.FormButton label="Update"/>
                </Form>
            )}
        </Formik>

    </div>
}

export default ResetPassword;
