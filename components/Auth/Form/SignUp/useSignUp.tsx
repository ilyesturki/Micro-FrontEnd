"use client";
import { flexibleUserType } from "@/redux/users/usersSlice";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleForTostSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyUserValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createUser } from "@/redux/users/usersThunk";

import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";

const initialUserState: flexibleUserType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  image: "",
};
const useSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<flexibleUserType>(initialUserState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setUserData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customImagesChange<flexibleUserType>(e, setUserData, "image", setImageFile);
  };

  function validateAndSubmitUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        image: imageFile ? imageFile.type : "",
      };
      const newErrors = validateFormFields(
        dataToValidate,
        verifyUserValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        reject(newErrors);
        return;
      }

      customHandleForTostSubmit(
        { image: imageFile },
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
        },
        async (formData) => {
          try {
            const result = await dispatch(createUser(formData));

            if (result?.meta?.requestStatus === "rejected") {
              throw "Unknown error";
            }

            resolve();
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  const [isLoading, handleCreate] = useApiCallWithToast({
    apiCallFunction: () => validateAndSubmitUser(),
    handleSuccess: async () => {
      router.refresh();
      handleReset();
    },
    messages: {
      loading: "Creating user account...",
      success: "User account created successfully!",
      error: "Failed to create user account.",
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCreate();
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setImageFile(null);
    setUserData(initialUserState);
  };

  return {
    userData,

    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
    isLoading,
  };
};

export default useSignUp;
