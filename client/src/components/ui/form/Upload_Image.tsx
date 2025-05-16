import { useState } from "react";
import { toast } from "react-toastify";
import { CameraIcon } from "../../../assets/icons/Icon";
import Spinner from "../Spinner";

const maxFileSizeInMB = import.meta.env.VITE_REACT_APP_IMAGE_SIZE;
const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

interface UploadImageProps {
  value: string;
  error?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fieldName: string;
  setError: (name: string, error: { type: string; message: string }) => void;
  handleChange: (e: File) => void;
}

const Upload_Image: React.FC<UploadImageProps> = ({
  value,
  setError,
  error,
  fieldName,
  handleChange,
  loading,
  disabled,
}) => {
  const [img, setImg] = useState<string | null>(value);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;

      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        setError(fieldName, {
          type: "manual",
          message: "Only .jpg and .png files are allowed.",
        });
        toast.error("Only .jpg and .png files are allowed.");
      } else if (file.size > maxFileSizeInBytes) {
        setError(fieldName, {
          type: "manual",
          message: `Please upload an image smaller than ${maxFileSizeInMB} MB`,
        });
        toast.error(
          `Please upload an image smaller than ${maxFileSizeInMB} MB`
        );
      } else {
        const blobURL = URL.createObjectURL(file);
        setImg(blobURL);
        handleChange(file);
      }

      e.target.value = "";
    }
  };

  return (
    <div className="grid gap-2 mx-auto">
      <figure
        className={`border relative  w-[120px] h-[120px] rounded-full  ${
          error ? "border-error-800" : "border-grey-100"
        }`}
      >
        {img ? (
          <img
            src={img}
            alt="avatar"
            className="w-full h-full rounded-full object-cover object-center"
          />
        ) : (
          <div className="bg-body rounded-full w-full h-full p-1"></div>
        )}

        <label
          htmlFor="profile_avatar"
          className="absolute bottom-0 right-0 z-10 bg-body border border-gray-300 rounded-full w-8 h-8 flex_center transition-all ease-in-out duration-200 center"
        >
          {loading ? (
            <Spinner />
          ) : (
            <span className=" cursor-pointer">
              <CameraIcon
                width="17"
                height="18"
                fill="var(--color-primary-500)"
              />
            </span>
          )}
        </label>
      </figure>

      <input
        type="file"
        id="profile_avatar"
        accept=".jpg,.png"
        className="hidden"
        onChange={onFileChange}
        disabled={loading || disabled}
      />
    </div>
  );
};

export default Upload_Image;
