# SV Travels - Admin Features Overview

## Login Credentials
- **Email**: admin@svtravels.com
- **Password**: admin123

## Admin Pages & Features

### 1. Admin Dashboard (`/admin/dashboard`)
✅ **Working Features:**
- View total vehicles count
- View available vehicles count
- View total enquiries count
- View enquiries by status (New, Contacted, Confirmed)
- Display recent 5 enquiries
- Real-time statistics
- Navigate to other admin sections

**API Endpoints Used:**
- `GET /api/vehicles` - Fetch all vehicles
- `GET /api/enquiries` - Fetch all enquiries
- `GET /api/enquiries/stats/dashboard` - Fetch statistics

---

### 2. Vehicle Management (`/admin/vehicles`)
✅ **Working Features:**
- **View All Vehicles**: Display all buses and tempo travellers
- **Add New Vehicle**: 
  - Vehicle name
  - Vehicle type (Bus/Tempo Traveller)
  - Seating capacity
  - AC type (AC/Non-AC)
  - Description
  - Features (comma-separated)
  - Ideal for (comma-separated)
  - Price per km
  - Availability toggle
  - Upload up to 5 images
- **Edit Vehicle**: Update vehicle details and add more images
- **Delete Vehicle**: Remove vehicles from database
- **Delete Individual Images**: Remove specific images from a vehicle
- **Toggle Availability**: Mark vehicles as available/unavailable
- **Search & Filter**: Filter by vehicle type, AC type, availability

**API Endpoints Used:**
- `GET /api/vehicles` - Fetch all vehicles
- `POST /api/vehicles` - Create new vehicle (with image upload)
- `PUT /api/vehicles/:id` - Update vehicle (with image upload)
- `DELETE /api/vehicles/:id` - Delete vehicle
- `DELETE /api/vehicles/:id/images` - Delete specific image

---

### 3. Enquiry Management (`/admin/enquiries`)
✅ **Working Features:**
- **View All Enquiries**: Display all customer enquiries
- **Filter by Status**: Filter enquiries (All, New, Contacted, Confirmed, Cancelled)
- **View Enquiry Details**: See full enquiry information
  - Customer name, phone, email
  - Pickup and drop locations
  - Travel date
  - Number of passengers
  - Vehicle preference
  - Message/requirements
  - Enquiry date
- **Update Status**: Change enquiry status
  - New → Contacted
  - Contacted → Confirmed
  - Any status → Cancelled
- **Delete Enquiry**: Remove enquiries from database
- **Status Color Coding**:
  - New: Blue badge
  - Contacted: Yellow badge
  - Confirmed: Green badge
  - Cancelled: Red badge

**API Endpoints Used:**
- `GET /api/enquiries` - Fetch all enquiries
- `GET /api/enquiries/:id` - Fetch single enquiry
- `PUT /api/enquiries/:id` - Update enquiry status
- `DELETE /api/enquiries/:id` - Delete enquiry

---

### 4. Settings (`/admin/settings`)
✅ **Working Features:**

#### Contact Information Settings:
- **Contact Phone Number**: Update display phone number
- **WhatsApp Number**: Update WhatsApp business number
- **Email Address**: Update contact email
- **Office Address**: Update office/headquarters address

#### Account Security:
- **Change Password**:
  - Enter current password
  - Enter new password (min 6 characters)
  - Confirm new password
  - Validation and error handling

**API Endpoints Used:**
- `GET /api/settings` - Fetch current settings
- `PUT /api/settings` - Update contact settings
- `PUT /api/admin/change-password` - Change admin password

---

## Technical Implementation

### Backend (Node.js + Express)
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ORM
- **File Upload**: Multer middleware for vehicle images
- **Security**: Bcrypt for password hashing
- **Validation**: Express-validator for input validation

### Frontend (React)
- **Routing**: React Router v6 with protected routes
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Axios with interceptors for token management
- **UI Framework**: Tailwind CSS with custom design system
- **Notifications**: React-toastify for user feedback
- **Icons**: React Icons (Font Awesome)

