import express from 'express'

const port = 3000

const app = express()
app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
    res.send('Auth test')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
