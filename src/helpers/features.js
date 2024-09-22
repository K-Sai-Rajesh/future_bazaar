import * as Yup from 'yup';

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


export const customerProfileHeaders = [
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

export const formKeys = [
  {
    id: "firstname",
    label: "First Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter First Name !`)
  },
  {
    id: "lastname",
    label: "Last Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter Last Name !`)

  },
  {
    id: "email",
    label: "Email Address (*)",
    type: 'text',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter Email !`)
  },
  {
    id: "shopName",
    label: "Shop Name (*)",
    type: 'text',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter shop  name !`)

  },
  {
    id: "shopPhoneNumber",
    label: "Shop Phone Number (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter Shop number !`)
  },
  {
    id: "shopDescription",
    label: "Shop Description (*)",
    type: 'text',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter shop description !`)
  },
  {
    id: "shopStartTime",
    label: "Shop Opening Time (*)",
    type: 'time',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter shop start time !`)
  },
  {
    id: "shopEndTime",
    label: "Shop Closing Time (*)",
    type: 'time',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter shop end time !`)
  },
  {
    id: "category",
    label: "Category (*)",
    type: 'text',
    isList: true,
    colSize: 4,
    error: Yup.string().required(`Select a category !`)
  },
  {
    id: "gst",
    label: "GST Number (optional)",
    type: 'number',
    isList: false,
    colSize: 4
  },
  {
    id: "phone",
    label: "Phone Number (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter phone number!`)
  },
  {
    id: "password",
    label: "Password (*)",
    type: 'password',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter password !`)
  },
  {
    id: "latitude",
    label: "Latitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter latitute !`)

  },
  {
    id: "longitude",
    label: "Longitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter longitude !`)
  },
  {
    id: "error",
    label: "Error (meters)",
    type: 'number',
    isList: false,
    colSize: 4
  },
]

export const customerKeys = [
  {
    id: "firstname",
    label: "First Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter First  Name !`)
  },
  {
    id: "lastname",
    label: "Last Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter Last  Name !`)
  },
  {
    id: "email",
    label: "Email Address (*)",
    type: 'text',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter Email !`)
  },
  {
    id: "phone",
    label: "Phone Number (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter phone number !`)
  },
  {
    id: "password",
    label: "Password (*)",
    type: 'password',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter password !`)
  },
  {
    id: "latitude",
    label: "Latitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter latitute of the shop !`)
  },
  {
    id: "longitude",
    label: "Longitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter longitute of the shop !`)
  },
  {
    id: "error",
    label: "Error (meters)",
    type: 'number',
    isList: false,
    colSize: 4
  },
]

export const links = [
  {
    link: 'admin',
    label: 'admin',
    access: ['admin']
  },
  {
    link: 'add category',
    label: 'add category',
    access: ['admin']
  },
  {
    link: 'profile/basic info',
    label: 'profile',
    access: ['admin', 'seller', 'customer']
  },
  {
    link: 'account',
    label: 'account',
    access: ['admin', 'seller']
  },
  {
    link: 'products',
    label: 'products',
    access: ['admin', 'seller']
  },
  {
    link: 'wish list',
    label: 'wish list',
    access: ['customer']
  }
]

export const authRoutes = [
  {
    route: 'basic info',
    access: ['admin', 'seller', 'customer']
  },
  {
    route: 'security',
    access: ['admin', 'seller', 'customer']
  },
  {
    route: 'account',
    access: ['admin', 'seller']
  },
  {
    route: 'products',
    access: ['admin', 'seller']
  },
  {
    route: 'add product',
    access: ['admin', 'seller']
  },
  {
    route: 'edit product',
    access: ['admin', 'seller']
  },
  {
    route: 'admin',
    access: ['admin']
  },
  {
    route: 'add category',
    access: ['admin']
  },
  {
    route: 'wish list',
    access: ['customer']
  }
]