import axios from "axios";
import FooterBar from "./common/footer";
import Header from "./common/header";
// import MyForm from "./common/button";
import Section from "./common/section";
import Sidebar from "./common/sidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home3 = () => {
  const initialValues = {
    technologyRefNo: "",
    fileNo: "",
    keywordTechnology: "",
    nameKnowhow: "",
    industrialSector: "",
  };

  const [selectedDate, setSelectedDate] = useState(null);

  // Define the min and max date limits
  const minDate = new Date("1800-08-12");
  const maxDate = new Date("3000-08-12");

  const validationSchema = Yup.object({
    // technologyRefNo: Yup.string().required("Required"),
    // fileNo: Yup.string().required("Required"),
    // keywordTechnology: Yup.string().required("Required"),
    // nameKnowhow: Yup.string().required("Required"),
    // industrialSector: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("handle submit is calling******************", values);
    const url = "http://localhost:8081/createData"; // Replace with your API endpoint
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(url, values, { headers: headers })
      .then((response) => {
        console.log("Response data:", response.data);
        Swal.fire({
          title: "Success!",
          text: "Form submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Form submission failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="bg-gray-800">
          <Sidebar />
        </div>
        {/* Form */}
        <div className="flex-1 p-8 bg-blue-200 border">
          <Section sectionLine="Section 2 : IPR Status -Add/Modify Sub Form " />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-group mb-4">
                  <label
                    className="font-bold flex justify-between"
                    htmlFor="iprType"
                  >
                    IPR Type
                    <span className="Hint block text-xs text-red-500 inline text-end">
                      *Mandatory Field*
                    </span>
                  </label>
                  <Field
                    name="iprType"
                    as="select"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  >
                    <option value="">--Please Select--</option>
                    <option value="patent">Patent</option>
                    <option value="trademark">Trademark</option>
                    <option value="copyright">Copyright</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="iprType"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="RegistrationNo">
                    Registration No.
                    <span className="Hint block text-sm text-red-500 inline">
                      Max. 50 Characters
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="RegistrationNo"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  />
                  <ErrorMessage
                    name="RegistrationNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="form-group">
                  <label className="font-bold" htmlFor="Status">
                    Status
                  </label>
                  <Field
                    name="Status"
                    as="select"
                    className="w-full p-2 text-lg outline-0.1 rounded-md"
                  >
                    <option value="">--Please Select Status--</option>
                    <option value="Applied for">Applied for</option>
                    <option value="Filed">Filed</option>
                    <option value="Pending for Grant">Pending for Grant</option>
                    <option value="Granted">Granted</option>
                    <option value="Lapsed">Lapsed</option>
                    <option value="Abandoned">Abandoned</option>
                  </Field>
                  <ErrorMessage
                    name="Status"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="form-group ">
                  <label className="font-bold" htmlFor="StatusDate">
                    Status Date: &nbsp;
                  </label>
                  <div className="Home3">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={minDate}
                      maxDate={maxDate}
                      className="w-full p-2 text-lg outline-0.1 rounded-md"
                      placeholderText="Select a date "
                    />
                  </div>

                  <ErrorMessage
                    name="StatusDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="font-bold" htmlFor="country">
                    Country
                  </label>
                  <Field
                    name="country"
                    as="select"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">--Please Select--</option>
                    <option value="AF">Afghanistan (AF)</option>
                    <option value="OA">
                      African Intellectual Property Organization (OA)
                    </option>
                    <option value="AP">
                      African Regional Intellectual Property Organization (AP)
                    </option>
                    <option value="AL">Albania (AL)</option>
                    <option value="DZ">Algeria (DZ)</option>
                    <option value="AD">Andorra (AD) </option>
                    <option value="AO">Angola (AO)</option>
                    <option value="AI">Anguilla (AI)</option>
                    <option value="AG">Antigua And Barbuda (AG)</option>
                    <option value="AR">Argentina (AR)</option>
                    <option value="AM">Armenia (AM)</option>
                    <option value="AW">Aruba (AW)</option>
                    <option value="AU">Australia (AU)</option>
                    <option value="AT">Austria (AT)</option>
                    <option value="AZ">Azerbaijan (AZ)</option>
                    <option value="BS">Bahamas (BS)</option>
                    <option value="BH">Bahrain (BH)</option>
                    <option value="BD">Bangladesh (BD)</option>
                    <option value="BB">Barbados (BB )</option>
                    <option value="BY">Belarus (By)</option>
                    <option value="BE">Belgium (BE)</option>
                    <option value="BZ">Belize (Bz)</option>
                    <option value="BX">Benelux (BX)</option>
                    <option value="BJ">Benin (BJ)</option>
                    <option value="BM">Bermuda (BM)</option>
                    <option value="BT">Bhutan (BT)</option>
                    <option value="BO">Bolivia (BO)</option>
                    <option value="BA">Bosnia And Herzegovina (BA)</option>
                    <option value="BW">Botswana (BY)</option>
                    <option value="BV">Bouvet Island (BV)</option>
                    <option value="BR">Brazil (BR)</option>
                    <option value="BN">Brunei Darussalam (BN)</option>
                    <option value="BG">Bulgaria (BY)</option>
                    <option value="BF">Burkina Faso (BY)</option>
                    <option value="BI">Burundi (BI)</option>
                    <option value="KH">Cambodia (KH)</option>
                    <option value="CM">Cameroon (CM)</option>
                    <option value="CA">Canada (CA)</option>
                    <option value="CV">Cape Verde (CV)</option>
                    <option value="KY">Cayman Islands (KY)</option>
                    <option value="CF">Central African Republic (CF)</option>
                    <option value="TD">Chad (TD)</option>
                    <option value="CL">Chile (CL)</option>
                    <option value="CN">China (CN)</option>
                    <option value="QZ">
                      Community Plant Variety Office (QZ)
                    </option>
                    <option value="KM">Comoros (KM)</option>
                    <option value="CG">Congo (CG)</option>
                    <option value="CK">Cook Islands (CK)</option>
                    <option value="CR">Costa Rica (CR)</option>
                    <option value="CI">Côte D’ivoire (CI)</option>
                    <option value="HR">Croatia (HR)</option>
                    <option value="CU">Cuba (CU)</option>
                    <option value="CY">Cyprus (CY)</option>
                    <option value="CZ">Czech Republic(CZ)</option>
                    <option value="CD">
                      Democratic Republic Of The Congo (CD)
                    </option>
                    <option value="DK">Denmark (DK)</option>
                    <option value="DJ">Djibouti (DJ)</option>
                    <option value="DM">Dominica (DM)</option>
                    <option value="DO">Dominican Republic (DO)</option>
                    <option value="EC">Ecuador (EC)</option>
                    <option value="EG">Egypt (EG)</option>
                    <option value="SV">El Salvador (SV)</option>
                    <option value="GQ">Equatorial Guinea (GQ)</option>
                    <option value="ER">Eritrea (ER)</option>
                    <option value="EE">Estonia (EE)</option>
                    <option value="ET">Ethiopia (ET)</option>
                    <option value="EA">
                      Eurasian Patent Organization (EA)
                    </option>
                    <option value="EP">European Patent Office (EP)</option>
                    <option value="FK">Falkland Islands (Malvinas) (FK)</option>
                    <option value="FO">Faroe Islands (FO)</option>
                    <option value="FJ">Fiji (FJ)</option>
                    <option value="FI">Finland (FI)</option>
                    <option value="FR">France (FR)</option>
                    <option value="GA">Gabon (GA)</option>
                    <option value="GM">Gambia (GM)</option>
                    <option value="GE">Georgia (GE)</option>
                    <option value="DE">Germany (DE)</option>
                    <option value="GH">Ghana (GH)</option>
                    <option value="GI">Gibraltar (GI)</option>
                    <option value="GR">Greece (GR)</option>
                    <option value="GL">Greenland (GL)</option>
                    <option value="GD">Grenada (GD)</option>
                    <option value="GT">Guatemala (GT)</option>
                    <option value="GG">Guernsey (GG)</option>
                    <option value="GN">Guinea (GN)</option>
                    <option value="GW">Guinea–Bissau (GW)</option>
                    <option value="GCC">Gulf Cooperation Council (GCC)</option>
                    <option value="GY">Guyana (GY)</option>
                    <option value="HT">Haiti (HT)</option>
                    <option value="HN">Honduras (HN)</option>
                    <option value="HK">Hong Kong (HK)</option>
                    <option value="HU">Hungary (HU)</option>
                    <option value="IS">Iceland (IS)</option>
                    <option value="IN">India (IS) </option>
                    <option value="ID">Indonesia (IS)</option>
                    <option value="IR">Iran (IR)</option>
                    <option value="IQ">Iraq (IQ)</option>
                    <option value="IE">Ireland (IE)</option>
                    <option value="IM">Isle Of Man (IM)</option>
                    <option value="IL">Israel (IL)</option>
                    <option value="IT">Italy (IT)</option>
                    <option value="JM">Jamaica (JM)</option>
                    <option value="JP">Japan (JP)</option>
                    <option value="JE">Jersey (JE)</option>
                    <option value="JO">Jordan (JO)</option>
                    <option value="KZ">Kazakhstan (KZ)</option>
                    <option value="KE">Kenya (KE)</option>
                    <option value="KI">Kiribati (KI)</option>
                    <option value="KW">Kuwait (KW)</option>
                    <option value="KG">Kyrgyzstan (KG)</option>
                    <option value="LA">Lao (LA)</option>
                    <option value="LV">Latvia (LV)</option>
                    <option value="LB">Lebanon (LB)</option>
                    <option value="LS">Lesotho (LS)</option>
                    <option value="LR">Liberia (LR)</option>
                    <option value="LY">Libya (LY)</option>
                    <option value="LI">Liechtenstein (LI)</option>
                    <option value="LT">Lithuania (LT)</option>
                    <option value="LU">Luxembourg (LU)</option>
                    <option value="MO">Macao (MO)</option>
                    <option value="MK">Macedonia (MK)</option>
                    <option value="MG">Madagascar (MG)</option>
                    <option value="ML">Mal (ML)</option>
                    <option value="MW">Malawi (MW)</option>
                    <option value="MY">Malaysia (MY)</option>
                    <option value="MV">Maldives (MV)</option>
                    <option value="MT">Malta (MT)</option>
                    <option value="MR">Mauritania (MR)</option>
                    <option value="MU">Mauritius (MU)</option>
                    <option value="MX">Mexico (MX)</option>
                    <option value="MD">Moldova (MD)</option>
                    <option value="MC">Monaco (MC)</option>
                    <option value="MN">Mongolia (MN)</option>
                    <option value="ME">Montenegro (ME)</option>
                    <option value="MS">Montserrat (MS)</option>
                    <option value="MA">Morocco (MA)</option>
                    <option value="MZ">Mozambique (MZ)</option>
                    <option value="MM">Myanmar (MM)</option>
                    <option value="NA">Namibia (NA)</option>
                    <option value="NR">Nauru (NR)</option>
                    <option value="NP">Nepal (NP)</option>
                    <option value="NL">Netherlands (NL)</option>
                    <option value="AN">Netherlands Antilles (AN)</option>
                    <option value="NZ">New Zealand (NZ)</option>
                    <option value="NI">Nicaragua (NI)</option>
                    <option value="NE">Niger (NE)</option>
                    <option value="NG">Nigeria (NG)</option>
                    <option value="XN">Nordic Patent Institute (XN)</option>
                    <option value="KP">North Korea (KP)</option>
                    <option value="MP">Northern Mariana Islands (MP)</option>
                    <option value="NO">Norway (NO)</option>
                    <option value="EM">
                      Office For Harmonization In The Internal Market (EM)
                    </option>
                    <option value="OM">Oman (OM)</option>
                    <option value="PK">Pakistan (PK)</option>
                    <option value="PW">Palau (PW)</option>
                    <option value="PA">Panama (PA)</option>
                    <option value="PG">Papua New Guinea (PG)</option>
                    <option value="PY">Paraguay (PY)</option>
                    <option value="PE">Peru (PE)</option>
                    <option value="PH">Philippines (PH)</option>
                    <option value="PL">Poland (PL)</option>
                    <option value="PT">Portugal (PT)</option>
                    <option value="QA">Qatar (QA)</option>
                    <option value="RO">Romania (RO)</option>
                    <option value="RU">Russia (RU)</option>
                    <option value="RW">Rwanda (RW)</option>
                    <option value="SH">Saint Helena (SH)</option>
                    <option value="KN">Saint Kitts And Nevis (KN)</option>
                    <option value="LC">Saint Lucia (LC)</option>
                    <option value="VC">
                      Saint Vincent And The Grenadines (VC)
                    </option>
                    <option value="WS">Samoa (WS)</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="form-group mb-4 flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md "
                  >
                    Save
                  </button>
                </div>
                {/* <MyForm/> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default Home3;
