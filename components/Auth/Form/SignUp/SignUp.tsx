"use client";
import { FaUser, FaLock, FaPhone, FaVoicemail, FaGoogle } from "react-icons/fa";

import Link from "next/link";
import AuthButton from "../../subcomponents/AuthButton";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";

import { useTranslations } from "next-intl";
import useSignUp from "./useSignUp";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

const SignUpForm = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("CreateUserPage");
  const {
    userData,

    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
    isLoading,
  } = useSignUp();
  return (
    <>
      <div className=" w-full grid gap-4 ">
        <CustomAuthInput
          name="firstName"
          label={t("firstNameLabel")}
          value={userData.firstName || ""}
          onChange={handleChange}
          icon={<FaUser />}
        />
        <CustomAuthInput
          name="lastName"
          label={t("lastNameLabel")}
          value={userData.lastName || ""}
          onChange={handleChange}
          icon={<FaUser />}
        />

        <CustomAuthInput
          value={userData.phone || ""}
          onChange={handleChange}
          label={t("phoneLabel")}
          // placeholder={t("phonePlaceholder")}
          name="phone"
          icon={<FaPhone />}
        />
        <CustomAuthInput
          value={userData.email || ""}
          onChange={handleChange}
          label={t("emailLabel")}
          // placeholder={t("emailPlaceholder")}
          name="email"
          icon={<FaGoogle />}
        />
      </div>
      <div className="flex justify-between items-center  mx-0.5">
        <Link
          href="/auth/login"
          className="block text-right text-grayscale-500 text-sm font-medium mt-2.5 hover:text-greenAccent-900"
        >
          {t("signInButton")}
        </Link>
        <Link
          href="/auth/forget-password"
          className="block text-right text-grayscale-500 text-sm font-medium mt-2.5 hover:text-greenAccent-900"
        >
          {t("forgotPasswordButton")}
        </Link>
      </div>

      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={isLoading}
      />
    </>
  );
};

export default SignUpForm;
