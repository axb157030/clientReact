import React from 'react';
import M from 'materialize-css'
//import { Button, Card, Row, Col, Input, Modal, Icon } from 'react-materialize';
//import { loadCSS } from 'fg-loadcss';
//import Icon from '@material-ui/core/Icon';


import './Book.css'

class Book extends React.Component {

  constructor() {
    super()
    this.state = {
      id: "",
      editBook: false
    }

    this.editBook = this.editBook.bind(this)



  }

  componentDidMount() {

    this.setState({
      id: this.props.data._id
    })
    M.AutoInit();
  }

  deleteBook(id) {
    console.log("DELETE")
    console.log(id)
    fetch("http://localhost:4000/books/" + id, { method: 'DELETE' })
      .then(res => res.json())
      .then(this.props.fetchBooks())

  }

  editBook() {
    this.setState(prevState => ({
      editBook: !prevState.editBook
    }))
  }

  updateBook(id, event) {
    console.log("UPDATE")
    console.log("id: ", id)
    console.log("event", event)
  
    //console.log("event.target", event.target[0].value)
    //event.preventDefault()
    fetch("http://localhost:4000/books/" + id,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: event.target[1].value, image: event.target[0].value, description: event.target[2].value })
      }).then(res => res.json())
      .then(this.props.fetchBooks())
      .then(this.setState(prevState => ({
        editBook: !prevState.editBook
      })))

  }

  render() {
    var date = this.props.data.date + ""
    date = date.replace('T', ' ').substring(0, 19)
    return (
      <React.Fragment>

        {!this.state.editBook &&
          <div className="card" >
            <div className="card-image ">

              {((this.props.data.image === null) || (this.props.data.image === "")) &&
                <img className="materialboxed" src="https://www.uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg"
                  alt="No image" />
              }
              {((this.props.data.image !== null) && (this.props.data.image !== "")) &&
                <img className="materialboxed" src={this.props.data.image} alt=" a book" />}
            </div>

            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {this.props.data.title}<i className="material-icons right">more_vert</i></span>


            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.data.title}<i className="material-icons right">close</i></span>
              <p>Date: {date}</p>
              <p>{this.props.data.description}</p>
            </div>
            <div className="card-footer">
              <div className="left">

                <button className="btn waves-effect waves-teal skyBlue" onClick={this.editBook} >Edit
            <i className="material-icons right">edit</i></button>
              </div>
              <div className="right-align">
                <button className="btn waves-effect waves-red orange" onClick={this.deleteBook.bind(this, this.props.data._id)} >Delete
            <i className="material-icons right">cancel</i></button>

              </div>
            </div>
          </div>}

        {this.state.editBook &&
          <div className="card" >
            <div className="card-image ">

              {((this.props.data.image === null) || (this.props.data.image === "")) &&
                <img className="materialboxed" src="https://www.uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg"
                  alt="No image" />

              }
              {((this.props.data.image !== null) && (this.props.data.image !== "")) &&
                <img className="materialboxed" src={this.props.data.image} alt="a book" />}

            </div>

            <form onSubmit={this.updateBook.bind(this, this.props.data._id)}>
              <div className="card-content">
                {((this.props.data.image === null) || (this.props.data.image === "")) &&
                  <input type="text" defaultValue="" placeholder="Give image URL here" />}
                {((this.props.data.image !== null) && (this.props.data.image !== "")) &&
                  <input type="text" defaultValue={this.props.data.image} />}

                <span className="card-title activator grey-text text-darken-4"><input type="text" defaultValue={this.props.data.title} /></span>
                <div className="col s12">
                  <textarea id="addDesc" className="materialize-textarea" defaultValue={this.props.data.description} >
                  </textarea>
                  <label htmlFor="addDesc">Description</label>

                </div>
              </div>
              <div className="card-footer">
                <div className="left">

                  <button className="btn waves-effect waves-teal skyBlue" type="submit"  >Save
                    <i className="material-icons right">save</i></button>
                    
                </div>
                <div className="right-align">

                  <button className="btn waves-effect waves-red orange" onClick={this.editBook} >Cancel
                    <i className="material-icons right">cancel</i></button>

                </div>
              </div>
            </form>
          </div>
        }





      </React.Fragment>
    )
  }



}

export default Book;