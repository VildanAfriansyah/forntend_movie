import { connect } from "react-redux";

import { loginWithGoogle } from "../redux/action/auth/loginActions";
import "../assets/css/login.css";
const Login = (props) => {
  const handleOutsideClick = () => {
    props.onClose();
  };

  const login = () => {
    props.loginWithGoogle();
  };

  return (
    <div
      className={props.isLogin ? "login-active" : "login-inactive"}
      onClick={handleOutsideClick}
    >
      <div className="modal-login">
        <div className="modal-head">
          <a className="modal-tittle">Login</a>
        </div>
        <div className="modal-body">
          <input
            type="submit"
            className="login-google"
            value="google"
            onClick={login}
          />
          <a>or</a>
          <input type="submit" className="login-facebook" value="facebook" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  loginWithGoogle,
})(Login);
