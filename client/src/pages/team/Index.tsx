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
import { handleError } from "../../utils/handleErrors";
import axiosInstance from "../../servicses/axiosInstance";
import { toast } from "react-toastify";
import Action from "../../components/table/Action";

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
    data: teams,
    setData: setTeams,
    query: teamQuery,
    setQuery: teamSetQuery,
    handlePagination: teamHandlePagination,
    page: teamPage,
    pages: teamPages,
    loading: teamLoader,
    setRefetchData: teamSetRefetchData,
  } = usePaginatedData("/api/team/");

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const watchedMembers = watch("members");

  const columns = [
    { field: "full_name", header: "Member" },
    { field: "role", header: "Role" },
  ];
  // team table
  const teamColumns = [
    { field: "name", header: "Team" },
    { field: "projects", header: "Porojects" },
    { field: "members", header: "Members" },
    { field: "action", header: "" },
  ];
  const formattedData =
    users?.map((user) => {
      const memberIndex = watchedMembers.findIndex(
        (m) => m.user === user.userId
      );
      const isChecked = memberIndex !== -1;

      return {
        full_name: (
          <Controller
            key={`checkbox-${user.userId}`}
            name="members"
            control={control}
            rules={{
              validate: (value) => {
                console.log(value, "val");
                if (!value || value.length === 0) {
                  return "At least one member must be selected";
                } else {
                  return true;
                }
              },
            }}
            render={({ field }) => {
              const index = field.value.findIndex(
                (m: any) => m.user === user.userId
              );
              const isChecked = index > -1;

              const handleChange = () => {
                if (isChecked) {
                  const newMembers = field.value.filter(
                    (m: any) => m.user !== user.userId
                  );
                  field.onChange(newMembers);
                } else {
                  field.onChange([
                    ...field.value,
                    { user: user.userId, role: "member" },
                  ]);
                }
              };

              return (
                <div className="flex items-center gap-4">
                  <Checkbox
                    inputId={`user-${user.userId}`}
                    checked={isChecked}
                    onChange={handleChange}
                    invalid={errors?.members ? true : false}
                    disabled={loading}
                  />
                  <label htmlFor={`user-${user.userId}`}>
                    {user.full_name}
                  </label>
                </div>
              );
            }}
          />
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

  const teamFormateData = teams?.map((team) => ({
    name: <div>{team.team_name}</div>,
    projects: (
      <div> {team?.porjects?.map(({ name }) => name).join(",") || "-"}</div>
    ),
    members: (
      <div className="flex_center_y gap-1">
        {team.members?.length > 0 ? (
          <>
            {team.members?.slice(0, 3).map((m) => (
              <img
                key={m.userId}
                src={m.avatar}
                className="border border-grey-100 w-8 h-8 rounded-full"
              />
            ))}
            {team.members?.length > 3 && (
              <div className="w-8 h-8 text-xs flex_center bg-primary-50 rounded-full text-primary-500 ">
                +{team.members.length - 3}
              </div>
            )}
          </>
        ) : (
          "-"
        )}
      </div>
    ),
    action: (
      <Action
        viewPath={`/teams/${team.teamId}/detail`}
        deleteLink={`/api/team/${team.teamId}/`}
        confirmPopupMessage="Are you sure you want to delete this team?"
        refetchFn={() => {
          teamSetRefetchData(Date.now());
        }}
      />
    ),
  }));

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/team/", data);
      if (response.status === 201) {
        toast.success(response.data.message);
        setVisible(false);
        reset();
        setQuery({ search: null });
        teamSetRefetchData(Date.now());
      }
    } catch (err) {
      handleError(err, setError, ["name", "members"]);
    } finally {
      setLoading(false);
    }
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
        <div className="main_page flex flex-col gap-10 ">
          <header className="flex_center_y justify-end">
            <Button
              onClick={() => setVisible(true)}
              hasFullWidth={false}
              className="md:min-w-[200px]"
            >
              Create team
            </Button>
          </header>
          <Table_Container
            columns={teamColumns}
            data={teamFormateData}
            loading={teamLoader}
            onPageChange={teamHandlePagination}
            totalCount={teamPages}
            currentPage={teamPage}
            query={teamQuery}
            setQuery={teamSetQuery}
            page="teams"
          />
        </div>
      </section>

      <Modal open={visible} onClose={() => setVisible(false)}>
        <form
          className="w-full flex flex-col gap-2 "
          onSubmit={handleSubmit(onSubmit)}
        >
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
              noSearchWithEnter={true}
              page="teams"
              tableError={
                errors.members && (
                  <p className="text-sm text-error-800 mt-1">
                    {errors.members.message}
                  </p>
                )
              }
            />
          )}{" "}
          <div className="mt-4 flex justify-end">
            <Button loading={loading} buttonType="submit">
              Create new Team
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Index;
