import { activate } from "@/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleError } from "@/utils/handleError";
import { customHandleChange, customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { activateValidationRules } from "@/utils/validationRules";
import {  useRouter} from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface activateType {
  email: string;
  token: string;
}

const initialActivateState: activateType = {
  email: "",
  token: "",
};

const useActivate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activateData, setActivateData] =
    useState<activateType>(initialActivateState);
  const loading = useAppSelector((state) => state.auth.loading);

  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token") as string | undefined;
    if (token) {
      setActivateData({ ...activateData, token });
    }
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customHandleChange(e, setActivateData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      email: activateData.email,
      token: activateData.token,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      activateValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    customHandleSubmit(
      e,
      {},
      {
        email: activateData.email,
        token: activateData.token,
      },
      (formData) =>
        dispatch(activate({ data: formData })).then((e: any) => {
          if (!e.error) {
            router.push(
              `/auth/set-password?token=${activateData.token}&email=${activateData.email}`
            );
          }
        }),
      handleReset
    );
  };
  const handleReset = () => {
    setActivateData(initialActivateState);
  };

  return {
    activateData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useActivate;
