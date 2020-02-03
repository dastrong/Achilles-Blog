import React from 'react';
import { Link } from 'gatsby';

type Props = {
  path: string;
  daysSince: number;
  style?: {};
};

const DayPicker = ({ path, daysSince, style = {} }: Props) => (
  <Link to={path} key={path} className="daypicker-item" style={style}>
    {daysSince}
  </Link>
);

export default DayPicker;
