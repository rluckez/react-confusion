import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import * as moment from 'moment';

class DishDetail extends Component {

  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  }

  renderComments(comments) {

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
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {c}
        </ul>
      </div>
    )
  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.dish)}
            </div>

            <div className="col-12 col-md-5 m-1">
              {this.renderComments(this.props.dish.comments || [])}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }

}

export default DishDetail;