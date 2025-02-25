package com.callmodalapp

import android.app.Activity
import android.graphics.PixelFormat
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView

class CallOverlayActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_call_overlay)

        // Set window properties
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                    or WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                    or WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON,
            PixelFormat.TRANSLUCENT
        )
        params.gravity = Gravity.CENTER
        window.attributes = params

        val callType = intent.getStringExtra("callType") ?: "Unknown"
        val phoneNumber = intent.getStringExtra("phoneNumber") ?: "Unknown"

        findViewById<TextView>(R.id.callTypeText).text = "$callType Call"
        findViewById<TextView>(R.id.phoneNumberText).text = phoneNumber
        findViewById<Button>(R.id.closeButton).setOnClickListener {
            finish()
        }
    }
}