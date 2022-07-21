import { AxiosInstance } from "axios";
import { LoginUserDto, RegisterUserDto } from "../common/dtos";

class AuthService {
  private readonly axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  public async register(registerUserDto: RegisterUserDto) {
    try {
      return this.axios.post("/register", registerUserDto);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  public async login(loginUserDto: LoginUserDto) {
    try {
      return this.axios.post("/login", loginUserDto);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  public async getMe() {
    try {
      return this.axios.post("users/me", {
        email: localStorage.getItem("userEmail"),
      });
    } catch (error) {
      console.log("Error ", error);
    }
  }

  public verifyEmail(token: string | undefined) {
    try {
      return this.axios.get("/users/verifyEmail/" + token);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public resendEmail(userID: string | undefined) {
    try {
      return this.axios.get("/users/resendVerification/" + userID);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public sendPasswordReset(email: string) {
    try {
      return this.axios.get("/users/sendPasswordReset/" + email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public resetPassword(token: string | undefined, password: string) {
    try {
      return this.axios.post("/users/resetPassword/" + token, { password });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default AuthService;
