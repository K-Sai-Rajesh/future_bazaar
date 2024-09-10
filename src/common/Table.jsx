import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, Typography } from "@mui/material";
import {
  ApprovalOutlined,
  BlockOutlined,
  ClassOutlined,
  CloseOutlined,
  DeleteForeverOutlined,
  EditNoteOutlined,
  SchoolOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { CookiesNames, getCookieItem } from "../helpers/cookies";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function EnhancedTable({
  status,
  rows,
  headCells,
  // setEdit,
  icon,
  actions,
  rejectSeller,
  acceptSeller,
  DeleteProduct
}) {
  const { role } = JSON.parse(
    decodeURIComponent(getCookieItem(CookiesNames.USER))
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate()
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={12}>
        <TableContainer sx={{ minHeight: "350px", maxHeight: '400px' }}>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {icon && (
                  <TableCell align={"left"}>
                    {/* <TableSortLabel>Avatar</TableSortLabel> */}
                  </TableCell>
                )}
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align={"left"}>
                    <TableSortLabel>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          color: "#00398D",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {headCell.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align={"center"}>
                    <TableSortLabel>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          color: "#00398D",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          visibility: `${role === "Student" ? "hidden" : "visible"
                            }`,
                        }}
                      >
                        Action
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    colSpan={headCells?.length + 1}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        color: "#3F3D56",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      No Data !
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >
                        {icon && (
                          <TableCell key={index} align={"left"}>
                            {row?.role === "Student" ? (
                              <SchoolOutlined
                                sx={{
                                  color: "#00398D",
                                }}
                              />
                            ) : (
                              <ClassOutlined
                                sx={{
                                  color: "#00398D",
                                }}
                              />
                            )}
                          </TableCell>
                        )}
                        {headCells?.map((item, idx) => {
                          const value = item?.label?.includes("Date")
                            ? row[item?.id] === null ? "Please Approve !" : format(
                              new Date(row[item?.id]),
                              "eeee, dd LLLL yyyy"
                            )
                            : row[item?.id];

                          return (
                            <TableCell
                              key={idx}
                              component="th"
                              id={labelId}
                              scope="row"
                              align="left"
                            >
                              {
                                item?.id === "path" ?
                                  <>
                                    <Avatar
                                      alt={row[item?.id]}
                                      src={`http://localhost:8080/${row[item?.id]}`}
                                      sx={{ width: 46, height: 46 }}
                                    />
                                  </>
                                  :
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontFamily: "Raleway",
                                      fontWeight: "bold",
                                      textTransform: item?.id === "email" ? "" : "capitalize",
                                      color: row[item?.id] === "Approved"
                                        ? "#00398D"
                                        : row[item?.id] === "Rejected" ?
                                          "#D32F2F"
                                          : row[item?.id] === "Pending" ?
                                            "#8921C7"
                                            : "",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {value}
                                  </Typography>
                              }
                            </TableCell>
                          );
                        })}
                        {actions && (
                          <TableCell
                            align={"center"}
                          >
                            {
                              status === "Approved" ?
                                <>
                                  <IconButton onClick={() => rejectSeller(row)}>
                                    <BlockOutlined color="error" />
                                  </IconButton>
                                </>
                                :
                                status === "Pending" ?
                                  <>
                                    <IconButton onClick={() => acceptSeller(row)}>
                                      <ApprovalOutlined color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => rejectSeller(row)}>
                                      <CloseOutlined color="error" />
                                    </IconButton>
                                  </>
                                  :
                                  status === "Product" ?
                                    <>
                                      <IconButton onClick={() => navigate(`/product/${row?.productId}`)}>
                                        <VisibilityOutlined color="info" />
                                      </IconButton>
                                      <IconButton onClick={() => navigate('/auth/edit product', { state: row?.productId })}>
                                        <EditNoteOutlined color="primary" />
                                      </IconButton>
                                      <IconButton onClick={() => DeleteProduct(row?.productId)}>
                                        <DeleteForeverOutlined color="error" />
                                      </IconButton>
                                    </>
                                    :
                                    status === "Rejected" ?
                                      <>
                                        <IconButton onClick={() => acceptSeller(row)}>
                                          <ApprovalOutlined color="info" />
                                        </IconButton>
                                      </>
                                      :
                                      <>
                                        <IconButton onClick={() => acceptSeller(row)}>
                                          <ApprovalOutlined color="info" />
                                        </IconButton>
                                      </>
                            }
                          </TableCell>
                        )
                        }
                      </TableRow>
                    );
                  })
              )}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box >
  );
}
