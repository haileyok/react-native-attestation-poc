# iOS

On iOS we have a few options. Here, we will simply validate that the device is
valid. This is probably enough for our use case, but we can do more if we want.

There are two bits (booleans) that we can update. They are device specific and
tied to the Apple Developer Team ID, not the app itself. However for our purposes
this is fine. We can flip the value back and forth, and we can receive the last
modified time from Apple. I.e.:

- User attempts to register, so we use the device token to query the current
two bits status.
- The last modified time is not set (or past some threshold of time), so we
allow a registration.
- We flip the bit, so that the last modified time changes.
- User attempts to register again (say after five minutes). We use the device
token to query the two bits data, and see that the last updated timestamp is
too recent, so we deny the registration.

Example: https://streamable.com/dtd9gp
