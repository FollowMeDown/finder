import React from "react";
import s from "./PaginationButtons.module.scss";
import { Link } from "react-router-dom";

type Props = {
  current: number;
  total: number;
  links?: { [key: string]: { pathname: string; search: string } };
  actions?: { [key: string]: () => void };
};

const PaginationButtons = ({ current, total, links, actions }: Props) => {
  const renderAction = (key: string, children: string, disabled: boolean) =>
    disabled ? (
      <span className={s[key]}>{children}</span>
    ) : links ? (
      <Link to={links[key]} className={s[key]}>
        {children}
      </Link>
    ) : (
      <button onClick={actions && actions[key]} className={s[key]}>
        {children}
      </button>
    );

  return total ? (
    <div className={s.wrapper}>
      <div className={s.component}>
        {renderAction("start", "«", current === 1)}
        {renderAction("prev", "‹", current === 1)}
        <span className={s.text}>{`${current} of ${total}`}</span>
        {renderAction("next", "›", current === total)}
        {renderAction("end", "»", current === total)}
      </div>
    </div>
  ) : null;
};

export default PaginationButtons;
