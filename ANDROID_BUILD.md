# Android build (React Native 0.84)

## Current status

On **React Native 0.84**, the Android build can fail due to compatibility between:

- **New Architecture** (default in 0.82+)
- **react-native-screens** and **react-native-gesture-handler**, which rely on codegen output that is not fully aligned with 0.84 in the published npm packages.

You may see:

- Codegen: `ENOENT` for `src/specs` or `src/fabric`
- Kotlin: `Unresolved reference` (e.g. `Screen`, `FabricViewStateManager`, `NativeRNGestureHandlerModuleSpec`)
- Or: `Type argument is not within its bounds` for ViewManager delegates

## What’s in this repo

- **postinstall**  
  `scripts/postinstall.js` creates missing codegen dirs and `patch-package` applies the codegen patch so missing paths don’t crash the build.

- **Codegen patch**  
  `patches/@react-native+codegen+0.84.1.patch` makes codegen skip non‑existent paths instead of throwing.

These help with the “missing directory” and “no such file” codegen errors, but **do not** fix New Arch / codegen vs library mismatches (unresolved references or type errors).

## Recommended: build on React Native 0.76

For a **reliable Android build** with the current navigation stack (React Navigation 7, react-native-screens 4.x, react-native-gesture-handler 2.20+), use **React Native 0.76** where:

- You can set `newArchEnabled=false` in `android/gradle.properties` if needed.
- The ecosystem (screens, gesture-handler, codegen) is known to work together.

Steps:

1. Create a new app with RN 0.76 and copy over `src`, `App.js`, and config (e.g. `babel.config.js`, `metro.config.js`, `react-native.config.js`) from this project.
2. In the new project, run `npm install` and then `npm run android`.

## If you stay on React Native 0.84

- Keep `npm run android` and the postinstall/codegen patch as above.
- If you still get Kotlin/codegen errors, try:
  - Using the **latest** react-native-screens and react-native-gesture-handler (and React Navigation 7) and ensuring `newArchEnabled=true` and a clean build (`cd android && ./gradlew clean && cd ..`), or
  - Temporarily downgrading to **react-native-screens@3.x** and **react-native-gesture-handler@2.13** with **React Navigation 6** and `newArchEnabled=false`, accepting possible peer/API mismatches.

For a stable Android build without chasing compatibility issues, **using React Native 0.76** is the recommended path.
