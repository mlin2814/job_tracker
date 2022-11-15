import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Job/Internship Tracker</h1>
        </Link>
        <Link to="/contacts">
          <h1>Contacts</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar