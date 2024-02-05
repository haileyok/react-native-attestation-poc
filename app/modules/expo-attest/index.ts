import ExpoAttestModule from './src/ExpoAttestModule';

export async function generateTokenAsync(): Promise<string> {
  return await ExpoAttestModule.generateTokenAsync();
}
