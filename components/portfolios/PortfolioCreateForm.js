// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validateInputs = (validate) => {
  const errors = {};
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = "Invalid email address";
  //   }
  return errors;
};

const PortfolioCreateForm = (props) => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;

//import React from "react";
// export default class PortfolioCreateForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "", description: "", language: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
//     // this.handleChangeDescription = this.handleChangeDescription.bind(this);
//   }

//   handleChange(event) {
//     const field = event.target.name;
//     this.setState({ [field]: event.target.value });
//   }

//   handleSubmit(event) {
//     alert(
//       "A name was submitted: " +
//         this.state.title +
//         " " +
//         this.state.description +
//         " " +
//         this.state.language
//     );
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="title"
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Pick your favorite Programming LAnguage:
//           <select
//             name="language"
//             value={this.state.language}
//             onChange={this.handleChange}
//           >
//             <option value="javascript">Javascript</option>
//             <option value="java">Java</option>
//             <option value="c++">c++</option>
//             <option value="c#">c#</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
