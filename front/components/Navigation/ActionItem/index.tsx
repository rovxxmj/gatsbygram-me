import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouteMatch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface IActionItem {
  icons?: { empty: React.ReactNode; fill: React.ReactNode };
  special?: boolean;
  route: string;
  onClick?: () => void;
  [key: string]: any;
}

const Base = styled.div<{ special?: boolean }>`
  width: 36px;
  height: 36px;
  margin-left: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  ${({ special }) =>
    special &&
    `
    & svg {
       border-radius: 30%;
       font-size: 30px;
       background: linear-gradient(45deg, #feda75, #fa7e1e , #d62976, #962fbf, #4f5bd5)
  }
  `}
`;
const ActionItem: FC<IActionItem> = ({ icons, icon, special, onClick, route, rest }) => {
  const [state, setState] = useState(false);
  const { pathname } = useLocation();
  const onClickItem = useCallback(() => {
    if (onClick) onClick();
    setState((prev) => !prev);
  }, []);
  return (
    <Base special={special} onClick={onClickItem} {...rest}>
      {/*<Link to={route}>{match && route !== '/' ? icons?.fill : icons?.empty}</Link>*/}
      <Link to={route}>{route === pathname ? icons?.fill : icons?.empty}</Link>
    </Base>
  );
};

export default ActionItem;
