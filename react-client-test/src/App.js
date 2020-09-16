import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js'
import Book from './components/Book'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      books: [{}]
    }
    this.fetchBooks = this.fetchBooks.bind(this)
    this.addBook = this.addBook.bind(this)

  }

  componentDidMount() {
    console.log('GrandChild did mount.');
    this.fetchBooks()

  }



  fetchBooks() {
    console.log("FETCH")
    fetch("http://localhost:4000/books")
      .then(res => res.json())
      .then(data =>
        this.setState({
          books: data,
          book: {title:"", image: "", description: ""}
        })
      )
  }

  addBook = (event) => {
    //event.preventDefault()
        //console.log(event.target[0].value)
    //console.log(event.target.elements.title.value)
    //event.preventDefault()
    /*this.setState({
      book: {title: event.target[0].value, image:event.target[1].value, description: event.target[2].value}
    }) */
    console.log("Hey Post " + JSON.stringify({title: event.target[0].value, image:event.target[1].value, description: event.target[2].value})) 
    fetch("http://localhost:4000/books", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: event.target[0].value, image:event.target[1].value, description: event.target[2].value})
      
    }).then(this.fetchBooks()) 




  }

  render() {
    //<Book key = {data._id}  data={data} /> results in error
    return (
      <React.Fragment>
        <h1 className="center-align">Book List</h1>
        <div className="row"></div>
        <div className="container">
          <div className="row">
            <form className="col s12" onSubmit={this.addBook}>
              <div className="col s12"><h5>Add Book</h5></div>

              <div className="input-field col s12">
                <input id="addTitle" type="text" required className="validate" />
                <label htmlFor="addTitle">Title</label>
              </div>
              <div className="input-field col s12">
                <input id="addImgURL" type="text" />
                <label htmlFor="addImgURL">Image Url</label>
              </div>
              <div className="input-field col s12">
                <textarea id="addDesc" className="materialize-textarea"></textarea>
                <label htmlFor="addDesc">Description</label>
              </div>
              <div className="col s12"><button className="btn waves-effect waves-light skyBlue" type="submit" >Add
            <i className="material-icons right" onClick={this.addBook}>add</i></button></div>
            </form>
          </div>

          {this.state.books.map(data => (
            <Book key={data._id} data={data} 
            fetchBooks= {this.fetchBooks}/>
          )
          )}
        </div>
      </React.Fragment>
    );
  }

}

export default App;
