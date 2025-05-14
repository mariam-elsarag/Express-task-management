import React from "react";

interface iconType {
  width?: string;
  height?: string;
  fill?: string;
}
export const EyeOn: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0001 20.2702C15.5301 20.2702 18.8201 18.1902 21.1101 14.5902C22.0101 13.1802 22.0101 10.8102 21.1101 9.40021C18.8201 5.80021 15.5301 3.72021 12.0001 3.72021C8.47009 3.72021 5.18009 5.80021 2.89009 9.40021C1.99009 10.8102 1.99009 13.1802 2.89009 14.5902C5.18009 18.1902 8.47009 20.2702 12.0001 20.2702Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const EyeOff: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.47 14.5298L2 21.9998"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 2L14.53 9.47"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const KeyIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7899 14.9298C17.7299 16.9798 14.7799 17.6098 12.1899 16.7998L7.4799 21.4998C7.1399 21.8498 6.4699 22.0598 5.9899 21.9898L3.8099 21.6898C3.0899 21.5898 2.4199 20.9098 2.3099 20.1898L2.0099 18.0098C1.9399 17.5298 2.1699 16.8598 2.4999 16.5198L7.1999 11.8198C6.3999 9.21982 7.0199 6.26982 9.0799 4.21982C12.0299 1.26982 16.8199 1.26982 19.7799 4.21982C22.7399 7.16982 22.7399 11.9798 19.7899 14.9298Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.88989 17.4902L9.18989 19.7902"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const EmailIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const UserIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const DashboardIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const TaskIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3701 8.88H17.6201"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.37988 8.88L7.12988 9.63L9.37988 7.38"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.3701 15.88H17.6201"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.37988 15.88L7.12988 16.63L9.37988 14.38"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const FolderIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
    </svg>
  );
};
export const UsersIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const NotificationIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.43994V9.76994"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.4399 20 14.6099 20 19.3899 18.41C20.7399 17.96 21.3199 16.38 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M15.3299 18.8201C15.3299 20.6501 13.8299 22.1501 11.9999 22.1501C11.0899 22.1501 10.2499 21.7701 9.64992 21.1701C9.04992 20.5701 8.66992 19.7301 8.66992 18.8201"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
    </svg>
  );
};
export const TrashIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5.98001C17.67 5.65001 14.32 5.48001 10.98 5.48001C9 5.48001 7.02 5.58001 5.04 5.78001L3 5.98001"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.8499 9.14001L18.1999 19.21C18.0899 20.78 17.9999 22 15.2099 22H8.7899C5.9999 22 5.9099 20.78 5.7999 19.21L5.1499 9.14001"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3301 16.5H13.6601"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 12.5H14.5"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const LogoutIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0001 12H3.62012"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.85 8.65002L2.5 12L5.85 15.35"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const GearIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const NotFoundIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M128.906 21.8752H21.0938C17.9869 21.8789 15.0083 23.1147 12.8114 25.3116C10.6145 27.5085 9.37865 30.4871 9.375 33.594V117.406C9.37865 120.513 10.6145 123.491 12.8114 125.688C15.0083 127.885 17.9869 129.121 21.0938 129.125H128.906C132.013 129.121 134.992 127.885 137.189 125.688C139.386 123.491 140.621 120.513 140.625 117.406V33.594C140.621 30.4871 139.386 27.5085 137.189 25.3116C134.992 23.1147 132.013 21.8789 128.906 21.8752ZM128.906 124.437H21.0938C19.2296 124.435 17.4423 123.694 16.1242 122.376C14.806 121.057 14.0645 119.27 14.0625 117.406V33.594C14.0645 31.7298 14.806 29.9426 16.1242 28.6244C17.4423 27.3062 19.2296 26.5648 21.0938 26.5627H128.906C130.77 26.5648 132.558 27.3062 133.876 28.6244C135.194 29.9426 135.935 31.7298 135.938 33.594V42.2411H24.3885C23.7669 42.2411 23.1708 42.4881 22.7312 42.9276C22.2917 43.3671 22.0447 43.9633 22.0447 44.5849C22.0447 45.2065 22.2917 45.8026 22.7312 46.2422C23.1708 46.6817 23.7669 46.9286 24.3885 46.9286H135.938V117.406C135.935 119.27 135.194 121.057 133.876 122.376C132.558 123.694 130.77 124.435 128.906 124.437Z"
        fill={fill}
      />
      <path
        d="M97.207 36.7438C98.5014 36.7438 99.5508 35.6944 99.5508 34.4C99.5508 33.1056 98.5014 32.0563 97.207 32.0563C95.9126 32.0563 94.8633 33.1056 94.8633 34.4C94.8633 35.6944 95.9126 36.7438 97.207 36.7438Z"
        fill={fill}
      />
      <path
        d="M111.461 36.7438C112.755 36.7438 113.805 35.6944 113.805 34.4C113.805 33.1056 112.755 32.0563 111.461 32.0563C110.167 32.0563 109.117 33.1056 109.117 34.4C109.117 35.6944 110.167 36.7438 111.461 36.7438Z"
        fill={fill}
      />
      <path
        d="M125.717 36.7438C127.011 36.7438 128.061 35.6944 128.061 34.4C128.061 33.1056 127.011 32.0563 125.717 32.0563C124.422 32.0563 123.373 33.1056 123.373 34.4C123.373 35.6944 124.422 36.7438 125.717 36.7438Z"
        fill={fill}
      />
      <path
        d="M54.6836 64.5892C54.3758 64.5892 54.071 64.6497 53.7866 64.7675C53.5022 64.8852 53.2438 65.0579 53.0261 65.2755C52.8085 65.4932 52.6358 65.7516 52.5181 66.036C52.4003 66.3204 52.3398 66.6252 52.3398 66.933V80.9955C52.3392 81.6169 52.0921 82.2127 51.6527 82.6521C51.2133 83.0915 50.6175 83.3386 49.9961 83.3392H40.6211C39.9997 83.3386 39.4039 83.0915 38.9645 82.6521C38.5251 82.2127 38.278 81.6169 38.2773 80.9955V66.933C38.2773 66.3114 38.0304 65.7152 37.5909 65.2757C37.1513 64.8362 36.5552 64.5892 35.9336 64.5892C35.312 64.5892 34.7159 64.8362 34.2763 65.2757C33.8368 65.7152 33.5898 66.3114 33.5898 66.933V80.9955C33.5919 82.8597 34.3333 84.6469 35.6515 85.9651C36.9697 87.2832 38.7569 88.0247 40.6211 88.0267H49.9961C50.7964 88.0188 51.5893 87.8727 52.3398 87.5949V104.433C52.3398 105.055 52.5868 105.651 53.0263 106.09C53.4659 106.53 54.062 106.777 54.6836 106.777C55.3052 106.777 55.9013 106.53 56.3409 106.09C56.7804 105.651 57.0273 105.055 57.0273 104.433V66.933C57.0274 66.6252 56.9669 66.3204 56.8491 66.036C56.7313 65.7516 56.5587 65.4932 56.3411 65.2755C56.1234 65.0579 55.865 64.8852 55.5806 64.7675C55.2962 64.6497 54.9914 64.5892 54.6836 64.5892Z"
        fill={fill}
      />
      <path
        d="M114.066 64.5892C113.759 64.5892 113.454 64.6497 113.169 64.7675C112.885 64.8852 112.627 65.0579 112.409 65.2755C112.191 65.4932 112.019 65.7516 111.901 66.036C111.783 66.3204 111.723 66.6252 111.723 66.933V80.9955C111.722 81.6169 111.475 82.2127 111.036 82.6521C110.596 83.0915 110 83.3386 109.379 83.3392H100.004C99.3825 83.3386 98.7867 83.0915 98.3473 82.6521C97.9079 82.2127 97.6608 81.6169 97.6602 80.9955V66.933C97.6602 66.3114 97.4132 65.7152 96.9737 65.2757C96.5342 64.8362 95.938 64.5892 95.3164 64.5892C94.6948 64.5892 94.0987 64.8362 93.6591 65.2757C93.2196 65.7152 92.9727 66.3114 92.9727 66.933V80.9955C92.9747 82.8597 93.7161 84.6469 95.0343 85.9651C96.3525 87.2833 98.1397 88.0247 100.004 88.0267H109.379C110.179 88.0188 110.972 87.8727 111.723 87.5949V104.433C111.723 105.055 111.97 105.651 112.409 106.09C112.849 106.53 113.445 106.777 114.066 106.777C114.688 106.777 115.284 106.53 115.724 106.09C116.163 105.651 116.41 105.055 116.41 104.433V66.933C116.41 66.6252 116.35 66.3204 116.232 66.036C116.114 65.7516 115.942 65.4932 115.724 65.2755C115.506 65.0579 115.248 64.8852 114.963 64.7675C114.679 64.6497 114.374 64.5892 114.066 64.5892Z"
        fill={fill}
      />
      <path
        d="M79.6875 64.5892H70.3125C68.4483 64.5913 66.6611 65.3327 65.3429 66.6509C64.0247 67.9691 63.2833 69.7563 63.2812 71.6205V99.7455C63.2833 101.61 64.0247 103.397 65.3429 104.715C66.6611 106.033 68.4483 106.775 70.3125 106.777H79.6875C81.5517 106.775 83.3389 106.033 84.6571 104.715C85.9753 103.397 86.7167 101.61 86.7188 99.7455V71.6205C86.7167 69.7563 85.9753 67.9691 84.6571 66.6509C83.3389 65.3327 81.5517 64.5913 79.6875 64.5892ZM82.0312 99.7455C82.0306 100.367 81.7835 100.963 81.3441 101.402C80.9047 101.841 80.3089 102.089 79.6875 102.089H70.3125C69.6911 102.089 69.0953 101.841 68.6559 101.402C68.2165 100.963 67.9694 100.367 67.9688 99.7455V71.6205C67.9694 70.9991 68.2165 70.4033 68.6559 69.9639C69.0953 69.5245 69.6911 69.2774 70.3125 69.2767H79.6875C80.3089 69.2774 80.9047 69.5245 81.3441 69.9639C81.7835 70.4033 82.0306 70.9991 82.0312 71.6205V99.7455Z"
        fill={fill}
      />
    </svg>
  );
};
export const BurgerIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7H21"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3 12H21"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3 17H21"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
export const NotificationWithLine: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0201 1.90991C9.71009 1.90991 7.02009 4.59991 7.02009 7.90991V10.7999C7.02009 11.4099 6.76009 12.3399 6.45009 12.8599L5.30009 14.7699C4.59009 15.9499 5.08009 17.2599 6.38009 17.6999C10.6901 19.1399 15.3401 19.1399 19.6501 17.6999C20.8601 17.2999 21.3901 15.8699 20.7301 14.7699L19.5801 12.8599C19.2801 12.3399 19.0201 11.4099 19.0201 10.7999V7.90991C19.0201 4.60991 16.3201 1.90991 13.0201 1.90991Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M14.8699 2.19994C14.5599 2.10994 14.2399 2.03994 13.9099 1.99994C12.9499 1.87994 12.0299 1.94994 11.1699 2.19994C11.4599 1.45994 12.1799 0.939941 13.0199 0.939941C13.8599 0.939941 14.5799 1.45994 14.8699 2.19994Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.02 18.0601C16.02 19.7101 14.67 21.0601 13.02 21.0601C12.2 21.0601 11.44 20.7201 10.9 20.1801C10.36 19.6401 10.02 18.8801 10.02 18.0601"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M20.0299 3.47998L4.17993 19.33"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const NotificationWithDot: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0201 2.90991C8.71009 2.90991 6.02009 5.59991 6.02009 8.90991V11.7999C6.02009 12.4099 5.76009 13.3399 5.45009 13.8599L4.30009 15.7699C3.59009 16.9499 4.08009 18.2599 5.38009 18.6999C9.69009 20.1399 14.3401 20.1399 18.6501 18.6999C19.8601 18.2999 20.3901 16.8699 19.7301 15.7699L18.5801 13.8599C18.2801 13.3399 18.0201 12.4099 18.0201 11.7999V8.90991C18.0201 5.60991 15.3201 2.90991 12.0201 2.90991Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M17 9C18.6569 9 20 7.65685 20 6C20 4.34315 18.6569 3 17 3C15.3431 3 14 4.34315 14 6C14 7.65685 15.3431 9 17 9Z"
        fill="#949498"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const WarningIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 9V14"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9999 21.41H5.93993C2.46993 21.41 1.01993 18.93 2.69993 15.9L5.81993 10.28L8.75993 5C10.5399 1.79 13.4599 1.79 15.2399 5L18.1799 10.29L21.2999 15.91C22.9799 18.94 21.5199 21.42 18.0599 21.42H11.9999V21.41Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9946 17H12.0036"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const InvitationIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 12V6C19 3.79 19 2 15 2H9C5 2 5 3.79 5 6V12"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5498 9.22998H13.8798"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.72021 6.22998H14.7202"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const ChevronIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.08002"
        stroke={fill}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const SearchIcon: React.FC<iconType> = ({
  width = "20",
  height = "20",
  fill = "var(--color-grey-300)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 22L20 20"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
