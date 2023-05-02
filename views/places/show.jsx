const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
        <h3 className='inactive'>
            No comments yet!
        </h3>
    )
    if (data.place.comments.length) {
        comments = data.place.comments.map(c => {
          return (
            <div className="border">
              <h2 className="rant">{c.rant ? 'Rant! 😡' : 'Rave! 😊'}</h2>
              <h4>{c.content}</h4>
              <h3>
                <stong>- {c.author}</stong>
              </h3>
              <h4>Rating: {c.stars}</h4>
            </div>
          )
        })
      }
    return (
        <Def>
          <main>
            <h1>{ data.place.name }</h1>
            <h2>Rating</h2>
            <p>Currently Unrated</p>
            <h2>Description</h2>
            <p>{data.place.showEstablished()}</p>
            <p>Category: {data.place.cuisines}</p>
            <form method="POST" action={`/places/${data.place._id}/comment`} className="comment-form">
            <legend className='comment-legend'><h5 style={{ marginBottom: '.2rem' }}>Add A Comment</h5></legend>
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
            <a href={`/places/${data.id}/edit`} className="btn btn-warning"> 
                Edit
            </a>  
            <form method="POST" action={`/places/${data.id}?_method=DELETE`}> 
                <button type="submit" className="btn btn-danger">
                    Delete
                </button>
            </form>
          </main>
        </Def>
    )
}

module.exports = show