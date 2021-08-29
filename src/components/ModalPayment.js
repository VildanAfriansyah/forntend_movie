import { connect } from "react-redux";

import { loginWithGoogle } from "../redux/action/auth/loginActions";
import "../assets/css/login.css";

const Payment = (props) => {
  const handleOutsideClick = () => {
    props.onClose();
  };

  return (
    <div
      className={props.isLogin ? "payment-active" : "payment-inactive"}
      onClick={handleOutsideClick}
    >
      <div className="modal-payment">asd</div>
    </div>
  );
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  loginWithGoogle,
})(Payment);
