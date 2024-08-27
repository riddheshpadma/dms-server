const express = require('express');
const connectDB = require('./dbConnection');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Router Import
const adminUserRoutes = require('./routes/user.Route')
const adminRoutes = require('./routes/admin.Routes')
const authRouter = require('./routes/auth.Route')
const eventRouter = require('./routes/events.Route')
const gatePassRouter = require('./routes/gatePassRequests.Route');
const resourceRouter = require('./routes/resources.Route')
const leaveRequestsRouter = require('./routes/leaveRequests.Route')
const alumniRouter = require('./routes/alumni.Route')
const announcementRouter = require('./routes/announcements.Route')
const assignmentRouter = require('./routes/assignments.Route')
const submissionRouter = require('./routes/submissions.Route')
const feedbackRouter = require('./routes/feedback.Route')

const User = require('./models/Users.Model')
const app = express();

const PORT = process.env.PORT || 5001;
const DBConnectionURI = process.env.DBConnectionURI || "mongodb://127.0.0.1:27017/college";

connectDB(DBConnectionURI);

// Set security-related HTTP headers
app.use(helmet());

// Rate Limiting: Allow 100 requests per 15 minutes from a single IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json());

// Data Sanitization against XSS attacks
app.use(xss());

// Data Sanitization against NoSQL Injection attacks
app.use(mongoSanitize());


// Call the function once on server start
// createAdminUser();

//Use Routers
app.use('/admin', adminRoutes)
app.use('/admin/users', adminUserRoutes);
app.use(authRouter)
app.use(eventRouter)
app.use(gatePassRouter);
app.use(resourceRouter);
app.use(leaveRequestsRouter)
app.use(alumniRouter)
app.use(announcementRouter)
app.use(assignmentRouter)
app.use(submissionRouter)
app.use(feedbackRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });