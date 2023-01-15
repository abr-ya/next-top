import { useContext } from "react";
import { MenuContext } from "../../context/menu.context";

export const Menu = (): JSX.Element => {
  const { menu } = useContext(MenuContext);

  return (
    <div>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};
