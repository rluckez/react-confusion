import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps)
    // Typical usage (don't forget to compare props):
    // if (this.props.dish !== prevProps.dish) {
    //   this.render()
    // }
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
          <li>-- {comment.author}, {comment.date}</li>
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
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>

          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments || [])}
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