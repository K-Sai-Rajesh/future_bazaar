export const features = {
  font_Family: [
    "Nunito",
    "Ubuntu",
    "Sevillana",
    "Dancing Script",
    "EB Garamond",
    "Edu TAS Beginner",
    "Libre Baskerville",
    "Montserrat",
    "Rajdhani",
    "Raleway",
    "Teko",
  ],
  font_Weight: Array.from({ length: 10 }, (_, i) => i * 100),
  font_Size: Array.from({ length: 50 }, (_, i) => i + 1),
  border: [
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "initial",
    "inherit",
  ],
  border_Size: Array.from({ length: 50 }, (_, i) => i + 1),
  font_Style: ["normal", "italic"],
  grid: [2, 4, 6, 12],
};

export const StudentForm = [
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dob",
  },
  {
    label: "Father's Name",
    type: "text",
    name: "father_name",
  },
  {
    label: "Mother's Name",
    type: "text",
    name: "mother_name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Gaurdian's Name",
    type: "text",
    name: "gaurdian_name",
  },
  {
    label: "Gaurdian's Contact Number",
    type: "number",
    name: "gaurdian_number",
    length: 10,
  },
  {
    label: "Address",
    type: "text",
    name: "address",
  },
  {
    label: "Class",
    type: "number",
    name: "class",
    length: 2,
    options: [],
  },
  {
    label: "Section",
    type: "text",
    name: "section",
    options: [],
  },
  {
    label: "Status",
    type: "text",
    name: "status",
    options: ["Select", "Enrolled", "Transferred", "Promoted"],
  },
  {
    label: "Roll Number",
    type: "number",
    name: "roll_number",
    length: 10,
  },
  {
    label: "Role",
    type: "text",
    name: "role",
    options: ["Select", "Admin", "Student", "Teacher"],
  },
  {
    label: "Gender",
    type: "text",
    name: "gender",
    options: ["Select", "Male", "Female"],
  },
  {
    label: "Aadhar Number",
    type: "number",
    name: "aadhar_number",
    length: 12,
  },
  {
    label: "Religion",
    type: "text",
    name: "religion",
    options: ["Select", "Hindu", "Muslim", "Sikh", "Christian"],
  },
  {
    label: "State",
    type: "text",
    name: "state",
    options: [
      "Select",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    label: "Previous School",
    type: "text",
    name: "previous_school",
  },
  {
    label: "Current School Code",
    type: "text",
    name: "school_code",
  },
  {
    label: "Date of Admission",
    type: "date",
    name: "admission_date",
  },
];

export const TeacherForm = [
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dob",
  },
  {
    label: "Father's Name",
    type: "text",
    name: "father_name",
  },
  {
    label: "Mother's Name",
    type: "text",
    name: "mother_name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Gaurdian's Name",
    type: "text",
    name: "gaurdian_name",
  },
  {
    label: "Gaurdian's Contact Number",
    type: "number",
    name: "gaurdian_number",
    length: 10,
  },
  {
    label: "Address",
    type: "text",
    name: "address",
  },
  {
    label: "Status",
    type: "text",
    name: "status",
    options: ["Select", "Stationed", "Transferred", "Promoted", "Resigned"],
  },
  {
    label: "Role",
    type: "text",
    name: "role",
    options: ["Select", "Admin", "Student", "Teacher"],
  },
  {
    label: "Gender",
    type: "text",
    name: "gender",
    options: ["Select", "Male", "Female"],
  },
  {
    label: "Aadhar Number",
    type: "number",
    name: "aadhar_number",
    length: 12,
  },
  {
    label: "Religion",
    type: "text",
    name: "religion",
    options: ["Select", "Hindu", "Muslim", "Sikh", "Christian"],
  },
  {
    label: "State",
    type: "text",
    name: "state",
    options: [
      "Select",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    label: "Previous School",
    type: "text",
    name: "previous_school",
  },
  {
    label: "Current School Code",
    type: "text",
    name: "school_code",
  },
  {
    label: "Date of Joining",
    type: "date",
    name: "admission_date",
  },
];

export const profileHeader = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "profile_id",
    numeric: true,
    disablePadding: false,
    label: "Profile Id",
  },
  {
    id: "school_code",
    numeric: true,
    disablePadding: false,
    label: "School Code",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "roll_number",
    numeric: true,
    disablePadding: false,
    label: "Roll Number",
  },
  {
    id: "class",
    numeric: true,
    disablePadding: false,
    label: "Class",
  },
  {
    id: "section",
    numeric: true,
    disablePadding: false,
    label: "Section",
  },
  {
    id: "dob",
    numeric: true,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "religion",
    numeric: true,
    disablePadding: false,
    label: "Religion",
  },
  {
    id: "father_name",
    numeric: true,
    disablePadding: false,
    label: "Father Name",
  },
  {
    id: "mother_name",
    numeric: true,
    disablePadding: false,
    label: "Mother Name",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
];

export const teacherHeader = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "profile_id",
    numeric: true,
    disablePadding: false,
    label: "Profile Id",
  },
  {
    id: "school_code",
    numeric: true,
    disablePadding: false,
    label: "School Code",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "dob",
    numeric: true,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "religion",
    numeric: true,
    disablePadding: false,
    label: "Religion",
  },
  {
    id: "father_name",
    numeric: true,
    disablePadding: false,
    label: "Father Name",
  },
  {
    id: "mother_name",
    numeric: true,
    disablePadding: false,
    label: "Mother Name",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
];

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name) {
  const string1 = name?.split(" ")[0][0];
  const string2 = name?.split(" ")[1] ? name?.split(" ")[1][0] : "";
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${string1}${string2}`,
  };
}

export const attendenceHeader = [
  {
    id: "class",
    numeric: false,
    disablePadding: true,
    label: "Class",
  },
  {
    id: "section",
    numeric: false,
    disablePadding: true,
    label: "Section",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];
