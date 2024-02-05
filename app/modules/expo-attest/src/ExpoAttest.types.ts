enum ExpoAttestErrorType {
  NOT_SUPPORTED = "NOT_SUPPORTED",
  TOKEN_ERROR = "TOKEN_ERROR",
}

export interface ExpoAttestError extends Error {
  code: ExpoAttestErrorType
}
