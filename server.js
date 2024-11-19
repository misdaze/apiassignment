import express, { urlencoded } from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
let curDate = Date.now()
function unique(){
    let uniqueIdent = (curDate*(Math.random() *100)/(curDate+(Math.random()*10)))
    return Math.floor(uniqueIdent*(Math.random()*10000000))
}

let library = [
    {id: unique(), title: "Book", author: "Me", year: 1000, isAvailable: true},
    {id: unique(), title: "Book2", author: "You", year: 1800, isAvailable: true},
    {id: unique(), title: "Book3", author: "Us", year: 52, isAvailable: true}
]
let lib = library

app.get('/books/available', (req,res) => {
    let newLib = library.filter(b => b.isAvailable === true)
    res.send(newLib)
})

app.post('/books', (req,res)=>{
    const book = {
        id: unique(),
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        isAvailable: true
    }
    lib.push(book)
    res.send(book)
})

app.post('/books/borrow', (req,res)=>{
    console.log(lib)
    const book = lib.find(b => b.title == req.body.title)
    if (!book || book.isAvailable == false) return res.status(404).send('Book is not available or already borrowed. ')
    book.isAvailable = false
    res.send(book)
})

app.post('/books/return', (req,res)=>{
    const book = lib.find(b => b.title === req.body.title)
    if (!book || book.isAvailable == true) return res.status(404).send('Book not found or borrowed')
    book.isAvailable = true
    res.send(book)
})

app.listen(PORT, ()=>console.log(`Server Started on ${PORT}`))