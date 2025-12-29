# SV Travels - Bus & Tempo Traveller Services

A complete, production-ready full-stack web application for **SV Travels (Sri Venkateshwara Travels)**, offering bus and tempo traveller rental services for group travel, events, and tours across India.

## 🚀 Features

### Public Website (Customer Side)
- **Home Page**: Hero section with business overview and CTAs
- **About Us**: Company information, vision, mission, and values
- **Services**: Detailed service descriptions for bus & tempo traveller rentals
- **Fleet**: Display of all available vehicles with specifications
- **Booking/Enquiry**: Customer enquiry form with validation
- **Contact**: Contact information with Google Maps integration
- **WhatsApp Integration**: Floating WhatsApp button on all pages

### Admin Dashboard
- **Authentication**: Secure JWT-based admin login
- **Dashboard Overview**: Statistics and recent enquiries
- **Vehicle Management**: 
  - Add/Edit/Delete vehicles
  - Upload multiple images
  - Manage availability and specifications
- **Enquiry Management**:
  - View all customer enquiries
  - Update enquiry status (New/Contacted/Confirmed/Cancelled)
  - Filter by status
  - Direct WhatsApp integration
- **Settings**:
  - Update contact information
  - Change admin password

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js
- Multer (File uploads)
- Express Validator

## 📁 Project Structure

```
SV/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Vehicle.js
│   │   ├── Enquiry.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── vehicleRoutes.js
│   │   ├── enquiryRoutes.js
│   │   └── settingsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── WhatsAppButton.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── Loader.js
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── Home.js
│   │   │   │   ├── About.js
│   │   │   │   ├── Services.js
│   │   │   │   ├── Fleet.js
│   │   │   │   ├── Booking.js
│   │   │   │   └── Contact.js
│   │   │   └── admin/
│   │   │       ├── AdminLogin.js
│   │   │       ├── AdminDashboard.js
│   │   │       ├── VehicleManagement.js
│   │   │       ├── EnquiryManagement.js
│   │   │       └── AdminSettings.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
cd SV
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sv-travels
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=30d

# Contact Details (Optional - can be updated from admin panel)
CONTACT_PHONE=+91-7780720178
WHATSAPP_NUMBER=917780720178
CONTACT_EMAIL=info@svtravels.com
OFFICE_ADDRESS=Bangalore, Karnataka, India
```

### Step 4: Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 5: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# Or use MongoDB Compass / Atlas
```

### Step 6: Create Admin Account
First, start the backend server:
```bash
cd backend
node server.js
```

Then, register an admin account using an API tool like Postman or curl:
```bash
# POST request to http://localhost:5000/api/admin/register
# Body (JSON):
{
  "username": "admin",
  "email": "admin@svtravels.com",
  "password": "admin123"
}
```

## 🚀 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Run Concurrently (from root directory)
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔐 Admin Access

1. Navigate to: http://localhost:3000/admin/login
2. Login with credentials:
   - Username: `admin` (or the one you created)
   - Password: `admin123` (or the one you created)

## 📝 Usage Guide

### For Administrators

#### Adding Vehicles
1. Login to admin panel
2. Go to "Vehicle Management"
3. Click "Add Vehicle"
4. Fill in vehicle details:
   - Vehicle Name
   - Type (Bus/Tempo Traveller)
   - Seating Capacity
   - AC Type
   - Features (comma-separated)
   - Ideal For (comma-separated)
   - Upload images
5. Click "Add Vehicle"

#### Managing Enquiries
1. Go to "Enquiry Management"
2. View all customer enquiries
3. Update status using dropdown:
   - New → Contacted → Confirmed
4. Click "View" to see full details
5. Use WhatsApp button to contact customer

#### Updating Settings
1. Go to "Settings"
2. Update contact information
3. Change admin password if needed
4. Click "Save"

### For Customers

#### Making a Booking
1. Visit the website
2. Browse the fleet of vehicles
3. Click "Book Now" or "Enquire Now"
4. Fill in the booking form:
   - Personal details
   - Pickup/Drop locations
   - Travel date
   - Number of passengers
   - Vehicle preference (optional)
5. Submit the form
6. Admin will contact you within 24 hours

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment:**
   - Ensure all environment variables are set
   - Update CORS settings if needed

2. **Deploy to Render:**
   - Create new Web Service
   - Connect your repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && node server.js`
   - Add environment variables
   - Deploy

### Frontend Deployment (Vercel/Netlify)

1. **Prepare for deployment:**
   - Update API URL in `.env`:
     ```env
     REACT_APP_API_URL=https://your-backend-url.com
     ```

2. **Deploy to Vercel:**
   ```bash
   cd frontend
   npm run build
   # Deploy the 'build' folder to Vercel
   ```

3. **Or use Vercel CLI:**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🔧 Configuration

### Customization

#### Update Business Information
Edit in `backend/.env` or through Admin Settings panel:
- Contact phone number
- WhatsApp number
- Email address
- Office address

#### Update Branding
- Logo: Replace in `frontend/src/components/Navbar.js`
- Colors: Modify in `frontend/tailwind.config.js`
- Content: Update text in respective page components

## 📱 Features in Detail

### WhatsApp Integration
- Floating WhatsApp button on all public pages
- Direct customer contact from admin panel
- Pre-filled message templates

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### SEO Friendly
- Semantic HTML
- Meta tags configured
- Fast loading times

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation
- XSS protection

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` configuration
- Check port 5000 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS settings
- Verify API URL in frontend

### Images not uploading
- Check `uploads` folder permissions
- Verify multer configuration
- Check file size limits (5MB)

## 📄 API Documentation

### Public APIs
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/enquiries` - Submit enquiry
- `GET /api/settings` - Get contact settings

### Admin APIs (Require Authentication)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register admin
- `GET /api/admin/me` - Get current admin
- `PUT /api/admin/change-password` - Change password
- `POST /api/vehicles` - Add vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/enquiries` - Get all enquiries
- `PUT /api/enquiries/:id` - Update enquiry status
- `DELETE /api/enquiries/:id` - Delete enquiry
- `PUT /api/settings` - Update settings

## 🤝 Support

For issues or questions:
- Email: admin@svtravels.com
- Phone: +91-7780720178

## 📜 License

This project is created for SV Travels (Sri Venkateshwara Travels).

## 🙏 Acknowledgments

- Built with React.js and Node.js
- Styled with Tailwind CSS
- Icons from React Icons
- Images from Unsplash

---

**SV Travels** - Your Trusted Partner for Group Transportation
*Spacious • Comfortable • Reliable*
