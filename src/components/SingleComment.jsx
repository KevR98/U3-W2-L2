import { Button, ListGroup } from 'react-bootstrap';

const URL = 'https://striveschool-api.herokuapp.com/api/comments';
const AUT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTM3OTQyODYsImV4cCI6MTc1NTAwMzg4Nn0.GqaXOwZUSrikKwmbod5qv5f_FMBa2I8VhT3AED79b-k';

const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(URL + asin, {
        method: 'DELETE',
        headers: {
          Authorization: AUT,
        },
      });
      if (response.ok) {
        alert('La recensione è stata elimata!');
      } else {
        throw new Error('La recensione non è stata eliminata!');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant='danger'
        className='ms-2'
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
