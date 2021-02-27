import React, { Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';


const ActiveLink = ({children, router, ...props}) => {
  const child = Children.only(children); //verify only providing one child
  let className = child.props.className || "";

  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`
  }

  delete props.activeClassName;

// create a clone of the a element child and add some props to it

  return <Link {...props}>{React.cloneElement(child, {className})}</Link>;
}

export default withRouter(ActiveLink);