### Design System
- **Primary Color**: Teal (#14b8a6, #0d9488, #0f766e)
- **Secondary Color**: Amber (#f59e0b, #d97706)
- **Typography**: Inter font family
- **Effects**: Glassmorphism, backdrop blur, custom animations
- **Responsive**: Mobile-first responsive design

---

## API Routes Summary

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login (email + password)
- `POST /register` - Register new admin (restricted)
- `GET /me` - Get current admin details
- `PUT /change-password` - Change admin password

### Vehicle Routes (`/api/vehicles`)
- `GET /` - Get all vehicles (public)
- `GET /:id` - Get single vehicle (public)
- `POST /` - Create vehicle (protected)
- `PUT /:id` - Update vehicle (protected)
- `DELETE /:id` - Delete vehicle (protected)
- `DELETE /:id/images` - Delete vehicle image (protected)

### Enquiry Routes (`/api/enquiries`)
- `POST /` - Create enquiry (public)
- `GET /` - Get all enquiries (protected)
- `GET /stats/dashboard` - Get statistics (protected)
- `GET /:id` - Get single enquiry (protected)
- `PUT /:id` - Update enquiry (protected)
- `DELETE /:id` - Delete enquiry (protected)

### Settings Routes (`/api/settings`)
- `GET /` - Get settings (public)
- `PUT /` - Update settings (protected)

---

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sv-travels

# Authentication
JWT_SECRET=sv_travels_super_secret_key_2024_production_environment
JWT_EXPIRE=30d
```

---

## File Upload Configuration

### Multer Settings:
- **Storage**: Disk storage in `/uploads/vehicles/`
- **File Size Limit**: 5MB per image
- **Allowed Types**: JPEG, JPG, PNG, GIF
- **Max Files**: 5 images per vehicle
- **Filename Format**: `vehicle-{timestamp}-{random}.{extension}`

---

## Testing Checklist

### ✅ Admin Dashboard
- [x] Login with admin@svtravels.com / admin123
- [x] View statistics cards
- [x] View recent enquiries
- [x] Navigate to management pages

### ✅ Vehicle Management
- [x] Add new vehicle with images
- [x] Edit existing vehicle
- [x] Update vehicle images
- [x] Delete vehicle images
- [x] Toggle vehicle availability
- [x] Delete vehicle
- [x] Filter and search vehicles

### ✅ Enquiry Management
- [x] View all enquiries
- [x] Filter by status
- [x] View enquiry details
- [x] Update enquiry status
- [x] Delete enquiry

### ✅ Settings
- [x] Update contact information
- [x] Change admin password
- [x] Form validation
- [x] Success/error notifications

---

## Known Issues & Solutions

### Issue 1: Route Order (FIXED)
**Problem**: `/api/enquiries/stats/dashboard` was returning 404
**Cause**: Specific routes must be defined before parameterized routes (`:id`)
**Solution**: Moved stats route before `:id` route in enquiryRoutes.js

### Issue 2: JWT Secret (FIXED)
**Problem**: "secretOrPrivateKey must have a value" error
**Cause**: Missing .env file
**Solution**: Created .env with JWT_SECRET and fallback values in code

### Issue 3: Admin Login Format (FIXED)
**Problem**: Users expected email-based login
**Cause**: System used username field
**Solution**: Updated login to accept email or username, changed default to use email

---

## How to Use

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   Server runs on: http://localhost:5000

2. **Start Frontend Development Server**:
   ```bash
   cd frontend
   npm start
   ```
   App runs on: http://localhost:3000

3. **Access Admin Panel**:
   - Navigate to: http://localhost:3000/admin/login
   - Login with: admin@svtravels.com / admin123

4. **Manage Content**:
   - Add vehicles with images
   - Process customer enquiries
   - Update contact settings
   - Monitor dashboard statistics

---

## Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ Token expiration (30 days)
- ✅ Input validation on all forms
- ✅ SQL injection protection (MongoDB)
- ✅ File upload validation
- ✅ CORS enabled
- ✅ Error handling middleware

---

## Success! All Admin Features Are Working! 🎉
