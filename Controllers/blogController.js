const Blog = require("../models/blog");

const blog_create_get = (req, res) => {
  res.render("blog/create", { title: "Create Blog"});
};

const blog_post = (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err))
};

const blog_single_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => res.render("blog/details", { title: "Blog Details", blog: result }))
    .catch((err) => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    })
};

const blog_single_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect : '/' })
    })
    .catch((err) => console.log(err))
};

module.exports = {
  blog_create_get,
  blog_post,
  blog_single_get,
  blog_single_delete
}