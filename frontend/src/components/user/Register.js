import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Overlay, Popover } from "react-bootstrap";
import MetaData from "../layouts/MetaData";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  }); 
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

    // Credential alert
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
      };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
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
    <div className="row wrapper">
        <MetaData title={`Register`} />
      <div className="col-10 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg"
          encType="multipart/form-data"
        >
          <div className="d-flex justify-content-between">
            <h1 className="mb-3 d-inline">Register</h1>
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
            <label htmlFor="email_field">Name</label>
            <input
              name="name"
              onChange={onChange}
              type="name"
              id="name_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              name="email"
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              name="password"
              onChange={onChange}
              type="password"
              id="password_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
