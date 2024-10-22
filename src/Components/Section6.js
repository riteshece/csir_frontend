import React, { useState } from "react";
import FooterBar from "./common/footer";
import Header from "./common/header";
import Sidebar from "./common/sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const countries = ["Chemical (CHE)", "E-Commerce(E-Com)"];
const rows = [
  {
    refNo: "ritesh",
    technolgyKnowHow: "javascript",
    yearOfDevelopment: "2024",
    trl: 6,
    // lastUpdatedOn: "24 June",
  },
];

const SectionForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-1/4" />
        <div className="w-full">
          <div className=" p-4 grid grid-cols-2 gap-1 w-full">
            <div className="bg-gray-300 p-4 font-bold text-center">
              Laboratory/Institute Name
            </div>
            <div className="bg-gray-300 p-4 font-bold text-center">Select</div>
            <div className="bg-gray-300 p-4 ">
              <label className="block mb-2 text-sm font-medium text-gray-700 p-4 font-bold">
                Council of Scientific and Industrial Research,Head Quarter
              </label>
            </div>
            <div className="bg-gray-300 p-4 ">
              <label
                htmlFor="country-select"
                className="block mb-2 text-sm font-medium text-gray-700 "
              ></label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Technology/Knowhow Ref No</TableCell>
                  <TableCell align="right">
                    Name of Technology/Knowhow
                  </TableCell>
                  <TableCell align="right">Year of Development</TableCell>
                  <TableCell align="right">TRL Level</TableCell>
                  <TableCell align="right">Last Updated On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.refNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.refNo}
                    </TableCell>
                    <TableCell align="right">{row.technolgyKnowHow}</TableCell>
                    <TableCell align="right">{row.yearOfDevelopment}</TableCell>
                    <TableCell align="right">{row.trl}</TableCell>
                    <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <FooterBar />
    </div>
  );
};

export default SectionForm;
