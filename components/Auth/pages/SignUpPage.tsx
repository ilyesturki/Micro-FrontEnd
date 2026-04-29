import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SignUpForm from "@/components/Auth/Form/SignUp/SignUp";
import { useTranslations } from "next-intl";
const SignUpPage = () => {
  const t = useTranslations("CreateUserPage");
  return (
    <CustomAuthPage title={t("title")}>
      <SignUpForm AuthButtonTitle={t("submitButton")} />
    </CustomAuthPage>
  );
};

export default SignUpPage;
