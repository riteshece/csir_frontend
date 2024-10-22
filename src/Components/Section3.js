import { useState, useEffect } from "react";
import axios from "axios";
import FooterBar from "./common/footer";
import Header from "./common/header";
import Section from "./common/section";
import Sidebar from "./common/sidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home4 = () => {
  const initialValues = {
    royaltyReceived: [{ amount: "", date: null }],
    premiaReceived: [{ amount: "", date: null }],
    LicenseName: "",
    DateOfAgreementSigning: null,
    TypeofLicense: "",
    StaRegionalGeography: "",
    DetailsOfExclusivity: "",
    DateOfLicense: null,
    LicenseValidUpto: null, // <-- Set this to null or a valid date
    PaymentTerms: "",
  };

  const [royalties, setRoyalties] = useState([{ amount: "", date: null }]);
  const [premias, setPremias] = useState([{ amount: "", date: null }]);
  const [royaltySubtotal, setRoyaltySubtotal] = useState(0);
  const [premiaSubtotal, setPremiaSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Date limits
  const minDate = new Date("1900-08-12");
  const maxDate = new Date("3000-08-12");

  useEffect(() => {
    const totalRoyalties = royalties.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );
    const totalPremias = premias.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );

    // Update Subtotals
    setRoyaltySubtotal(totalRoyalties);
    setPremiaSubtotal(totalPremias);

    // Calculate Grand Total
    setGrandTotal(totalRoyalties + totalPremias);
  }, [royalties, premias]);

  const validationSchema = Yup.object({
    LicenseName: Yup.string()
      .max(300, "Max. 300 characters")
      .required("Required"),
    DateOfAgreementSigning: Yup.date().required("Required"),
    TypeofLicense: Yup.string().required("Required"),
    StaRegionalGeography: Yup.string().required("Required"),
    DetailsOfExclusivity: Yup.string().max(300, "Max. 300 characters"),
    DateOfLicense: Yup.date().required("Required"),
    LicenseValidUpto: Yup.date().required("Required"),
    PaymentTerms: Yup.string().max(300, "Max. 300 characters"),
    // Add validation for royalties and premias if necessary
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    const url = "http://localhost:8081/createData"; // Replace with your API endpoint
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(url, values, { headers })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Form submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Form submission failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const addRoyalty = () => {
    setRoyalties([...royalties, { amount: "", date: null }]);
  };

  const removeRoyalty = (index) => {
    const updatedRoyalties = royalties.filter((_, i) => i !== index);
    setRoyalties(updatedRoyalties);
  };

  const addPremia = () => {
    setPremias([...premias, { amount: "", date: null }]);
  };

  const removePremia = (index) => {
    const updatedPremias = premias.filter((_, i) => i !== index);
    setPremias(updatedPremias);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-800">
          <Sidebar />
        </div>
        <div className="flex-1 p-8 bg-blue-200 border">
          <Section sectionLine="Section 3: Details of License - Add/Modify Sub Form" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                {/* License Name */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="LicenseName">
                    License Name.
                    <span className="Hint block text-sm text-red-500 inline">
                      Max. 300 Characters
                    </span>
                  </label>
                  <Field
                    maxLength="300"
                    type="text"
                    name="LicenseName"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  />
                  <ErrorMessage
                    name="LicenseName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Date of Agreement Signing */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="DateOfAgreementSigning">
                    Date of Agreement Signing &nbsp;
                  </label>
                  <DatePicker
                    selected={values.DateOfAgreementSigning}
                    onChange={(date) =>
                      setFieldValue("DateOfAgreementSigning", date)
                    }
                    dateFormat="dd/MM/yyyy"
                    minDate={minDate}
                    maxDate={maxDate}
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    placeholderText="Select a date"
                  />
                  <ErrorMessage
                    name="DateOfAgreementSigning"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Type of License */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="TypeofLicense">
                    Type of License
                  </label>
                  <Field
                    name="TypeofLicense"
                    as="select"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  >
                    <option value="">--Please Select--</option>
                    <option value="Exclusive">Exclusive</option>
                    <option value="Non-Exclusive">Non-Exclusive</option>
                  </Field>
                  <ErrorMessage
                    name="TypeofLicense"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Regional Geography */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="StaRegionalGeography">
                    Regional Geography
                  </label>
                  <Field
                    name="StaRegionalGeography"
                    as="select"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  >
                    <option value="">--Please Select--</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                  </Field>
                  <ErrorMessage
                    name="StaRegionalGeography"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Details of Exclusivity */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="DetailsOfExclusivity">
                    Details of Exclusivity: &nbsp;
                    <span className="Hint block text-sm text-red-500 inline">
                      Max. 300 Characters
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="DetailsOfExclusivity"
                    as="textarea"
                    maxLength="300"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  />
                  <ErrorMessage
                    name="DetailsOfExclusivity"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Date of License */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="DateOfLicense">
                    Date of License &nbsp;
                  </label>
                  <DatePicker
                    selected={values.DateOfLicense}
                    onChange={(date) => setFieldValue("DateOfLicense", date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={minDate}
                    maxDate={maxDate}
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    placeholderText="Select a date"
                  />
                  <ErrorMessage
                    name="DateOfLicense"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* License Valid Upto */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="LicenseValidUpto">
                    License Valid Upto &nbsp;
                  </label>
                  <DatePicker
                    selected={values.LicenseValidUpto}
                    onChange={(date) => setFieldValue("LicenseValidUpto", date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={minDate}
                    maxDate={maxDate}
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    placeholderText="Select a date"
                  />
                  <ErrorMessage
                    name="LicenseValidUpto"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Payment Terms */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="PaymentTerms">
                    Payment Terms: &nbsp;
                    <span className="Hint block text-sm text-red-500 inline">
                      Max. 300 Characters
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="PaymentTerms"
                    as="textarea"
                    maxLength="300"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  />
                  <ErrorMessage
                    name="PaymentTerms"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Royalty Received */}
                {royalties.map((royalty, index) => (
                  <div
                    className="form-group mb-4 flex items-center"
                    key={index}
                  >
                    <div className="w-1/2">
                      <label
                        className="font-bold"
                        htmlFor={`royaltyAmount_${index}`}
                      >
                        Royalty Received (in INR)
                      </label>
                      <Field
                        maxLength="300"
                        type="number"
                        step="0.01"
                        name={`royaltyAmount_${index}`}
                        className="w-full p-2 text-lg outline-0.1 rounded-md"
                        onChange={(e) => {
                          const updatedRoyalties = [...royalties];
                          updatedRoyalties[index].amount = e.target.value;
                          setRoyalties(updatedRoyalties);
                        }}
                        value={royalty.amount}
                      />
                      <ErrorMessage
                        name={`royaltyAmount_${index}`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="w-1/5 pl-4">
                      <label
                        className="font-bold"
                        htmlFor={`royaltyDate_${index}`}
                      >
                        Date of Royalty Received
                      </label>
                      <DatePicker
                        selected={royalty.date}
                        onChange={(date) => {
                          const updatedRoyalties = [...royalties];
                          updatedRoyalties[index].date = date;
                          setRoyalties(updatedRoyalties);
                        }}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDate}
                        maxDate={maxDate}
                        className="w-full p-2 text-lg outline-0.1 rounded-md"
                        placeholderText="Select a date"
                      />
                    </div>
                    <div className="pl-4">
                      {royalties.length > 1 && (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded-md mt-5 mb-1"
                          onClick={() => removeRoyalty(index)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                  onClick={addRoyalty}
                >
                  Add more
                </button>

                {/* Royalty Subtotal */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="RoyaltySubtotal">
                    Subtotal Royalty Received (in INR)
                  </label>
                  <Field
                    maxLength="300"
                    type="number"
                    name="RoyaltySubtotal"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    value={royaltySubtotal}
                    readOnly
                  />
                </div>

                {/* Premia Received */}
                {premias.map((premia, index) => (
                  <div
                    className="form-group mb-4 flex items-center"
                    key={index}
                  >
                    <div className="w-1/2">
                      <label
                        className="font-bold"
                        htmlFor={`premiaAmount_${index}`}
                      >
                        Premia Received (in INR)
                      </label>
                      <Field
                        maxLength="300"
                        type="number"
                        step="0.01"
                        name={`premiaAmount_${index}`}
                        className="w-full p-2 text-lg outline-0.1 rounded-md"
                        onChange={(e) => {
                          const updatedPremias = [...premias];
                          updatedPremias[index].amount = e.target.value;
                          setPremias(updatedPremias);
                        }}
                        value={premia.amount}
                      />
                      <ErrorMessage
                        name={`premiaAmount_${index}`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="w-1/5 pl-4">
                      <label
                        className="font-bold"
                        htmlFor={`premiaDate_${index}`}
                      >
                        Date of Premia Received
                      </label>
                      <DatePicker
                        selected={premia.date}
                        onChange={(date) => {
                          const updatedPremias = [...premias];
                          updatedPremias[index].date = date;
                          setPremias(updatedPremias);
                        }}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDate}
                        maxDate={maxDate}
                        className="w-full p-2 text-lg outline-0.1 rounded-md"
                        placeholderText="Select a date"
                      />
                    </div>
                    <div className="pl-4">
                      {premias.length > 1 && (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded-md mt-5 mb-1"
                          onClick={() => removePremia(index)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                  onClick={addPremia}
                >
                  Add more
                </button>

                {/* Premia Subtotal */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="PremiaSubtotal">
                    Subtotal Premia Received (in INR)
                  </label>
                  <Field
                    maxLength="300"
                    type="number"
                    name="PremiaSubtotal"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    value={premiaSubtotal}
                    readOnly
                  />
                </div>

                {/* Grand Total */}
                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="GrandTotal">
                    Grand Total (in INR)
                  </label>
                  <Field
                    maxLength="300"
                    type="number"
                    name="GrandTotal"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                    value={grandTotal}
                    readOnly
                  />
                </div>

                <div className="text-center mb-8">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default Home4;
