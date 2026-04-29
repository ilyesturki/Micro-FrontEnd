"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { credentialsSignInValidationRules } from "@/utils/validationRules";

const useSignIn = () => {
  const authEmail = useAppSelector((state) => state.auth.email);

  const loading = useAppSelector((state) => state.auth.loading);

  const [email, setEmail] = useState<string>(authEmail || "");
  const [password, setPassword] = useState<string>("");

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleKeepSignedIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setKeepSignedIn(!keepSignedIn);
  };

  const router = useRouter();
  const params = useSearchParams();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    const redirectTo = "/dashboard/parking";
    // role === "admin"
    //   ? "/dashboard/users"
    //   : ["top-management", "corporaite"].includes(userCategory || "")
    //   ? "/dashboard/panel/fps-panel"
    //   : "/dashboard/fps";
    router.push(redirectTo);
  }, [session]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataToValidate: Record<string, string> = {
      email: email,
      password: password,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      credentialsSignInValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    signIn("credentials", {
      email,
      password,
    });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    keepSignedIn,
    handleKeepSignedIn,
    handleSubmit,
    loading,
  };
};

export default useSignIn;
