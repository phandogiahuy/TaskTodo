import React from "react";
import { Icon, Menu, MenuItem, TableHeaderCell } from "semantic-ui-react";

const PaginationNumber = ({ page, Click, clickLeft, clickRight }) => {
  let menuItemPagination = [];
  for (let i = 1; i <= page.pageCount; i++) {
    menuItemPagination.push(
      <MenuItem
        name={i}
        as="a"
        key={i}
        active={i === page.page}
        onClick={Click}
      >
        {i}
      </MenuItem>
    );
  }
  return (
    <TableHeaderCell colSpan="6">
      <Menu floated="right" pagination>
        <MenuItem as="a" icon onClick={clickLeft}>
          <Icon name="chevron left" />
        </MenuItem>
        {menuItemPagination}
        <MenuItem as="a" icon onClick={clickRight}>
          <Icon name="chevron right" />
        </MenuItem>
      </Menu>
    </TableHeaderCell>
  );
};

export default PaginationNumber;
