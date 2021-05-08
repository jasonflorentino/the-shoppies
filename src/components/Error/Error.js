import './Error.scss';

const Error = ({ message }) => {
  return (
    <div className="Error">
      <h2 className="Error__heading">{message}</h2>
    </div>
  )
}

export default Error;