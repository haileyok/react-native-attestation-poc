import ExpoModulesCore
import DeviceCheck
import CryptoKit

public class ExpoAttestModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoAttest")

    AsyncFunction("generateTokenAsync") { (promise: Promise) in
      // Make sure that DeviceCheck is supported, error if not
      guard DCDevice.current.isSupported else {
        promise.reject("NOT_SUPPORTED", "Attestation not supported on this device.")
        return
      }

      DCDevice.current.generateToken { token, error in
        // Error if the token couldn't be geenerated
        guard error == nil else {
          promise.reject("TOKEN_ERROR", "Error generating token.")
          return
        }

        // Return the generated token
        promise.resolve(token!)
      }
    }
  }
}
