import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  let dispatch = useDispatch()

  function onSubmit(event) {
    event.preventDefault();//for page refresh
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {

        toast("Success", {
          description: data?.payload?.message,
          action: {
            label: "Exit",
            onClick: () => console.log("Exit"),
          },
        })

        setTimeout(() => {
          navigate('/auth/login')
        }, 4000);
      } else {
        toast("Failed", {
          description: data?.payload?.message,
          action: {
            label: "Exit",
            onClick: () => console.log("Exit"),
          },
        })
      }
    }).catch((err) => {
      console.log(err);
      alert('Success Failed')
    })


  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2 text-black">
          Already have an account?
          <Link
            className="font-medium ml-2 text-blue-500 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;