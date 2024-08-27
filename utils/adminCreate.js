const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'Admin' });
        
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        const adminUser = new User({
            email: 'admin@gmail.com', 
            name: 'riddhesh',
            phoneNo: '9226406267',
            password: 'admin123',
            role: 'Admin',
            gender: 'Male',
            departmentId: 'null'
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};