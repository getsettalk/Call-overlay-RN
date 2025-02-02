package com.callmodalapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.database.Cursor
import android.provider.ContactsContract
import android.telephony.TelephonyManager
import android.util.Log
import androidx.core.content.ContextCompat
import android.Manifest

class CallReceiver : BroadcastReceiver() {
    private var callStartTime: Long = 0

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == TelephonyManager.ACTION_PHONE_STATE_CHANGED) {
            val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
            val number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)

            Log.d("CallReceiver", "State: $state, Number: $number")

            when (state) {
                TelephonyManager.EXTRA_STATE_RINGING -> {

                    callStartTime = System.currentTimeMillis()

                    Log.d("CallReceiver", "Incoming Call: $number")
                    showOverlay(context, number ?: "Unknown", "Incoming")
                }
                TelephonyManager.EXTRA_STATE_OFFHOOK -> {

                    Log.d("CallReceiver", "Call Outgoing $number")
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

        val contactName = getContactName(context, number)

        val intent = Intent(context, CallOverlayActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
            putExtra("phoneNumber", number)
            putExtra("callType", type)
            putExtra("contactName", contactName)
        }
        context.startActivity(intent)
    }

    private fun getContactName(context: Context, phoneNumber: String): String {
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_CONTACTS)
            != PackageManager.PERMISSION_GRANTED) {
            Log.w("CallReceiver", "READ_CONTACTS permission not granted.")
            return "Unknown"
        }

        val uri = ContactsContract.PhoneLookup.CONTENT_FILTER_URI.buildUpon()
            .appendPath(phoneNumber)
            .build()

        val cursor: Cursor? = context.contentResolver.query(
            uri,
            arrayOf(ContactsContract.PhoneLookup.DISPLAY_NAME),
            null, null, null
        )

        return if (cursor != null && cursor.moveToFirst()) {
            val name = cursor.getString(0)
            cursor.close()
            name
        } else {
            cursor?.close()
            "Unknown"
        }
    }

}
