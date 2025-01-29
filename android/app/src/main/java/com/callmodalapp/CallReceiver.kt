package com.callmodalapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager

class CallReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == TelephonyManager.ACTION_PHONE_STATE_CHANGED) {
            val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
            val number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)

            when (state) {
                TelephonyManager.EXTRA_STATE_RINGING -> {
                    showOverlay(context, number ?: "Unknown", "Incoming")
                }
                TelephonyManager.EXTRA_STATE_OFFHOOK -> {
                    showOverlay(context, number ?: "Unknown", "Outgoing")
                }
            }
        }
    }

    private fun showOverlay(context: Context, number: String, type: String) {
        val intent = Intent(context, CallOverlayActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
            putExtra("phoneNumber", number)
            putExtra("callType", type)
        }
        context.startActivity(intent)
    }
}