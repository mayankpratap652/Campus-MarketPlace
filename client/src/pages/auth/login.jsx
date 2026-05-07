import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner"

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  let dispatch = useDispatch()

  function onSubmit(event) {
    event.preventDefault();
    // alert('Logged in')

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {

        toast("Success", {
          description: data?.payload?.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

      } else {
        toast("Failed", {
          description: data?.payload?.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    }).catch((err) => {
      console.log(err);
      alert('Success Failed')
    })
  }

  return (
    <div className="mx-auto  w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground cursor-pointer">
          Sign in to your account
        </h1>
        <p className="mt-2 text-black">
          Don't have an account?
          <Link
            className="font-medium ml-2 hover:underline text-blue-500"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm 
    
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;