export enum AUTH_ROUTES {
  REGISTER = "/register",
  LOGIN = "/login",
  REFRESH_TOKEN = "/refresh-token",
  LOGOUT = "/logout",
  FORGOT_PASSWORD = "/forgot-password/=token",
  CHANGE_PASSWORD = "/change-password",
  ACTIVE_SESSIONS = "/sessions",
}

export enum VERIFICATION_TOKEN_ROUTES {
  EMAIL_VERIFY = "/verify-email",
  RESEND_VERIFY_MAIL = "/verify-email/resend",
  FORGOT_PASSWORD_VERIFICATION = "/forgot-password",
  VERIFY_OTP = "/verify-otp",
  RESEND_VERIFY_OTP = "/verify-otp/resend",
}
