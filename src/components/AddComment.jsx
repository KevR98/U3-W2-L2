import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const URL = 'https://striveschool-api.herokuapp.com/api/comments';
const AUT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTM3OTQyODYsImV4cCI6MTc1NTAwMzg4Nn0.GqaXOwZUSrikKwmbod5qv5f_FMBa2I8VhT3AED79b-k';

const AddComment = (props) => {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // };

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);
  const [elementId, setElementId] = useState(props.asin);

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     });
  //   }
  // }

  useEffect(() => {
    setElementId(props.asin);
  }, [props.asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        comment: comment,
        rate: rate,
        elementId: elementId,
      };

      let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-type': 'application/json',
          Authorization: AUT,
        },
      });
      if (response.ok) {
        alert('Recensione inviata!');

        // this.setState({
        //   comment: {
        //     comment: '',
        //     rate: 1,
        //     elementId: this.props.asin,
        //   },
        // });

        setComment('');
        setRate(1);
        setElementId(props.asin);
      } else {
        throw new Error('Qualcosa è andato storto');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='my-3'>
      <Form onSubmit={sendComment}>
        <Form.Group className='mb-2'>
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci qui il testo'
            value={comment}
            onChange={(e) =>
              // this.setState({
              //   comment: {
              //     ...this.state.comment,
              //     comment: e.target.value,
              //   },
              // })
              setComment(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as='select'
            value={rate}
            onChange={(e) =>
              // this.setState({
              //   comment: {
              //     ...this.state.comment,
              //     rate: e.target.value,
              //   },
              // })
              setRate(parseInt(e.target.value))
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
