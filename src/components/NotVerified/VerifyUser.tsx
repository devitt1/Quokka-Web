import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIClient from "../../api/APIClient";
import { Button } from "../Button/Button";

function VerifyUser() {
  const { token } = useParams();
  const [apiClient] = useState(() => new APIClient());
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    apiClient.authService
      .verifyEmail(token)
      .then((res) => {
        // if (!user.isVerified) {
        //   setUser({
        //     ...user,
        //     isVerified: res.data.isVerified,
        //     role: res.data.role,
        //   });
        // }
        //Set state to update isVerified on frontend to be true
        setLoading(false);
      })
      .catch((err) => {
        //Handle the case of an error happening when verification fails
        setLoading(false);
        setFailed(true);
      });
  }, [apiClient.authService, token]);

  function handleEnter() {
    history("/circuitBuilder");
  }

  return (
    <div>
      {loading && !failed && <p>Loading...</p>}
      {!loading && failed && (
        <>
          <p className="heading">Unable to verify email</p>
          <p className="text mb-4">
            Please resend the email verification. If you are not logged in, you
            will be redirected to the log in page where you can send the
            verification email.
          </p>

          <Button
            name="Back to Login"
            onClick={() => {
              history("/login");
            }}
            types={["loginBtn"]}
          />
        </>
      )}
      {!loading && !failed && (
        <>
          <p>Email Verified. Welcome to The Q Webapp</p>
          <p className="mt-4">
            Thank you for verifying your email, click the button below to enter
            The Q Webapp.
          </p>
          <Button
            name="Enter Site"
            onClick={handleEnter}
            types={["loginBtn"]}
          />
        </>
      )}
    </div>
  );
}

export default VerifyUser;
