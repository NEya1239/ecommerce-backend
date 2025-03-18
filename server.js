import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debugging: Check if .env variables are loaded
if (!process.env.MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not defined. Check your .env file.");
  process.exit(1);
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Error: Email credentials are missing in .env file.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Checkout Schema
const checkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  items: [{ productId: String, quantity: Number }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Health Check API
app.get('/api/some-endpoint', (req, res) => {
  res.status(200).json({ message: "API is working properly!" });
});

// ✅ Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// ✅ Checkout API Route
app.post('/api/checkout', async (req, res) => {
  try {
    const { name, email, address, city, state, country, zip, items, totalAmount } = req.body;

    // Save order to MongoDB
    const newOrder = new Checkout({ name, email, address, city, state, country, zip, items, totalAmount });
    await newOrder.save();

    // Send Email Confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Your Purchase was Successful!',
      html: `
        <h2>Thank you for your purchase, ${name}!</h2>
        <p>Your order has been successfully placed. Here are the details:</p>
        <p><strong>Total Amount:</strong> $${totalAmount}</p>
        <p><strong>Shipping Address:</strong> ${address}, ${city}, ${state}, ${zip}</p>
        <p>We will notify you when your order is shipped.</p>
        <p>Thanks for shopping with us!</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Order placed successfully! Email sent.' });

  } catch (error) {
    console.error('❌ Checkout Error:', error);
    res.status(500).json({ message: 'Checkout failed. Try again.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
