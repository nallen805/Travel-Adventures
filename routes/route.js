//Routing for Adventure Trails

//Required modules
var express=require('express');
var router=express.Router();
var dbmodule=require('../public/javascripts/dbmodule.js');		//custom module
var path=require('path');

//Home page
router.get('/', function(request,response)
{
	console.log('Request for Home page received.');
	response.render('home',{title:'Welcome'});
});

//Packages page
router.get('/packages', function(request, response)
{
	console.log('Request for Packages page received.');
	response.render('packages', {title:'Packages',message:'Package Selection'});
});

//Lush Mountain package
router.get('/packages/:lushmountain', function(request, response)
{
	var package_name=request.params.lushmountain;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});

//Rocky Mountain package
router.get('/packages/:rockymountain', function(request, response)
{
	var package_name=request.params.rockymountain;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});

//Night Vision package
router.get('/packages/:nightvision', function(request, response)
{
	var package_name=request.params.nightvision;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});

//TreeView package
router.get('/packages/:treeview', function(request, response)
{
	var package_name=request.params.treeview;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});
//Smoky Mountain package
router.get('/packages/:smokymountain', function(request, response)
{
	var package_name=request.params.smokymountain;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});
//Snowcapped package
router.get('/packages/:snowcapped', function(request, response)
{
	var package_name=request.params.smokymountain;
	book_package=package_name;
	//var package_seats_left=25;
	console.log('Request for' +book_package+ 'page received.');
	dbmodule.showPackageInfo(book_package, response);
});

//Bookings page
router.get('/booking', function(request, response)
{
	console.log('Request for bookings page received.');
	response.render('online_booking', {title: 'Online Booking', message:'Book your trip'});
});

//Saving online booking info
router.get('/save', function(request, response)
{
	console.log('Request for getting saved booking info');
	response.render('save_booking', {title: 'Online Booking'});
}).post('/save', function(request, response)
{
	console.log('Request for saved booking info page received.');
	var booking_name=request.body.booking_name;
	var booking_email=request.body.booking_email;
	var booking_date=request.body.booking_date;
	var booking_seats=request.body.booking_seats;
	var booking_package=request.body.package_option;	
	
	response.render('save_booking', {title:'Save Booking'});
	console.log(request.body);
	dbmodule.saveBookingInfo(booking_name, booking_email, booking_date, booking_seats, booking_package);
});

//Gallery page
router.get('/gallery', function(request, response)
{
	console.log('Request for gallery page received.');
	response.render('gallery', {title:'Gallery Page'});
});

//Contact Us page
router.get('/contact', function(request, response)
{
	response.render('contact', {title:'Contact Page'});
});

//Contact Success
//Get: display success message
//Post: gets user info, contact message to save to database
router.get('/contactSuccess', function(request, response)
{
	console.log('Contact success page request received.');
	response.render('contactSuccess');
}).post('/contactSuccess', function(request, response)
{
	console.log('Saving contact message request received.');
	var contact_email=request.body.contact_email;
	var contact_name=request.body.contact_name;
	var message=request.body.message;
	dbmodule.saveContactMsg(contact_name, contact_email, message, response);
});

//Display saved contact info 
router.get('/savedContact', function(request, response)
{
	console.log('Saved contact info request received.');
	dbmodule.displayContactMsgs(response);
});

//Show media page
router.get('/media', function(request, response)
{
	console.log('Request for Media page received.');
	response.render('media', {title: 'Media', message:'Look at our gallery!'});
});

//Show admin login page
router.get('/login', function(request, response)
{
	console.log('Request for Login page received.');
	response.render('login', {title:'Login Page'});
});

//Verify admin login and send admin to admin success page || go back to admin success page
router.get('/adminSuccess', function(request, response)
{
	response.render('adminSuccess', {title:'Admin Success', title:'Admin Success'});
}).post('/adminSuccess', function(request, response)
{
	console.log('Request for Admin page received.');
	var username=request.body.username;
	var password=request.body.password;
	dbmodule.authenticateUser(username,password,response);
});

//Admin can click link on success page to view bookings
router.get('/welcomeAdmin', function(request, response)
{
	console.log('Request for Show Bookings received.'); 
	dbmodule.displayBooking(response);
});


module.exports = router;