import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/ui/form/Form";

const Crud_Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isEdit = location.pathname.includes("edit") ? true : false;

  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    watch,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "",
      team: "",
      start_date: null,
      end_date: null,
      image: null,
    },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
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
      id: 1,
      formType: "textarea",
      fieldName: "description",
      label: "Description",
      placeholder: "Enter project name",
    },
    {
      id: 2,
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
      id: 3,
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
      groupWith: 2,
    },
  ];

  // ______________________ submit ________________
  const onSubmit = (data) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="page_shadow inner_page h-screen flex flex-col gap-3"
    >
      <Form
        formList={formList}
        control={control}
        errors={errors}
        loading={loading}
      />
    </form>
  );
};

export default Crud_Project;
