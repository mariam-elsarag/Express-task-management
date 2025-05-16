import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/ui/form/Form";
import useGetData from "../../hooks/useGetData";
import Button from "../../components/ui/button/Button";
import { handleError } from "../../utils/handleErrors";
import axiosInstance from "../../servicses/axiosInstance";
import { toast } from "react-toastify";
import { dirtyFieldsOnly } from "../../utils/dirtyFields";

const statusList = [
  { name: "Planned", value: "planned" },
  { name: "In progress", value: "in_progress" },
  { name: "Completed", value: "completed" },
  { name: "On hold", value: "on_hold" },
  { name: "Delayed", value: "delayed" },
];
const Crud_Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isEdit = location.pathname.includes("edit") ? true : false;

  const { data: teams } = useGetData("/api/team/list");

  // ___________________ use form ____________________
  const initalValue = {
    name: "",
    description: "",
    status: "",
    team: "",
    start_date: null,
    end_date: null,
    image: null,
  };
  const {
    control,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: initalValue,
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "image",
      fieldName: "image",

      className: "flex_center flex-col",
    },
    {
      id: 1,
      formType: "input",
      fieldName: "name",
      validator: {
        required: "Project name is required",
        maxLength: {
          value: 50,
          message: "Title shouldn't exceed 50 character",
        },
      },
      label: "Project name",
      placeholder: "Enter project name",
      type: "text",
    },
    {
      id: 2,
      formType: "textarea",
      fieldName: "description",
      label: "Description",
      placeholder: "Enter project name",
    },
    {
      id: 3,
      formType: "calendar",
      fieldName: "start_date",
      label: "Start date",
      placeholder: "Enter start date",
      validator: {
        required: "Start date is required",
      },
      isGrouped: true,
      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    },
    {
      id: 4,
      formType: "calendar",
      fieldName: "end_date",
      label: "End date",
      placeholder: "Enter end date",
      validator: {
        required: "End date is required",
        validate: (value) => {
          const startDate = watch("start_date");
          if (startDate) {
            return (
              value > startDate || "End date must be later thant start date"
            );
          }
        },
      },
      groupWith: 3,
    },
    {
      id: 5,
      formType: "dropdown",
      fieldName: "team",
      label: "Team",
      placeholder: "Select team ",

      optionList: teams?.map((item) => ({
        name: item.name,
        value: item?.teamId,
      })),

      isGrouped: true,
      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    },
    {
      id: 6,
      formType: "dropdown",
      fieldName: "status",
      label: "Status",
      placeholder: "Select status ",
      validator: {
        required: "status is required",
      },
      optionList: statusList,
      groupWith: 5,
    },
  ];

  // ______________________ submit ________________
  const onSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);

      const formData = new FormData();
      const sendData = isEdit ? dirtyFieldsOnly(data, dirtyFields) : data;
      const method = isEdit ? "patch" : "post";
      const endpoint = isEdit ? `/api/project/${id}` : `/api/project`;

      Object.keys(sendData).forEach((key) => {
        formData.append(key, sendData[key]);
      });

      const response = await axiosInstance[method](endpoint, formData);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          isEdit
            ? "Project updated successfully"
            : "Project created successfully"
        );
        navigate("/project");
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="page_shadow inner_page min-h-screen flex flex-col gap-8"
    >
      <h1 className="text-grey-300 text-xl font-semibold">
        {isEdit ? "Update project" : "Create new Project"}
      </h1>
      <div className="flex flex-col gap-3">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
          setError={setError}
        />
      </div>
      <Button>{isEdit ? "Save" : "Create project"}</Button>
    </form>
  );
};

export default Crud_Project;
