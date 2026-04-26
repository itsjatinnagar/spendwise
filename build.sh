#!/bin/zsh

export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="/Users/itsjatinnagar/Library/Android/sdk"

cd android
./gradlew app:assembleRelease