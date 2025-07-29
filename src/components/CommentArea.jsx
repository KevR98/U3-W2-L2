import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

const URL = 'https://striveschool-api.herokuapp.com/api/comments/';
const AUT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTM3OTQyODYsImV4cCI6MTc1NTAwMzg4Nn0.GqaXOwZUSrikKwmbod5qv5f_FMBa2I8VhT3AED79b-k';

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  const getComments = (prevProps) => {
    if (!prevProps) return;
    setIsLoading(true);
    setIsError(false);

    fetch(URL + prevProps, {
      headers: {
        Authorization: AUT,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Errore nel caricamento');
        }
      })

      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      })

      .catch((err) => {
        console.log('Errore nel caricamento', err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    getComments(props.asin);
  }, [props.asin]);

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     try {
  //       let response = await fetch(URL + this.props.asin, {
  //         headers: {
  //           Authorization: AUT,
  //         },
  //       });
  //       console.log(response);
  //       if (response.ok) {
  //         let comments = await response.json();
  //         this.setState({
  //           comments: comments,
  //           isLoading: false,
  //           isError: false,
  //         });
  //       } else {
  //         this.setState({ isLoading: false, isError: true });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   }
  // };

  return (
    <div className='text-center'>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
