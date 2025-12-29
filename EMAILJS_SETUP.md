# EmailJS Setup Instructions

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE - 200 emails/month)
3. Verify your email

## Step 2: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **Connect Account**
   - Login with your Gmail
   - Allow EmailJS permissions
4. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use this template content:

**Template Name:** Booking Enquiry Notification

**Subject:** New Booking Enquiry - {{customer_name}}

**Content (HTML):**
```html
<h2>New Booking Enquiry Received</h2>

<h3>Customer Information:</h3>
<p><strong>Name:</strong> {{customer_name}}</p>
<p><strong>Phone:</strong> {{customer_phone}}</p>
<p><strong>Email:</strong> {{customer_email}}</p>

<h3>Travel Details:</h3>
<p><strong>Starting Point:</strong> {{pickup_location}}</p>
<p><strong>Ending Point:</strong> {{drop_location}}</p>
<p><strong>Tour Destinations:</strong> {{tour_destinations}}</p>

<h3>Booking Information:</h3>
<p><strong>Start Date:</strong> {{start_date}}</p>
<p><strong>End Date:</strong> {{end_date}}</p>
<p><strong>Number of Passengers:</strong> {{number_of_passengers}}</p>

<h3>Additional Message:</h3>
<p>{{additional_message}}</p>

<hr>
<p><em>Received at: {{submission_time}}</em></p>
```

**To Email:** Your admin email (e.g., `info@svtravels.com`)

4. Click **Save**
5. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General** (or API Keys)
2. Note down your **Public Key** (e.g., `AbC123DeFgHiJkLmN`)

## Step 5: Update .env File

Open `frontend/.env` and add your credentials:

```env
REACT_APP_EMAILJS_PUBLIC_KEY=AbC123DeFgHiJkLmN
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
```

## Step 6: Restart Frontend

```bash
cd frontend
npm start
```

## Testing

1. Go to booking page
2. Fill out the form
3. Submit enquiry
4. Check:
   - ✅ Email received in admin inbox
   - ✅ WhatsApp opened with pre-filled message
   - ✅ Enquiry saved in database

## Free Tier Limits

- **200 emails/month** - FREE forever
- No credit card required
- No phone verification needed

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify template variables match exactly
- Check EmailJS dashboard for error logs

**WhatsApp not opening?**
- Check browser popup blocker
- Verify WhatsApp number in settings

---

**Total Setup Time:** 5-10 minutes
**Cost:** FREE (forever)
