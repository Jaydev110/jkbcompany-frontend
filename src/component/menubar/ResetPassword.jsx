import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../api/contactapi";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================================
  // RESET PASSWORD
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        password: newPassword,
      });

      alert("Password Reset Successfully");

      // Clear form
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Email not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jkb-reset-page">

      {/* =========================================
          RESET PASSWORD CARD
      ========================================= */}

      <div className="reset-card">

        {/* JKB LOGO */}
        <div className="jkb-reset-logo">
          JKB
        </div>

        {/* HEADING */}
        <h1>Reset Password</h1>

        <p className="reset-subtitle">
          Create a new password for your JKB Company account
        </p>

        {/* =========================================
            FORM
        ========================================= */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="reset-input-group">

            <label htmlFor="reset-email">
              Email
            </label>

            <input
              id="reset-email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* NEW PASSWORD */}
          <div className="reset-input-group">

            <label htmlFor="new-password">
              New Password
            </label>

            <div className="reset-password-box">

              <input
                id="new-password"
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="reset-show-password"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
              >
                {showNewPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}
          <div className="reset-input-group">

            <label htmlFor="confirm-password">
              Confirm Password
            </label>

            <div className="reset-password-box">

              <input
                id="confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="reset-show-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* RESET BUTTON */}
          <button
            type="submit"
            className="jkb-reset-button"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>


        {/* =========================================
            BACK TO LOGIN
        ========================================= */}

        <div className="reset-login-link">

          <span>
            Remember your password?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;