import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  ModalHeader,
  ModalBody,
  Label,
  Button,
  Modal,
  Row, Col
} from "reactstrap";
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";

const required = (val) => val && val.length;
const maxLenght = (len) => (val) => !(val) || (val.length <= len);
const minLenght = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish}) {
  return (
    <div>
      <p>{dish.name}</p>
      <Card>
        <CardImg top src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments({comments}) {

  const c = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <li className="mt-2 mb-2">{comment.comment}</li>
        <li>-- {comment.author}, {moment(comment.date).format('MMM DD, YYYY')}</li>
      </div>
    );
  });

  return (
    <div>
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {c}
        </ul>
      </div>
      <div>
        <CommentForm></CommentForm>
      </div>
    </div>

  )
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr/>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}/>
          </div>

          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments || []}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }
};

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // this.toggleModal();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="yourname" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                  required, minLenght: minLenght(3), maxLenght: maxLenght(15)
                                }}
                  />
                  <Errors className="text-danger" model=".yourname" show="touched" messages={{
                    required: 'Required',
                    minLenght: 'Must be greater than 2 characters',
                    maxLenght: 'Must be 15 characters or less'
                  }}/>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control"/>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 12}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>

        <button type="button" className="btn btn btn-outline-secondary" onClick={this.toggleModal}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          Submit Comment
        </button>
      </div>
    )
  }

}

export default DishDetail;