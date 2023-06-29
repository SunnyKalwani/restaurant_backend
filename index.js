const express = require('express');
const app = express();
const config = require('./config');
const Admin = require('./models/admin'); //Import Admin
const Food = require('./models/food'); //Import Food
const Order = require('./models/order'); //import order
const Category = require('./models/categorie'); //Import Category
const Feedback = require('./models/feedback'); //Import Feedback
const Reservation = require('./models/reservation'); //Import Reservation
const Customer_comment = require('./models/customer_comment'); //Import Customer comments
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');


// Define table relationship
Food.belongsTo(Category, {
    foreignKey: "category"
});
Category.hasMany(Food, {
    foreignKey: "category"
});
Order.belongsTo(Food, {
    foreignKey: "items_ordered"
});
Food.hasMany(Order, {
    foreignKey: "items_ordered"
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to make uploads folder public/accessable on the internet
app.use(express.static('uploads'));

// Test Database connection
config.authenticate().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

// Configure Multer - Define destination of file/image uploaded
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); //define where uploads image should be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload = multer({
    storage: storage
});


// Sequence of Routes

// 1) Admin Register Route - Can register to get Admin access
// 2) Admin Login Route - Login for Admin access

// 3) Adding food items to menu - done
// 4) Getting all food items - done
// 5) getting food items including category = done
// 6) Filter by category - done
// 7) Delete item from Food table 
// 7a) Get all categories

// 8) Get all orders including Food
// 9) Create order
// 10) Edit Order data
// 11) Delete Order 

// 12) Create a new Feedback 
// 13) Get all feedback
// 14) Delete a feedback

// 15) Create a new customer comment
// 16) Get all customer comments
// 17) Delete a customer comment 

// 18) Image upload code

// 19) Create a Reservation
// 20) Get all Reservations
// 21) Delete a Reservation



//1) Register admin Route
app.post('/register', function (req, res) {
    let clearTextPassword = req.body.password;

    //Converting the cleartext password to a hash value
    bcrypt.hash(clearTextPassword, 10, function (err, passwordHash) {
        let user_data = req.body;
        user_data.password = passwordHash; //Replace clear text password with hash values

        //Create user in database
        Admin.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });
});

//2) Login Route
app.post('/login', function (req, res) {
    let emailAddress = req.body.email;
    let clearTextPassword = req.body.password;

    //Find the user using the email address
    let data = {
        where: { email: emailAddress }
    };

    Admin.findOne(data).then((result) => {
        //check if user was found in Database
        if (result) {
            //Compare clea  r text password to hash value that was stored in database
            bcrypt.compare(clearTextPassword, result.password, function (err, output) {
                if (output) {
                    res.status(200).send(result);
                } else {
                    res.status(400).send('Incorrect Password');
                }
            })
        } else {
            res.status(404).send('Admin not found');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});


//3) Adding food items to menu list
app.post('/add-food', function (req, res) {
    let food_item = req.body;
    console.log(food_item)
    Food.create(food_item).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//4) Getting all food items
app.get('/food', function (req, res) {
    Food.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 4a) getting a particular food item by ID
app.get('/food/:item_id', function (req, res) {
    let itemId = parseInt(req.params.item_id);
    Food.findByPk(itemId).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//5) Get all food data including category
app.get('/includeCategory', function (req, res) {
    let data = {
        where: {},
        include: Category
    };

    Food.findAll(data).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(results);
    });
});

//6) Filter by categories (Category-1, soups and salads)
app.get('/category1', function (req, res) {
    let data = {
        where: { category: 1 }
    }
    Food.findAll(data).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(results);
    });
});

//6) Filter by categories (Category-2, small plates)
app.get('/category2', function (req, res) {
    let data = {
        where: { category: 2 }
    }
    Food.findAll(data).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(results);
    });
});

//6) Filter by categories (Category-3, Non Alcoholic drinks)
app.get('/category3', function (req, res) {
    let data = {
        where: { category: 3 }
    }
    Food.findAll(data).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(results);
    });
});

