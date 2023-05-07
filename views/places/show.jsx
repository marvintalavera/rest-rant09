const React = require('react')
const Def = require('../default')
const index = require('.')

function show(data) {
  let comments = (
    <h3 className="inactive">
      No comments yet!
    </h3>
  )
  if (data.place.comments.length) {
    comments = data.place.comments.map((c, index) => {
      return (
        <div className="border" key={index}>
          <h2 className="rant">{c.rant ? 'Rant! 😡' : 'Rave! 😊'}</h2>
          <h4>{c.content}</h4>
          <h3>
            <strong>- {c.author}</strong>
          </h3>
          <h4>Rating: {c.stars}</h4>
          <form method="POST" action={`/places/${data.place.id}/comment/${c.id}?_method=DELETE`}>
            <input type="submit" className="btn btn-danger" value="Delete Comment" />
          </form>
        </div>
      )
    })
  }
  let rating = (
    <h3 className="inactive">
      Not yet rated
    </h3>
  )
  if (data.place.comments.length) {
    let sumRatings = data.place.comments.reduce((tot, c) => {
      return tot + c.stars
    }, 0)
    let averageRating = Math.round(sumRatings / data.place.comments.length)
    let stars = ''
    for (let i = 0; i < averageRating; i++) {
      stars += '⭐️'
    }
    rating = (
      <h3>
        {stars} stars
      </h3>
    )
  }
  return (
    <Def>
      <main>
        <div className="row">
          <div className="col-sm-6">
            <img src={data.place.pic} alt={data.place.name} style={{ width: '28rem', height: '20rem'}}/>
            <h3>
              Located in {data.place.city}, {data.place.state}
            </h3>
          </div>
          <div className="col-sm-6">
            <h1>
              {data.place.name}
            </h1>
            <h2>
              Rating
            </h2>
            <h4>
            {rating}
            </h4>
            <br></br>
            <h2>
              Description
            </h2>
            <h4>
              {data.place.showEstablished()}
            </h4>
            <br></br>
            <h4>
              Category: {data.place.cuisines}
            </h4>
            <br></br>
            <form method="PUT" action={`/places/${data.id}?_method=PUT`}>
              <button type="submit" className="btn btn-warning">
                Edit
              </button>
            </form>
            <form method="POST" action={`/places/${data.id}?_method=DELETE`}>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </form>
            <br></br>
          </div>
          <form method="POST" action={`/places/${data.place.id}/comment`} className="comment-form">
            <legend className='comment-legend'><h3 style={{ marginBottom: '.2rem' }}>Add A Comment</h3></legend>
            <div className="comment-auth" style={{ width: '15rem', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
            <label htmlFor="Author"></label>
            <input type="text" name="author" placeholder="Enter Your Name"/>
            </div>
            <div className="comment-content">
            <label htmlFor="content"></label>
            <textarea name="content" rows="6" style={{ width: '15rem' }} placeholder="Comment"></textarea>
            </div>
            <div className="comment-stars">
            <label htmlFor="stars" style={{ marginRight: '.5rem' }}>Rating:</label>
            <input type="number" name="stars" step="0.5" min="0.5" max="5" defaultValue="0.5"/>
            </div>
            <div className="comment-rant">
            <label htmlFor="rant" style={{ marginRight: '.5rem' }}>Unsatisfied?</label>
            <input type="checkbox" name="rant" value="rant" />
            </div>
            <div className="comment-submit">
            <button type="submit" style={{ marginBottom: '2rem'}}>Submit</button>
            </div>
            </form>
          <h2>Comments</h2>
          {comments}
        </div>
      </main>
    </Def>
  )
}

module.exports = show
