import { Avatar, Badge, Box, Chip, createTheme, Grid, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import logo from '../../assets/images/sellerbg.jpg'
import { DriveFolderUploadOutlined } from "@mui/icons-material";
// import { getSession } from "../../helpers/cookies";
import getBlogTheme from "../Landing/theme/getBlogTheme";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  // const { user } = getSession()
  const { pathname } = useLocation()
  const path = pathname.split('/')[pathname.split('/').length - 1].replace("%20", " ")
  const blogTheme = createTheme(getBlogTheme('light'));
  const navigate = useNavigate();
  const links = [
    {
      link: 'basic info',
      label: 'Basic Info'
    },
    {
      link: 'security',
      label: 'Security'
    },
  ]
                                                              // 72 + 56  / 30
  return (
    <ThemeProvider theme={blogTheme}>
      <Grid
        container
        rowGap={2}
        minHeight={'520px'}
        p={2}
      >
        <Grid
          item
          xs={12}
          md={4}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            overlap="circular"
            badgeContent={
              <DriveFolderUploadOutlined
                sx={{
                  width: 46,
                  height: 46,
                  p: 1,
                  backgroundColor: '#F1F1F1',
                  borderRadius: 5,
                  cursor: 'pointer',
                  color: '#33294E'
                }}
              />
            }
          >
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{
                width: 256,
                height: 256,
                backgroundColor: '#fff'
              }}
            />
          </Badge>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          component={Paper}
          display={'flex'}
          rowGap={1}
          flexDirection={'column'}
          p={1}
        >                               
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            sx={{
              flexWrap: 'wrap', justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              links.map((link, idx) => (
                <Chip
                  key={idx}
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`${link.link}`)}
                  size="large"
                  variant={path === link.link ? "contained" : 'outlined'}
                  color='primary'
                  label={
                    <Typography
                      fontFamily={"Raleway"}
                      fontSize={'12px'}
                      fontWeight={'bold'}
                      overflow={'auto'}
                      textOverflow={'ellipsis'}
                      color={path === link.link ? "#fff" : "#767676"}
                    >
                      {link.label}
                    </Typography>
                  } />
              ))
            }
          </Stack>
          <Box width={'100%'} borderBottom={'1px solid #BDBDBD'} />
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider >
  )
}