const Admin = require('../models/Admin');

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@nysha.ae';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Secret123!';
        
        // Check if any admin exists
        const adminExists = await Admin.findOne({ email: adminEmail });
        
        if (!adminExists) {
            console.log('No admin user found. Creating a default admin profile...');
            await Admin.create({
                firstName: 'Super',
                lastName: 'Admin',
                email: adminEmail,
                password: adminPassword
            });
            console.log(`Default Admin created -> Email: ${adminEmail}`);
        }
    } catch (error) {
        console.error('Error seeding admin user:', error.message);
    }
};

module.exports = seedAdmin;
