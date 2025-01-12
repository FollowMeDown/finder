import React, { ReactNode } from "react";
import { plus, minus, div, ceil, gt } from "../scripts/math";
import NoDataYet from "./NoDataYet";

import PaginationButtons from "./PaginationButtons";

type Props = {
  title: string;
  link?: (page: string) => { pathname: string; search: string };
  action?: (page: string) => void;
  children: ReactNode;
};

const Pagination = (props: Pagination & Props) => {
  const { page, limit, totalCnt } = props;
  const { title, link, action, children } = props;
  const total = Number(ceil(div(totalCnt, limit)));

  const getLinks = () =>
    link && {
      prev: link(minus(page, 1)),
      next: link(plus(page, 1))
    };

  const getActions = () =>
    action && {
      prev: () => action(minus(page, 1)),
      next: () => action(plus(page, 1))
    };

  return gt(totalCnt, 0) ? (
    <>
      {children}
      <PaginationButtons
        links={getLinks()}
        actions={getActions()}
        current={page}
        total={total}
      />
    </>
  ) : (
    <NoDataYet context={title} />
  );
};

export default Pagination;
