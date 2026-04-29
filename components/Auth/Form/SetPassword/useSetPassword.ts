import { setPassword } from "@/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleError } from "@/utils/handleError";
import { customHandleChange, customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { setPasswordValidationRules } from "@/utils/validationRules";
import { useRouter} from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface setPasswordType {
  email: string;
  token: string;
  password: string;
}

const initialSetPasswordState: setPasswordType = {
  email: "",
  token: "",
  password: "",
};

const useSetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [setPasswordData, setSetPasswordData] = useState<setPasswordType>(
    initialSetPasswordState
  );
  const loading = useAppSelector((state) => state.auth.loading);

  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token") as string | undefined;
    const email = params.get("email") as string | undefined;
    if (token && email) {
      setSetPasswordData({ ...setPasswordData, token, email });
    }
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customHandleChange(e, setSetPasswordData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      email: setPasswordData.email,
      token: setPasswordData.token,
      password: setPasswordData.password,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      setPasswordValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    customHandleSubmit(
      e,
      {},
      {
        email: setPasswordData.email,
        token: setPasswordData.token,
        newPassword: setPasswordData.password,
      },
      (formData) =>
        dispatch(setPassword({ data: formData })).then((e: any) => {
          if (!e.error) {
            router.push("/auth/login");
          }
        }),
      handleReset
    );
  };
  const handleReset = () => {
    setSetPasswordData(initialSetPasswordState);
  };

  return {
    setPasswordData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useSetPassword;
