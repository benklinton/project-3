import React, { Component } from "react";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Login from "../components/Login";
import "./pages.css";

class Firebase extends Component {
  state = {
    firebaseInfo: []
  };

  componentDidMount() {
    this.loadAll();
  }

  loadAll = () => {
    API.getAll("firebase")
      .then(res => {
        this.setState({
          firebaseInfo: res.data
        });
      })
      .catch(error => {
        console.log("error: ", error);
      });
  };

  delete = (category, id) => {
    API.deleteOne(id)
      .then(res => this.loadAll())

      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="mainBody">
        <div>
          <div className="content">
            <div className="card">
              <div className="card-header">
                <h1  className="titleDisp">Firebase</h1>
                <hr />
                <img
                  src="./images/firebaseLogo.jpg"
                  className="titleimg"
                  alt="firebase logo"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Quick Links</h5>
                <p className="card-text">
                  You can find more info, documents and very detailed videos in
                  the buttons below.
                </p>
                <a
                  href
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Firebase
                </a>
                <a
                  href
                  className="btn btn-success"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase Documents
                </a>
                <a
                  href
                  className="btn btn-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase Videos
                </a>
              </div>
            </div>
            <br />
            <h3>What is Firebase</h3>
            <p>
              Firebase is a Backend-as-a-Service — BaaS — that started as a YC11
              startup and grew up into a next-generation app-development
              platform on Google Cloud Platform.
              <a href="https://howtofirebase.com/what-is-firebase-fcb8614ba442">
                How To Firebase
              </a>
            </p>
            <iframe
              title="fireBaseFrame"
              width={560}
              height={315}
              src="https://www.youtube.com/embed/jsRVHeQd5kU"
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <br />
            <div className="dbCard">
            <h3>Additional Resources</h3>
            <hr />
            {this.state.firebaseInfo.length ? (
              this.state.firebaseInfo.map(info => (
                <Card
                  key={info._id}
                  className="container col-md-4"
                  style={{ width: "18rem", marginTop: "7rem" }}
                >
                  <Card.Body>
                    <Card.Title className="container text-center">
                      <h2>{info.title}</h2>
                    </Card.Title>
                    <Card.Text>{info.summary}</Card.Text>
                    <Button
                      className="container"
                      style={{ margin: "2px" }}
                      href={info.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="primary"
                    >
                      Find out more
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Login />
            )}
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Firebase;
