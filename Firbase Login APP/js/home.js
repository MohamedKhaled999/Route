

import {
 signOut
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  
  import { getMyAuth } from "./index.js";


const logoutBtn= document.getElementById('btnLogOut')


const handleLogout=()=>{
if(logoutBtn){
    logoutBtn.addEventListener('click',async()=>{
        console.log("logout")
        try {
            signOut(getMyAuth())
            console.log("user logout ")


        } catch (error) {
            console.log(error.message)
        }
    })
}
}

handleLogout()