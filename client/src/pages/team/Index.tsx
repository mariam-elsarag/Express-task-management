import Page_Header from "../../components/ui/header/Page_Header";
import Button from "../../components/ui/button/Button";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import usePaginatedData from "../../hooks/usePaginatedData";
import { useForm } from "react-hook-form";
import Form from "../../components/ui/form/Form";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { data: users } = usePaginatedData("/api/team/user");

  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { name: "", members: [{ user: "", role: "" }] },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "name",
      validator: {
        required: "Team name is required",
      },
      label: "Team name",
      placeholder: "Team name",
      type: "text",
    },
  ];
  return (
    <>
      <section className="main_gap min-h-dvh">
        <Page_Header page="team" />
        <div className="main_page">
          <header className="flex_center_y justify-end">
            <Button
              onClick={() => setVisible(true)}
              hasFullWidth={false}
              className="md:min-w-[200px]"
            >
              Create team
            </Button>
          </header>
          <div>
            <Outlet />
          </div>
        </div>
      </section>
      {/* create team popup */}
      <Modal open={visible} onClose={() => setVisible(false)}>
        <form className="w-full ">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
          />
        </form>
      </Modal>
    </>
  );
};

export default Index;
