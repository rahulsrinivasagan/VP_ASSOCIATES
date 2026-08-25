# Google Sheets Integration Setup Guide

All Contact Us and enquiry forms across the VP Associates website are automatically wired to sync submissions to **Google Sheets** via a secure server-side Next.js API route (`/api/contact`).

---

## Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet named **VP Associates Enquiries**.
2. Name the first tab/sheet: `Enquiries` (or keep the default `Sheet1`).

---

## Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace any existing code in the editor with the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    
    // Auto-create styled header row if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission Date",
        "Submission Time",
        "Page / Section",
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Subject",
        "Message",
        "Slot / Date"
      ]);
      
      // Style headers: VP Associates Orange background with bold white text
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#F5821F");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    // Append the enquiry row
    sheet.appendRow([
      data.submissionDate || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy"),
      data.submissionTime || Utilities.formatDate(new Date(), "Asia/Kolkata", "hh:mm:ss a"),
      data.sourcePage || "Website Contact Form",
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || data.phoneNumber || "",
      data.subject || "",
      data.message || "",
      data.slot ? (data.slot + (data.date ? " (" + data.date + ")" : "")) : (data.date || "")
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", status: 200 }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (💾).

---

## Step 3: Deploy as Web App
1. In the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `VP Associates Form Handler`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: allows the server-side API to send data)*
4. Click **Deploy**.
5. Grant necessary permissions when prompted by Google.
6. Copy the generated **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## Step 4: Configure Environment Variable
In your project `.env.local` (or production environment variables on Vercel/hosting):

```env
GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/YOUR_COPIED_DEPLOYMENT_URL/exec
```

---

## Security & Architecture Details
- ✅ **Zero Client-Side Exposure**: Google credentials and webhook URLs are kept entirely on the server.
- ✅ **Duplicate Prevention**: Form buttons disable during submission to prevent repeated requests.
- ✅ **Automatic Timestamping**: Submissions are stamped with both Indian Standard Time (`DD/MM/YYYY`) and `HH:MM:SS AM/PM`.
- ✅ **Multi-Form Support**: Works seamlessly across the Construction contact form, Cricket ground reservation modal, and all enquiry forms.
