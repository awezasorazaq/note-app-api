const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4001;

const userRouter = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cookieParser('123321132Aa'))
app.use(cors(corsOptions));
app.use(express.json())



app.use('/user', userRouter);

app.use('/notes', notesRoutes);

app.use('/', (req, res) => {
    res.send('hello from thee other side');
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


