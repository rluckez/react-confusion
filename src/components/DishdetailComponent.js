import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import * as moment from 'moment';

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
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {c}
      </ul>
    </div>
  )
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}/>
          </div>

          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments || []}/>
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

export default DishDetail;