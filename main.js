
var SpacebookApp = function () {
  var posts = [
  ];

  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      var commentsContainer = '<div class="comments-container" data-id="' + post.id + '">' +
                              '<input type="text" class="comment-name">' +
                              ' <button class="btn btn-primary add-comment">Post Comment</button><div class="commentList" data-id="' + post.id + '">Comments here!<ul class="list">' + renderComments(post) + '</ul></div></div>';
      
                              $posts.append('<div class="post" data-id="' + post.id + '">'
                              + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text + commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (currentPost, text) {
    var comment = {
      text: text
    }
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    post.comments.push(comment);
  }

  var renderComments = function (post) {
    var list = '';
    for (var i = 0; i < post.comments.length; i++) {
    list += '<li data-id=' + i + '>' + post.comments[i].text + '</li>';
    };
    return list;
  }


  var removeComment = function (currentPost) {
   var $clickedLi = $(currentPost).closest('li');
   var $clickedPost = $(currentPost).closest('.post');
   var $postId = $clickedPost.data().id;
   var $liId = $clickedLi.data().id;
   posts[$postId].comments.splice($liId, 1);
   $clickedLi.remove();
   }


  
  
   return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    posts: posts,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

app.renderPosts();

$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var $clickedPost = $(this).closest('.post');
  var text = $clickedPost.find(".comment-name").val();
  app.createComment(this, text);
  app.renderPosts(this);
})

$('.posts').on('click', "li", function () {
 app.removeComment(this);
});
