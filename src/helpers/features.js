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

export const profileHeaders = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    disable: false
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    disable: false
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'number',
    disable: false
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    disable: true
  },
  {
    name: 'id',
    label: "Seller's Id",
    type: 'number',
    disable: true
  },
  {
    name: 'role',
    label: 'Role',
    type: 'text',
    disable: true
  },
  {
    name: 'appliedDate',
    label: 'Applied Date',
    type: 'date',
    disable: true
  },
  {
    name: 'approvedDate',
    label: 'Approved Date',
    type: 'date',
    disable: true
  },
  {
    name: 'shopStartTime',
    label: "Opens At",
    type: 'time',
    disable: false
  },
  {
    name: 'shopEndTime',
    label: 'Closes At',
    type: 'time',
    disable: false
  },
  {
    name: 'shopName',
    label: 'Shop Name',
    type: 'text',
    disable: false
  },
  {
    name: 'gst',
    label: 'GST Number',
    type: 'text',
    disable: false
  }
]


export const securityHeaders = [
  {
    name: 'oldpassword',
    label: 'Old Password',
    type: 'password',
    disable: false
  },
  {
    name: 'newpassword',
    label: 'New Password',
    type: 'password',
    disable: false
  },
  {
    name: 'confirmpassword',
    label: 'Confirm Password',
    type: 'password',
    disable: false
  },
]