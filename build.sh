#!/bin/zsh

export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="/Users/itsjatinnagar/Library/Android/sdk"

if [[ "$1" == "release" ]]; then
    cd android && ./gradlew app:assembleRelease
else
    npx expo run:android
fi