//6) Filter by categories (Category-4, Meat and Fish)
app.get('/category4', function (req, res) {
    let data = {
        where: { category: 4 }
    }
    Food.findAll(data).then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(results);
    });
});

//7) Delete item from menu
app.delete('/foods/:food_id', function (req, res) {
    let foodId = parseInt(req.params.food_id);

    // Find the food item
    Food.findByPk(foodId).then((results) => {
        if (!results) {
            res.status(400).send("Item was not found");
        } else {
            // Delete the food item from database
            results.destroy().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 7a) Get all categories
app.get('/categories', function (req, res) {
    Category.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//8) Get all orders
app.get('/orders', function (req, res) {
    let data = {
        where: {},
        include: Food
    }
    Order.findAll(data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//9) Create order data
app.post('/order', function (req, res) {
    let order_data = req.body;
    console.log(order_data);
    //Create order in database
    Order.create(order_data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//10) Edit order data
app.put('/order/:order_id', function (req, res) {
    const orderId = parseInt(req.params.order_id);
    let order_data = req.body;

    Order.findByPk(orderId).then(function (results) {
        if (!results) {
            res.status(404).send("Order not found");
        } else {
            //Replace data
            results.customer_name = order_data.customer_name;
            results.phone_number = order_data.phone_number;
            results.address = order_data.address;
            results.items_ordered = order_data.items_ordered;
            results.order_date = order_data.order_date;

            // Save changes to database
            results.save().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 11) Delete an order
app.delete('/orders/:order_id', function (req, res) {
    let orderId = parseInt(req.params.order_id);

    // Find the order with primary key
    Order.findByPk(orderId).then((results) => {
        if (!results) {
            res.status(404).send('Order not found');
        } else {
            // Delete the order from database
            results.destroy().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.send(500).send(err);
    });
});

// 12) Create new Feedback
app.post('/feedback', function (req, res) {
    let feedback_data = req.body;
    // Create feedback
    Feedback.create(feedback_data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 13) Show all feedbacks
app.get('/feedback', function (req, res) {
    Feedback.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 14) Delete a feedback
app.delete('/feedbacks/:feedback_id', function (req, res) {
    let feedbackId = parseInt(req.params.feedback_id);

    // Find the feedback
    Feedback.findByPk(feedbackId).then((results) => {
        if (!results) {
            res.status(404).send("Feedback not found");
        } else {
            // Delete the feedback record from database
            results.destroy().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 15) Create new customer comment
app.post('/comment', function (req, res) {
    let comment_data = req.body;
    Customer_comment.create(comment_data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 16) Get all comments
app.get('/comment', function (req, res) {
    Customer_comment.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 17) Deleting comment
app.delete('/comments/:comment_id', function (req, res) {
    let commentId = parseInt(req.params.comment_id);

    // Find the comment
    Customer_comment.findByPk(commentId).then((results) => {
        if (!results) {
            res.status(404).send("Comment not found");
        } else {
            // Delete the comment record ffrom database
            results.destroy().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});


// 19) Create a Reservation
app.post('/reservation', function (req, res) {
    let reservation_data = req.body;
    Reservation.create(reservation_data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 20) Get all Reservations
app.get('/reservation', function (req, res) {
    Reservation.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// 21) Delete a Reservation
app.delete('/reservation/:reservation_id', function (req, res) {
    let reservationId = parseInt(req.params.reservation_id);
    console.log(reservationId)
    // Find the Reservation
    Reservation.findByPk(reservationId).then((results) => {
        if (!results) {
            res.status(404).send("Reservation not found");
        } else {
            // Delete the comment record ffrom database
            results.destroy().then(() => {
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Server running on Port 3000
app.listen(3000, function () {
    console.log('Capstone Project running on Port 3000...');
});