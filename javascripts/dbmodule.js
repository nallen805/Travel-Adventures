var mongojs = require("mongojs");
var databaseUrl = "localhost/mydb";
var db = mongojs(databaseUrl);
var test = db.collection('adminusers');
var message=null;
//db.adminusers.ensureIndex({email:1},{unique:true});

//Authenticate user
exports.authenticateUser = function(username,password,res) {
db.adminusers.find({"username":username,"password":password}, function(err, adminusers) 
{
	if( err || !adminusers) 
	{
		console.log("Not authorized user"); 
		message="Failure";
		res.render('login',{title:'Hello',message:'Not an authorized user'});
	}
    else if(adminusers.length==0) 
	{
		console.log("Not a valid user"); 
		message="failure";
		res.render('login',{title:'Hello',message:'Not an authorized user'});
	}
	else
	{
		console.log("Authorized user");
		console.log(adminusers);
		console.log("Authorized user"); 
		message="Success";
		res.render('adminSuccess',{title:'Hello',message:'Welcome '+username+'!'});
	}
    }); 
}

//Save user booking info
db.collection('booking_info');
exports.saveBookingInfo=function(booking_name, booking_email, booking_date, booking_seats, booking_package, res)
{
/* 	var datePicked = new Date(booking_date);
	var today = new Date.now();
	if(datePicked.isBefore(today))
	{
		alert('Date selected cannot be before todays date. Please select another date. '); 
	} */
	
	//else
	//{
	db.booking_info.save({"booking_name":booking_name, "booking_email":booking_email, "booking_date":booking_date, "booking_seats":booking_seats, "package":booking_package}, 
	function(err, saved)
	{
		if(err || !saved)
		{
			console.log("Booking info not saved.");
			console.log(err);
			res.render('error', {message: "Sorry, your booking information was not saved. Please try again."});
		}
		else
		{
			console.log("Booking info saved.");
			console.log(booking_package);
		}
	});
	//}

};

//Display booking information
exports.displayBooking=function(res)
{
	db.booking_info.find({}, function(err, bookingInfoDisplay)
	{
		if(err || !bookingInfoDisplay)
		{
			console.log(err);
			res.render('error', {message:"Error"});
		}
		
		else
		{	res.render('welcomeAdmin', {booking_info:bookingInfoDisplay, title:'Welcome Admin', message:'Customer Booking Details'});	}
	});
};

//Display package information
exports.showPackageInfo=function(book_package, res)
{
	db.package_info.find({"package_name":book_package}, function(err, showPackages)
	{
		if(err || !showPackages)
		{
			console.log(err);
			res.render('error', {message:"Error"});
		}
		else
		{	
			res.render('packages_'+book_package, {package_info:showPackages, title:book_package.charAt(0).toUpperCase()+book_package.substring(1), message:book_package.charAt(0).toUpperCase()+book_package.substring(1)});	
			console.log(book_package);
		}
	});
};

//Save contact messages to collection
exports.saveContactMsg=function(contact_name, contact_email, message, res)
{
	db.contact.save({"contact_name":contact_name, "contact_email":contact_email, "message":message}, function(err, contact)
	{
		if(err || !contact)
		{
			console.log(err);
			res.render('error', {message:err});
		}
		
		else
		{
			res.render('contactSuccess', {title:"Success"});
		}	
	});
};

//Display contact messages
exports.displayContactMsgs=function(res)
{
	db.contact.find({}, function(err, contactDisplay)
	{
		if(err || !contactDisplay)
		{
			console.log(err);
			res.render('error', {message:err});
		}
		else
		{
			res.render('savedContact', {contact:contactDisplay, title:'Customer Messages', message:'Customer Messages'});
		}
	});
};

