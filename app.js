// 設定 express
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// 設定靜態檔案
app.use(express.static("public"));
//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))


// 設定路由
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
});

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//瀏覽餐廳特定頁面
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
});

//新增餐廳
app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
     .then(() => res.redirect('/'))
     .catch(error => console.log(error))
})

//編輯餐廳頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
     .then(restaurant => {
      for (let key in req.body) {
        restaurant[key] = req.body[key]
      }
      return restaurant.save()
     })
     .then(() => res.redirect(`/restaurants/${id}`))
     .catch(error => console.log(error))
})

//刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
     .then(restaurant => restaurant.remove())
     .then(() => res.redirect('/'))
     .catch(error => console.log(error))
})

//搜尋餐廳
app.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  if (!keywords) {
    return res.redirect('/')
  }

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      const restaurants = restaurantData.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(keyword) || 
        restaurant.name_en.toLowerCase().includes(keyword) ||
        restaurant.category.includes(keyword)
      })


      res.render('index', { restaurants , keywords })
     })
    .catch(error => console.log(error))

})




// 設定伺服器監聽
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`);
  });