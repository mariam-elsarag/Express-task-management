import { ReactNode, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { KebabMenu } from "../../assets/icons/Icon";

interface MenuProps {
  data: object;
  list: [
    {
      icon: ReactNode;
      className?: string;
      title: string;
      action: (e: object) => void;
    }
  ];
  isFirstElement: boolean;
  isLastElement: boolean;
}
const Menu: React.FC<MenuProps> = ({
  data,
  list,
  isFirstElement,
  isLastElement,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onClose = () => {
    setToggleMenu(false);
  };
  const menuRef = useOutsideClick(onClose);

  return (
    <div className="relative" ref={menuRef}>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setToggleMenu(!toggleMenu)}
        onKeyDown={(e) => e.key === "Enter" && setToggleMenu(!toggleMenu)}
        className="cursor-pointer"
      >
        <KebabMenu />
      </span>
      {toggleMenu && (
        <ul
          className={`bg-white shadow-lg py-2 absolute z-10 rounded-lg min-w-[190px] ${
            isFirstElement
              ? "top-0"
              : isLastElement
              ? "bottom-0"
              : "top-[50%] translate-y-[-50%]"
          } right-0 `}
        >
          {list?.map(
            (item, index) =>
              item && (
                <li
                  key={index}
                  className={`${item.className} flex items-center gap-2 px-4 py-3 hover:bg-primary-50 hover:text-grey-500 transition-all ease-in-out duration-300 cursor-pointer ibm_font font-ibm body1 text-grey-900   `}
                  onClick={() => {
                    item?.action(data);
                    setToggleMenu(false);
                  }}
                  role="menuitem"
                >
                  {item?.icon && <span>{item?.icon}</span>}
                  {item?.title && (
                    <span className={`${item?.style ? item?.style : ""}`}>
                      {item?.title}
                    </span>
                  )}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default Menu;
