const appendImageFileToFormData = (
  profileImageFile: File | null,
  key: string
) => {
  if (!profileImageFile) {
    return null;
  }

  const formData = new FormData();
  formData.append(key, profileImageFile);

  return formData;
};

export default appendImageFileToFormData;
