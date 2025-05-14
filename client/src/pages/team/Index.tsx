import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import Modal from "../../components/modal/Modal";
import Page_Header from "../../components/ui/header/Page_Header";
import Button from "../../components/ui/button/Button";
import Table_Container from "../../components/table/Table_Container";
import usePaginatedData from "../../hooks/usePaginatedData";
import Form from "../../components/ui/form/Form";

const roleOptions = [
  { label: "Leader", value: "leader" },
  { label: "Member", value: "member" },
];

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const {
    data: users,
    query,
    setQuery,
    handlePagination,
    page,
    pages,
    loading: loadingUsers,
  } = usePaginatedData("/api/team/user");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const watchedMembers = watch("members");
  console.log(watchedMembers, "");
  const handleToggleUser = (userId: string) => {
    const index = watchedMembers.findIndex((m) => m.user === userId);
    if (index > -1) {
      remove(index);
    } else {
      append({ user: userId, role: "member" });
    }
  };

  const columns = [
    { field: "full_name", header: "Member" },
    { field: "role", header: "Role" },
  ];

  const formattedData =
    users?.map((user) => {
      const memberIndex = watchedMembers.findIndex(
        (m) => m.user === user.userId
      );
      const isChecked = memberIndex !== -1;

      return {
        full_name: (
          <div key={user.userId} className="flex items-center gap-4">
            <Checkbox
              inputId={`user-${user.userId}`}
              onChange={() => handleToggleUser(user.userId)}
              checked={isChecked}
            />
            <label htmlFor={`user-${user.userId}`}>{user.full_name}</label>
          </div>
        ),
        role: isChecked ? (
          <Controller
            key={`dropdown-${user.userId}`}
            control={control}
            name={`members.${memberIndex}.role`}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={roleOptions}
                placeholder="Select Role"
                className="w-[150px]"
              />
            )}
          />
        ) : (
          "-"
        ),
      };
    }) ?? [];

  const onSubmit = (data: any) => {
    console.log("FORM DATA", data);
    // send to API
  };

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
        </div>
      </section>

      <Modal open={true} onClose={() => setVisible(false)}>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
          />

          {users?.length > 0 && (
            <Table_Container
              columns={columns}
              data={formattedData}
              loading={loadingUsers}
              onPageChange={handlePagination}
              totalCount={pages}
              currentPage={page}
              query={query}
              setQuery={setQuery}
            />
          )}

          <div className="mt-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Index;
