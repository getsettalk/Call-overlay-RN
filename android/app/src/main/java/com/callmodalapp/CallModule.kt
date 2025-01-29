package com.callmodalapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CallModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CallModule"

    @ReactMethod
    fun requestPermissions(promise: Promise) {
        // Handle permissions request here if needed
        promise.resolve(true)
    }
}