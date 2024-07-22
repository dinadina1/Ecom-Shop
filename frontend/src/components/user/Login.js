import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Overlay, Popover } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Credential alert
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title={`Login`} />

      {/* Login Form */}

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <div className="d-flex justify-content-between">
              <h1 className="mb-3 d-inline">Login</h1>
              {/* Credentials */}
              <div className="d-inline mb-2 " ref={ref}>
                <Button className="m-0 mt-2" onClick={handleClick}>
                  Click to See Credentials!
                </Button>
                <Overlay
                  show={show}
                  target={target}
                  placement="right"
                  container={ref.current}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Title about="h3">Admin</Popover.Title>
                    <Popover.Content>
                      <strong>Email:</strong> admin@gmail.com <br />
                      <strong>Password:</strong> 123456
                    </Popover.Content>
                    <Popover.Title about="h3">User</Popover.Title>
                    <Popover.Content>
                      <strong>Email:</strong> user@gmail.com <br />
                      <strong>Password:</strong> 123456
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
