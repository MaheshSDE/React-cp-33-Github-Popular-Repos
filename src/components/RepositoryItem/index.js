import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails

  return (
    <li className="item">
      <div className="items-container">
        <img src={avatarUrl} alt={name} className="avatar-url" />
        <h1 className="name">{name}</h1>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image-urls"
          />
          <p className="counts">{starsCount}</p>
          <p className="name-style">stars</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image-urls"
          />
          <p className="counts">{forksCount}</p>
          <p className="name-style">forks</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image-urls"
          />
          <p className="counts">{issuesCount}</p>
          <p className="name-style">open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
