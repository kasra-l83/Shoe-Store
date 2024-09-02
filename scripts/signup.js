import {signup} from "../apis/services/auth.service";
import {errorHandler} from "../libs/error-handler";
import {toast} from "../libs/toast";
import { setSessionToken } from "../libs/session-manager";
const signupForm= document.getElementById("signup-form");
signupForm.addEventListener("submit",async (event) =>{
    event.preventDefault();
    const usernameInput= event.target.children[1];
    const passwordInput= event.target.children[3];
    try {
        const response= await signup({
            username: usernameInput.value,
            password: passwordInput.value
        })
        setSessionToken(response.token);
        toast("Signed in", "success");
        setTimeout(() => {
            window.location.href = "/home";
        },2000);
    } catch (error) {
        errorHandler(error);
    }
});