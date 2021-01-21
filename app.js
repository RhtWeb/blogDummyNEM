// console.log("Hello terminal");

const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routers/blogRouters");

const app = express();

const URLdb = "mongodb+srv://nodeblogrht:nodeblogdb@nodeblog.dsluo.mongodb.net/node-blogs?retryWrites=true&w=majority";

mongoose.connect(URLdb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))


app.set("view engine", "ejs");
// app.set("views", "myviews");



app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New blog 2",
//     snippet: "cool snippet 2",
//     body: "body of the blog"
//   });

//   blog.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err))
// })

app.get("/", (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => res.render("blog/index", { title: "Home", blogs : result }))
    .catch((err) => console.log(err))
});

app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});



app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});
