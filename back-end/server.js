const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()



const app = express()


//MIDDLEWARE
app.use(express.json({extended:false}));
// app.use(cors())
app.use('/uploads',express.static('uploads'))



// ROUTERS
app.use('/api/user',require('./routers/api/users.js'))
app.use('/api/auth',require('./routers/api/auth.js'))
app.use('/api/profile',require('./routers/api/profile.js'))
app.use('/api/status',require('./routers/api/status.js'))



//DB CONNECTION
mongoose.connect(process.env.MONGODB_URI,
	{useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },
	() => {
		console.log('Database connected successfully')
	}
)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../front-end/build'))
}


app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});