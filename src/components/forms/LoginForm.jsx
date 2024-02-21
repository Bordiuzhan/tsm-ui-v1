import { useForm } from "react-hook-form";
import { useStore } from "../../store/useStore";
import { useLocation, useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  const location = useLocation();
  const fullPath =
    location.state?.from && location.state?.from.key === "default"
      ? location.state?.from
      : "/";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useStore((state) => state.login);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const { email, password } = data;
    login(email, password);
    navigate(fullPath.pathname);
  });
  return (
    <div
      className="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r "
      style={{ minWidth: "320px" }}
    >
      <h4 className="fw-300 c-grey-900 mB-40">Login</h4>
      <form onSubmit={onSubmit}>
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <div className="peers ai-c jc-fe fxw-nw">
          <div className="peer">
            <button className="btn btn-primary btn-color">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
