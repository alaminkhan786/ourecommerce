const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Connection with improved error handling
mongoose.connect('mongodb://localhost:27017/ecommerce_admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Admin User Model
const AdminUser = mongoose.model('AdminUser', {
  username: { type: String, unique: true },
  password: String
});

// Create initial admin user if not exists
const createInitialAdminUser = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('AudioAdmin2024!', 10);
      
      const adminUser = new AdminUser({
        username: 'admin',
        password: hashedPassword
      });
      
      await adminUser.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
};

// Call the function to create initial admin user
createInitialAdminUser();

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Detailed Login Route with Enhanced Logging
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username }); // Log login attempts
  
  try {
    const admin = await AdminUser.findOne({ username });
    
    if (!admin) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    
    console.log('Successful login for user:', username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Dashboard Data Route
app.get('/api/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Fetch dashboard metrics from database
    const dashboardData = {
      dailyActiveUsers: 250,
      monthlyActiveUsers: 5000,
      totalRevenue: 75000.50,
      trendingProducts: [
        { id: 1, name: 'Wireless Earbuds', salesCount: 150 },
        { id: 2, name: 'Smart Watch', salesCount: 100 }
      ],
      salesData: [
        { date: 'Jan 1', sales: 4000 },
        { date: 'Jan 2', sales: 3000 },
        { date: 'Jan 3', sales: 5000 }
      ]
    };
    
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// Debugging Route to Check Admin Users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await AdminUser.find({}, { username: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});
