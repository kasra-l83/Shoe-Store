import {login} from "../apis/services/auth.service";
import {errorHandler} from "../libs/error-handler";
import {toast} from "../libs/toast";
import { setSessionToken } from "../libs/session-manager";
const loginForm= document.getElementById("login-form");
loginForm.addEventListener("submit",async (event) =>{
    event.preventDefault();
    const usernameInput= event.target.children[1];
    const passwordInput= event.target.children[3];
    try{
        const response= await login({
            username: usernameInput.value,
            password: passwordInput.value
        })
        setSessionToken(response.token);
        toast("Logged in", "success");
        setTimeout(() =>{
            window.location.href= "/home";
        }, 2000)
    }catch (error){
        errorHandler(error);
    }
});