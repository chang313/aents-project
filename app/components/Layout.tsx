import styles from '../styles/Home.module.css';
import { AppBar, Box, CssBaseline } from "@mui/material"
import ToolBarLayout from "./ToolBar"
import React, { useEffect } from "react"

 
export default function Layout({ children, user, setUser}) {
  useEffect(() => {
    console.log('user changed', user)
  }, [user]);

  return (
    <>
    <div className={styles.container}>
      <main className={styles.main}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <CssBaseline />
          <ToolBarLayout user={user} setUser={setUser} />
          <main>{children}</main>
        </Box>
      </main>
    </div>
      

    </>
  )
}