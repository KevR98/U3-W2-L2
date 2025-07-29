import { Card } from 'react-bootstrap';
// import CommentArea from './CommentArea'

// destrutturo props scrivendolo in questo modo
const SingleBook = ({ changeSelectedBook, book, selectedBook }) => {
  // state = {
  //   selected: false,
  // }

  return (
    <>
      <Card
        // onClick={() => this.setState({ selected: !this.state.selected })}
        onClick={() => changeSelectedBook(book.asin)}
        style={{
          border: selectedBook === book.asin ? '3px solid red' : 'none',
        }}
      >
        <Card.Img variant='top' src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
      {/* {this.state.selected && <CommentArea asin={this.props.book.asin} />} */}
    </>
  );
};

export default SingleBook;
