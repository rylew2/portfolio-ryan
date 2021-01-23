import { Container } from "reactstrap";

const BasePage = (props) => {
  const { className } = props;
  //   const className = props.className || "";
  return (
    <div className={`base-page ${className}`}>
      <Container>{props.children}</Container>
    </div>
  );
};
BasePage.defaultProps = {
  className: "",
};
// BasePage.PropTypes = {
//   className: PropTypes.any.isRequired,
// };

export default BasePage;
