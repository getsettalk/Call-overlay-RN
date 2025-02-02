package com.callmodalapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import android.util.Log

class CallReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == TelephonyManager.ACTION_PHONE_STATE_CHANGED) {
            val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
            val number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)

            Log.d("CallReceiver", "State: $state, Number: $number")

            when (state) {
                TelephonyManager.EXTRA_STATE_RINGING -> {
                    Log.d("CallReceiver", "Incoming Call: $number")
                    showOverlay(context, number ?: "Unknown", "Incoming")
                }
                TelephonyManager.EXTRA_STATE_OFFHOOK -> {
                    Log.d("CallReceiver", "Outgoing Call: $number")
                    showOverlay(context, number ?: "Unknown", "Outgoing")
                }
            }
        }
    }

    private fun showOverlay(context: Context, number: String?, type: String) {
        if (number == null || number == "Unknown") {
            Log.d("CallReceiver", "Skipping overlay: Phone number is null or unknown.")
            return
        }

        val intent = Intent(context, CallOverlayActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
            putExtra("phoneNumber", number)
            putExtra("callType", type)
        }
        context.startActivity(intent)
    }

}