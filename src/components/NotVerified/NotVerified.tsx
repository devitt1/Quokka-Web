import { useState } from "react";
import { useSelector } from "react-redux";
import APIClient from "../../api/APIClient";
import { RootState } from "../../redux/reducers/rootReducer";
import { Button } from "../Button/Button";

function NotVerified() {
  const [apiClient] = useState(() => new APIClient());
  const {user} = useSelector((state : RootState) => state.auth);

  async function handleResend() {
    apiClient.authService
      .resendEmail(user?.id)
      .then(() => {
        // setShowSentPopup(true); This should open a modal which informs the user than an email has been send to their account
      })
      .catch((err) => {
        // setError(err); If the an error occurs what happens?
      });
  }

  return (
    <div>
      <p>Your profile is almost complete.</p>
      <p>
        To complete your profile please click the “Verify Email” link in the
        email we have just sent.
      </p>
      <Button
          onClick={() => {
            handleResend();
          }}
          name="Resend Email"
          types={["loginBtn"]}
        />
    </div>
  );
}

export default NotVerified;
